import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTemplateByKey } from "@/templates/registry";
import { Invitation, Wish } from "@/types/database";
import { ArrowLeft, CheckCircle, Edit, Globe } from "lucide-react";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Pratinjau Undangan | Admin Ulemanesia",
};

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PreviewInvitationPage({ params }: Props) {
  const { id } = await params;
  let invitation: Invitation | null = null;
  let wishes: Wish[] = [];

  try {
    const adminSupabase = createAdminClient();
    const { data: invData, error: invError } = await adminSupabase
      .from("invitations")
      .select("*, music:music_library(*)")
      .eq("id", id)
      .single();

    if (invError || !invData) {
      return notFound();
    }

    invitation = invData as Invitation;

    const { data: wishesData } = await adminSupabase
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

  // Server action to publish right from the preview banner
  async function publishFromPreview() {
    "use server";
    try {
      const adminSupabase = createAdminClient();
      const now = new Date();
      const expiresAt = new Date(now);
      expiresAt.setMonth(expiresAt.getMonth() + 3);

      await adminSupabase
        .from("invitations")
        .update({
          status: "published",
          published_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
        })
        .eq("id", id);

      revalidatePath(`/admin/invitations/${id}/preview`);
      revalidatePath("/admin");
    } catch (e) {
      console.error(e);
    }
  }

  const template = getTemplateByKey(invitation.template_key);
  const TemplateComponent = template.component;

  return (
    <div className="relative">
      {/* Top Admin Preview Banner (FR-15) */}
      <div className="sticky top-0 z-50 bg-stone-900 text-white py-3 px-4 shadow-lg flex flex-wrap items-center justify-between gap-3 border-b border-stone-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="text-stone-600">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Pratinjau Mode (FR-15)
            </span>
            <span className="text-xs text-stone-300 font-mono">
              /{invitation.slug} ({invitation.status})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/invitations/${invitation.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Data</span>
          </Link>

          {invitation.status === "draft" ? (
            <form action={publishFromPreview}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all hover:scale-105"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Publish Sekarang (3 Bulan)</span>
              </button>
            </form>
          ) : (
            <a
              href={`/${invitation.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Buka Link Publik</span>
            </a>
          )}
        </div>
      </div>

      <TemplateComponent
        slug={invitation.slug}
        guestName="Bapak Budi Santoso (Contoh)"
        title={invitation.title}
        coverImageUrl={invitation.cover_image_url}
        audioUrl={invitation.music?.audio_url || invitation.data.custom_music_url}
        audioTitle={invitation.music?.title}
        data={invitation.data}
        wishes={wishes}
        isPreview={true}
      />
    </div>
  );
}

