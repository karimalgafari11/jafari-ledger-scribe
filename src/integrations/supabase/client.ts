
import { createClient } from "@supabase/supabase-js";

// تحديد قيم URL و anon key بشكل مباشر بدلاً من استخدام متغيرات بيئية
export const supabase = createClient(
  "https://nfkmlwqljkrmottcseyp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ma21sd3FsamtybW90dGNzZXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4Nzg1NTcsImV4cCI6MjA2MjQ1NDU1N30.R0b7rpUeUZNLc_tdVTQ9VBq8X9DoZpBMVwZoaRnOtEY"
);
