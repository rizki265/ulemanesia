import React from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Invitation } from "@/types/database";
import { EditInvitationClient } from "./edit-client";

export const metadata = {
  title: "Edit Undangan | Admin Ulemanesia",
};

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditInvitationPage({ params }: Props) {
  const { id } = await params;
  let invitation: Invitation | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("invitations")
      .select("*, music:music_library(*)")
      .eq("id", id)
      .single();

    if (error || !data) {
      return notFound();
    }

    invitation = data as Invitation;
  } catch {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <EditInvitationClient initialInvitation={invitation} />
    </div>
  );
}

