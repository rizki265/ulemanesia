import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";

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
    console.error("Error writing template presets file:", e);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    const presets = readPresets();

    if (key) {
      const preset = presets[key];
      if (!preset) {
        return NextResponse.json({ error: `Preset for template '${key}' not found` }, { status: 404 });
      }
      return NextResponse.json({ success: true, preset });
    }

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

    // 1. Update presets JSON file
    const presets = readPresets();
    presets[template_key] = {
      ...(presets[template_key] || {}),
      ...preset_data,
      key: template_key,
      updated_at: new Date().toISOString(),
    };
    writePresets(presets);

    // 2. Synchronize with Supabase templates table
    try {
      const adminSupabase = createAdminClient();
      const updates: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };

      if (preset_data.name) updates.name = preset_data.name;
      if (preset_data.description) updates.description = preset_data.description;
      if (preset_data.cover_image_url) updates.thumbnail_url = preset_data.cover_image_url;

      await adminSupabase
        .from("templates")
        .update(updates)
        .eq("key", template_key);
    } catch (dbErr) {
      console.warn("Supabase templates update non-critical error:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Template preset untuk '${template_key}' berhasil diperbarui sebagai referensi katalog web.`,
      preset: presets[template_key],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

