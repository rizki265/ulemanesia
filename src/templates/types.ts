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
  onSendWish?: (wish: {
    guest_name: string;
    attendance: "attending" | "not_attending" | "maybe";
    pax: number;
    message: string;
  }) => Promise<{ success: boolean; message?: string }>;
}

export type TemplateComponent = React.ComponentType<TemplateProps>;

export type TemplateCategory =
  | "all"
  | "Adat Jawa"
  | "Islami"
  | "Editorial Photo"
  | "Modern"
  | "Floral"
  | "Bali & Tropis"
  | "Rustic Boho"
  | "Oriental";

export interface TemplateFormFieldOption {
  value: string;
  label: string;
}

export interface TemplateFormField {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "color" | "image" | "boolean";
  description?: string;
  defaultValue?: string | number | boolean;
  options?: TemplateFormFieldOption[];
  placeholder?: string;
}

export interface RegisteredTemplate {
  key: string;
  name: string;
  subtitle?: string;
  category?: TemplateCategory;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  component: TemplateComponent;
  defaultThemeConfig?: Record<string, any>;
  customFields?: TemplateFormField[];
}
