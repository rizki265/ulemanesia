import { InvitationDataPayload, Wish } from "@/types/database";

export interface TemplateProps {
  slug: string;
  guestName: string;
  title: string;
  coverImageUrl?: string | null;
  audioUrl?: string | null;
  audioTitle?: string;
  data: InvitationDataPayload;
  wishes: Wish[];
  isPreview?: boolean;
  onSendWish?: (wish: { guest_name: string; attendance: 'attending' | 'not_attending' | 'maybe'; pax: number; message: string }) => Promise<{ success: boolean; message?: string }>;
}

export type TemplateComponent = React.ComponentType<TemplateProps>;

export interface RegisteredTemplate {
  key: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  component: TemplateComponent;
}

