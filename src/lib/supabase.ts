import { createClient } from '@supabase/supabase-js';

// These are the publishable anon key + project URL — safe to expose client-side.
// Row Level Security (public read-only on `products`) is the actual security
// boundary, not secrecy of this key. Falls back to the project's values so
// the app works even where NEXT_PUBLIC_SUPABASE_* env vars aren't set (e.g.
// this Vercel project, configured outside of env vars for now).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wnxwkmvqnvspdhiukhub.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_zOq8vWy-r7f0YGdH7i2uqw_Iica22-L';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
