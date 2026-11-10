import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { invitation_id, guest_name, attendance, pax, message } = body;

    if (!invitation_id || !guest_name || !message) {
      return NextResponse.json(
        { error: "Nama tamu dan ucapan wajib diisi." },
        { status: 400 }
      );
    }

    const adminSupabase = createAdminClient();

    // Verify that the invitation is published and not expired (AB-03)
    const { data: inv, error: invError } = await adminSupabase
      .from("invitations")
      .select("status, expires_at")
      .eq("id", invitation_id)
      .single();

    if (invError || !inv) {
      return NextResponse.json({ error: "Undangan tidak ditemukan." }, { status: 404 });
    }

    if (inv.status !== "published" || (inv.expires_at && new Date(inv.expires_at) < new Date())) {
      return NextResponse.json(
        { error: "Undangan telah kedaluwarsa. Pengiriman RSVP dan ucapan telah ditutup." },
        { status: 403 }
      );
    }

    // Insert wish
    const { data: wish, error: wishError } = await adminSupabase
      .from("wishes")
      .insert({
        invitation_id,
        guest_name,
        attendance: attendance || "attending",
        pax: pax || 1,
        message,
        is_hidden: false,
      })
      .select()
      .single();

    if (wishError) {
      return NextResponse.json({ error: wishError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, wish });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

