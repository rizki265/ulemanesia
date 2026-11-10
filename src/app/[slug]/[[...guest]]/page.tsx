import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { sanitizeGuestName } from "@/lib/utils";
import { getTemplateByKey } from "@/templates/registry";
import { Invitation, Wish } from "@/types/database";
import { MessageCircle, AlertCircle, Clock, Home } from "lucide-react";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { formatWhatsAppPhone } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{
    slug: string;
    guest?: string[];
  }>;
}

export const dynamic = "force-dynamic";

/**
 * FR-10, BR-09: Metadata Open Graph (judul, deskripsi, foto cover) per undangan untuk preview WhatsApp
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, guest } = await params;
  const guestName = sanitizeGuestName(guest);

  try {
    const supabase = await createClient();
    const { data: invitation } = await supabase
      .from("invitations")
      .select("title, cover_image_url, status, expires_at, data")
      .eq("slug", slug)
      .single();

    if (!invitation || invitation.status === "draft") {
      return {
        title: "Undangan Digital | Ulemanesia",
        description: "Platform Undangan Digital Modern & Elegan",
      };
    }

    const title = `${invitation.title} - Kepada Yth. ${guestName}`;
    const description = `Pernikahan ${invitation.data?.groom?.nickname || "Mempelai"} & ${invitation.data?.bride?.nickname || "Mempelai"}. Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu.`;
    const imageUrl = invitation.cover_image_url || invitation.data?.gallery?.[0] || "/og-default.png";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Undangan Digital | Ulemanesia",
    };
  }
}

/**
 * Dynamic Invitation Page (FR-05, FR-06, FR-09)
 * Handles /{slug} and /{slug}/{nama-tamu}
 */
export default async function InvitationPage({ params }: PageProps) {
  const { slug, guest } = await params;
  const guestName = sanitizeGuestName(guest);

  let invitation: Invitation | null = null;
  let wishes: Wish[] = [];

  try {
    const supabase = await createClient();

    // Query invitation by unique slug
    const { data, error } = await supabase
      .from("invitations")
      .select("*, music:music_library(*)")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      // After data is deleted by admin (FR-09), show 404
      return notFound();
    }

    invitation = data as Invitation;

    // Fetch wishes for this invitation
    const { data: wishesData } = await supabase
      .from("wishes")
      .select("*")
      .eq("invitation_id", invitation.id)
      .eq("is_hidden", false)
      .order("created_at", { ascending: false });

    if (wishesData) {
      wishes = wishesData as Wish[];
    }
  } catch (err) {
    console.error("Database connection error:", err);
    return notFound();
  }

  // AB-02: Undangan berstatus draft tidak dapat diakses publik
  if (invitation.status === "draft") {
    return notFound();
  }

  // Check if invitation has expired (FR-09, AB-03)
  const isExpired =
    invitation.status === "expired" ||
    (invitation.expires_at ? new Date(invitation.expires_at) < new Date() : false);

  if (isExpired) {
    const adminWhatsApp = formatWhatsAppPhone(DEFAULT_WHATSAPP_NUMBER);
    const renewMessage = encodeURIComponent(
      `Halo Admin Ulemanesia, saya ingin menanyakan perpanjangan masa aktif untuk undangan: ${invitation.title} (${slug})`
    );

    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-stone-200">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-amber-200">
            <Clock className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-serif font-bold text-stone-900 mb-2">
            Masa Aktif Undangan Selesai
          </h1>

          <p className="text-sm text-stone-600 mb-6 leading-relaxed">
            Masa aktif undangan digital <strong className="text-stone-900">{invitation.title}</strong> telah berakhir sesuai kebijakan 3 bulan tayang.
          </p>

          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 text-xs text-stone-500 mb-6 space-y-1 text-left">
            <p className="flex items-center gap-1.5 font-medium text-stone-700">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Info Pemilik &amp; Mempelai:</span>
            </p>
            <p>Undangan tersimpan selama masa tenggang 15 hari.</p>
            <p>Untuk memperpanjang masa tayang (Rp50.000/bulan), silakan hubungi admin di bawah ini.</p>
          </div>

          <div className="space-y-3">
            <a
              href={`https://wa.me/${adminWhatsApp}?text=${renewMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Admin via WhatsApp</span>
            </a>

            <a
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl text-xs transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda Ulemanesia</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Find template component from registry (FR-10, Kemudahan Perawatan)
  const registeredTemplate = getTemplateByKey(invitation.template_key);
  const TemplateComponent = registeredTemplate.component;

  // Server action for guest wish submission
  async function handleSendWish(wishData: {
    guest_name: string;
    attendance: "attending" | "not_attending" | "maybe";
    pax: number;
    message: string;
  }) {
    "use server";
    try {
      const supabase = await createClient();
      const { error } = await supabase.from("wishes").insert({
        invitation_id: invitation!.id,
        guest_name: wishData.guest_name,
        attendance: wishData.attendance,
        pax: wishData.pax,
        message: wishData.message,
      });

      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true };
    } catch {
      return { success: false, message: "Gagal menyimpan ucapan." };
    }
  }

  return (
    <main>
      <TemplateComponent
        slug={slug}
        guestName={guestName}
        title={invitation.title}
        coverImageUrl={invitation.cover_image_url}
        audioUrl={invitation.music?.audio_url || invitation.data.custom_music_url}
        audioTitle={invitation.music?.title}
        data={invitation.data}
        wishes={wishes}
        onSendWish={handleSendWish}
      />
    </main>
  );
}
