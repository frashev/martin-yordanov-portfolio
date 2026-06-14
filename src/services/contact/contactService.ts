import type { ContactMessageInput, ContactSubmitResult } from "./types";
import { submitViaSupabase } from "./providers/supabaseContactProvider";

export async function submitContact(
  input: ContactMessageInput,
): Promise<ContactSubmitResult> {
  try {
    return await submitViaSupabase(input);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    return { ok: false, provider: "supabase", message };
  }
}
