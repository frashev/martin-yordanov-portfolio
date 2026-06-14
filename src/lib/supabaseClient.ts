import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

if (!url) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL is not set. Contact form submissions will fail. " +
      "Copy .env.example to .env.local and fill in your Supabase project URL.",
  );
}
if (!key) {
  console.warn(
    "[supabase] VITE_SUPABASE_PUBLISHABLE_KEY is not set. Contact form submissions will fail. " +
      "Copy .env.example to .env.local and fill in your Supabase publishable (anon) key.",
  );
}

export const supabase = createClient(
  url ?? "https://placeholder.supabase.co",
  key ?? "placeholder",
);
