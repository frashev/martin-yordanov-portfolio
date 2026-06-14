export interface ContactMessageInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  provider: "supabase";
  message?: string;
}
