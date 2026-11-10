import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isValidSlug } from "@/lib/utils";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

// GET single invitation
export async function GET(req: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
      .from("invitations")
      .select("*, music:music_library(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Undangan tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ invitation: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT update invitation
export async function PUT(req: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { slug, template_key, customer_name, customer_phone, status, title, event_date, cover_image_url, music_id, data } = body;

    const checkSlug = isValidSlug(slug);
    if (!checkSlug.valid) {
      return NextResponse.json({ error: checkSlug.error }, { status: 400 });
    }

    const adminSupabase = createAdminClient();

    // Verify slug uniqueness against other records
    const { data: existing } = await adminSupabase
      .from("invitations")
      .select("id")
      .eq("slug", slug)
      .neq("id", id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: `Slug '/${slug}' sudah digunakan oleh undangan lain.` },
        { status: 400 }
      );
    }

    const { data: updated, error } = await adminSupabase
      .from("invitations")
      .update({
        slug,
        template_key,
        customer_name,
        customer_phone,
        status,
        title,
        event_date,
        cover_image_url,
        music_id: music_id || null,
        data: data || {},
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, invitation: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE invitation
export async function DELETE(req: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const adminSupabase = createAdminClient();

    const { error } = await adminSupabase.from("invitations").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

