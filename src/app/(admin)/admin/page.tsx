import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import {
  Plus,
  Clock,
  AlertTriangle,
  ExternalLink,
  MessageCircle,
  Trash2,
  CalendarPlus,
  Share2,
  Search,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Invitation } from "@/types/database";
import { getInvitationLifecycle, formatDate, formatRupiah } from "@/lib/utils";
import { getWhatsAppExpiryReminderUrl } from "@/lib/whatsapp";
import { EXTENSION_FEE_PER_MONTH } from "@/lib/constants";
import { AdminDashboardClient } from "./client-dashboard";

export const metadata = {
  title: "Dashboard Undangan | Admin Ulemanesia",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let invitations: Invitation[] = [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("invitations")
      .select("*, music:music_library(*)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      invitations = data as Invitation[];
    }
  } catch (err) {
    console.error("Dashboard fetch error:", err);
  }

  // Server Action: Extend invitation validity by 1 month (FR-17, AB-04)
  async function extendInvitationAction(id: string) {
    "use server";
    try {
      const adminSupabase = createAdminClient();
      const { data: inv } = await adminSupabase
        .from("invitations")
        .select("expires_at, status")
        .eq("id", id)
        .single();

      if (!inv) return { success: false, message: "Undangan tidak ditemukan." };

      const now = new Date();
      let currentExpiry = inv.expires_at ? new Date(inv.expires_at) : now;

      // AB-04: Perpanjangan dihitung dari tanggal kedaluwarsa yang berlaku; jika sudah lewat, dihitung dari tanggal perpanjangan.
      if (currentExpiry < now) {
        currentExpiry = now;
      }

      // Add 1 month
      const newExpiry = new Date(currentExpiry);
      newExpiry.setMonth(newExpiry.getMonth() + 1);

      const { error } = await adminSupabase
        .from("invitations")
        .update({
          expires_at: newExpiry.toISOString(),
          status: "published", // reactivate if was expired
        })
        .eq("id", id);

      if (error) return { success: false, message: error.message };

      revalidatePath("/admin");
      return { success: true };
    } catch {
      return { success: false, message: "Gagal memperpanjang masa aktif." };
    }
  }

  // Server Action: Publish draft invitation (FR-16, AB-01)
  async function publishInvitationAction(id: string) {
    "use server";
    try {
      const adminSupabase = createAdminClient();
      const now = new Date();
      const expiresAt = new Date(now);
      expiresAt.setMonth(expiresAt.getMonth() + 3); // 3 months active

      const { error } = await adminSupabase
        .from("invitations")
        .update({
          status: "published",
          published_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
        })
        .eq("id", id);

      if (error) return { success: false, message: error.message };

      revalidatePath("/admin");
      return { success: true };
    } catch {
      return { success: false, message: "Gagal mempublikasikan undangan." };
    }
  }

  // Server Action: Delete invitation permanently (FR-19, AB-05)
  async function deleteInvitationAction(id: string) {
    "use server";
    try {
      const adminSupabase = createAdminClient();
      const { error } = await adminSupabase.from("invitations").delete().eq("id", id);

      if (error) return { success: false, message: error.message };

      revalidatePath("/admin");
      return { success: true };
    } catch {
      return { success: false, message: "Gagal menghapus undangan." };
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Daftar Undangan
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Pantau status masa aktif 3 bulan, peringatan kedaluwarsa, dan perpanjangan
          </p>
        </div>

        <Link
          href="/admin/invitations/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-rose-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Undangan Baru</span>
        </Link>
      </div>

      {/* Interactive Client Dashboard with Search, Filters, WhatsApp Links & Modals */}
      <AdminDashboardClient
        initialInvitations={invitations}
        onExtend={extendInvitationAction}
        onPublish={publishInvitationAction}
        onDelete={deleteInvitationAction}
      />
    </div>
  );
}
