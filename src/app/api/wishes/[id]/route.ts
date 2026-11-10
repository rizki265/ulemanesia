import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

// DELETE a wish (FR-19)
export async function DELETE(req: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const adminSupabase = createAdminClient();

    const { error } = await adminSupabase.from("wishes").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH toggle is_hidden
export async function PATCH(req: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { is_hidden } = body;

    const adminSupabase = createAdminClient();

    const { data, error } = await adminSupabase
      .from("wishes")
      .update({ is_hidden: Boolean(is_hidden) })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, wish: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

