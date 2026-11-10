import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Scheduled Cron Task to transition expired invitations (AB-03, Section 10).
 * Can be triggered daily via Vercel Cron or Supabase pg_net / pg_cron.
 */
export async function GET(req: NextRequest) {
  try {
    // Optional cron secret verification
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // In development or when header matches, proceed
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const adminSupabase = createAdminClient();
    const now = new Date().toISOString();

    // Update published invitations whose expires_at is before now
    const { data, error } = await adminSupabase
      .from("invitations")
      .update({ status: "expired" })
      .eq("status", "published")
      .not("expires_at", "is", null)
      .lt("expires_at", now)
      .select("id, slug, title, expires_at");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      timestamp: now,
      expiredCount: data?.length || 0,
      updatedInvitations: data,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

