import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTemplateByKey } from "@/templates/registry";

const PRESETS_FILE = path.join(process.cwd(), "src", "data", "template-presets.json");

function readPresets() {
  try {
    if (fs.existsSync(PRESETS_FILE)) {
      const content = fs.readFileSync(PRESETS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading template presets file:", e);
  }
  return {};
}

function writePresets(data: Record<string, any>) {
  try {
    fs.writeFileSync(PRESETS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing template presets file (non-critical in serverless):", e);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (key) {
      // 1. Prioritize reading from Supabase database table 'invitations' (slug = 'preset-[key]')
      try {
        const adminSupabase = createAdminClient();
        const { data: dbPreset } = await adminSupabase
          .from("invitations")
          .select("data, cover_image_url, title")
          .eq("slug", `preset-${key}`)
          .maybeSingle();

        if (dbPreset && dbPreset.data && Object.keys(dbPreset.data).length > 0) {
          return NextResponse.json({
            success: true,
            preset: {
              ...dbPreset.data,
              cover_image_url: dbPreset.cover_image_url || dbPreset.data.cover_image_url,
              title: dbPreset.title || dbPreset.data.title,
            },
            source: "database",
          });
        }
      } catch (dbErr) {
        console.warn("DB preset fetch fallback to file:", dbErr);
      }

      // 2. Fallback to template-presets.json file
      const presets = readPresets();
      const preset = presets[key];
      if (preset) {
        return NextResponse.json({ success: true, preset, source: "file" });
      }
      return NextResponse.json({ error: `Preset for template '${key}' not found` }, { status: 404 });
    }

    const presets = readPresets();
    return NextResponse.json({ success: true, presets });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { template_key, preset_data } = body;

    if (!template_key || !preset_data) {
      return NextResponse.json({ error: "template_key and preset_data are required" }, { status: 400 });
    }

    const adminSupabase = createAdminClient();

    // 1. Ensure template exists in public.templates table in Supabase
    const tplMeta = getTemplateByKey(template_key);
    const { data: existingTpl } = await adminSupabase
      .from("templates")
      .select("key")
      .eq("key", template_key)
      .maybeSingle();

    if (!existingTpl) {
      await adminSupabase.from("templates").insert({
        key: template_key,
        name: preset_data.name || tplMeta.name,
        description: preset_data.description || tplMeta.description,
        thumbnail_url: preset_data.cover_image_url || tplMeta.thumbnailUrl,
        tags: tplMeta.tags || [],
        is_active: true,
      });
    } else {
      const updates: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (preset_data.name) updates.name = preset_data.name;
      if (preset_data.description) updates.description = preset_data.description;
      if (preset_data.cover_image_url) updates.thumbnail_url = preset_data.cover_image_url;

      await adminSupabase.from("templates").update(updates).eq("key", template_key);
    }

    // 2. Persist the FULL preset data into Supabase invitations table with slug 'preset-[key]'
    const presetSlug = `preset-${template_key}`;
    const effectiveTitle =
      preset_data.title ||
      `The Wedding of ${preset_data.groom?.nickname || "Groom"} & ${preset_data.bride?.nickname || "Bride"}`;

    const { data: existingPresetInv } = await adminSupabase
      .from("invitations")
      .select("id")
      .eq("slug", presetSlug)
      .maybeSingle();

    if (existingPresetInv) {
      const { error: updateInvErr } = await adminSupabase
        .from("invitations")
        .update({
          title: effectiveTitle,
          cover_image_url: preset_data.cover_image_url || null,
          data: preset_data,
          updated_at: new Date().toISOString(),
        })
        .eq("slug", presetSlug);

      if (updateInvErr) {
        console.error("Error updating preset invitation in Supabase:", updateInvErr);
      }
    } else {
      const { error: insertInvErr } = await adminSupabase
        .from("invitations")
        .insert({
          slug: presetSlug,
          template_key: template_key,
          customer_name: "Referensi Template Ulemanesia",
          customer_phone: "08123456789",
          status: "draft",
          title: effectiveTitle,
          event_date: new Date().toISOString(),
          cover_image_url: preset_data.cover_image_url || null,
          data: preset_data,
        });

      if (insertInvErr) {
        console.error("Error inserting preset invitation into Supabase:", insertInvErr);
      }
    }

    // 3. Also update local JSON file as backup
    const presets = readPresets();
    presets[template_key] = {
      ...(presets[template_key] || {}),
      ...preset_data,
      key: template_key,
      updated_at: new Date().toISOString(),
    };
    writePresets(presets);

    return NextResponse.json({
      success: true,
      message: `Template preset untuk '${template_key}' berhasil disimpan ke database Supabase sebagai referensi katalog web.`,
      preset: presets[template_key],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
