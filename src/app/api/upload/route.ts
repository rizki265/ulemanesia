import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "galleries";

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }

    const adminSupabase = createAdminClient();

    // Ensure bucket exists
    const { data: bucketData, error: getBucketError } = await adminSupabase.storage.getBucket(bucket);
    if (getBucketError || !bucketData) {
      await adminSupabase.storage.createBucket(bucket, { public: true });
    }

    // Generate safe clean filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const cleanOriginalName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .toLowerCase();
    const extension = file.type === "image/webp" ? "webp" : file.name.split(".").pop() || "webp";
    const filePath = `uploads/${timestamp}-${randomSuffix}-${cleanOriginalName}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await adminSupabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type || "image/webp",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = adminSupabase.storage.from(bucket).getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      path: filePath,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server saat unggah";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

