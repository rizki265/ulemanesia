import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidSlug } from "@/lib/utils";
import { getTemplateByKey } from "@/templates/registry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, template_key, customer_name, customer_phone, status, title, event_date, cover_image_url, data } = body;

    // Validate slug
    const checkSlug = isValidSlug(slug);
    if (!checkSlug.valid) {
      return NextResponse.json({ error: checkSlug.error }, { status: 400 });
    }

    if (!customer_name || !customer_phone || !title || !event_date) {
      return NextResponse.json(
        { error: "Nama pelanggan, nomor telepon/WhatsApp, judul, dan tanggal acara wajib diisi." },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    // 1. Check slug uniqueness
    const { data: existing } = await adminSupabase
      .from("invitations")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: `Slug '/${slug}' sudah digunakan oleh undangan lain. Silakan pilih variasi slug lainnya.` },
        { status: 400 }
      );
    }

    // 2. Ensure template exists in public.templates to prevent foreign key errors
    const effectiveTemplateKey = template_key || "luxury-polaroid";
    const { data: tplExists } = await adminSupabase
      .from("templates")
      .select("key")
      .eq("key", effectiveTemplateKey)
      .maybeSingle();

    if (!tplExists) {
      const tplMeta = getTemplateByKey(effectiveTemplateKey);
      await adminSupabase.from("templates").insert({
        key: effectiveTemplateKey,
        name: tplMeta.name,
        description: tplMeta.description,
        thumbnail_url: tplMeta.thumbnailUrl,
        tags: tplMeta.tags || [],
        is_active: true,
      });
    }

    let published_at = null;
    let expires_at = null;

    if (status === "published") {
      const now = new Date();
      published_at = now.toISOString();
      const expiry = new Date(now);
      expiry.setMonth(expiry.getMonth() + 3); // 3 months validity rule (AB-01)
      expires_at = expiry.toISOString();
    }

    const { data: inserted, error } = await adminSupabase
      .from("invitations")
      .insert({
        slug,
        template_key: effectiveTemplateKey,
        customer_name,
        customer_phone,
        status: status || "draft",
        title,
        event_date,
        cover_image_url,
        data: data || {},
        published_at,
        expires_at,
      })
      .select()
      .single();

    if (error) {
      console.error("Database insert invitation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, invitation: inserted });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
