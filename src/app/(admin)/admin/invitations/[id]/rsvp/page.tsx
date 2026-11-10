import React from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Invitation, Wish } from "@/types/database";
import { RsvpManagementClient } from "./rsvp-client";

export const metadata = {
  title: "Rekap RSVP & Ucapan | Admin Ulemanesia",
};

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InvitationRsvpPage({ params }: Props) {
  const { id } = await params;
  let invitation: Invitation | null = null;
  let wishes: Wish[] = [];

  try {
    const supabase = await createClient();

    const { data: invData, error: invError } = await supabase
      .from("invitations")
      .select("*")
      .eq("id", id)
      .single();

    if (invError || !invData) {
      return notFound();
    }

    invitation = invData as Invitation;

    const { data: wishesData } = await supabase
      .from("wishes")
      .select("*")
      .eq("invitation_id", id)
      .order("created_at", { ascending: false });

    if (wishesData) {
      wishes = wishesData as Wish[];
    }
  } catch {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <RsvpManagementClient invitation={invitation} initialWishes={wishes} />
    </div>
  );
}

