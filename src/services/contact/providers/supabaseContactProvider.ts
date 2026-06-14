import { supabase } from "../../../lib/supabaseClient";
import type { ContactMessageInput, ContactSubmitResult } from "../types";

export async function submitViaSupabase(
  input: ContactMessageInput,
): Promise<ContactSubmitResult> {
  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    subject: input.subject ?? null,
    message: input.message,
    source: input.source ?? "website",
  });

  if (error) {
    return { ok: false, provider: "supabase", message: error.message };
  }
  return { ok: true, provider: "supabase" };
}
