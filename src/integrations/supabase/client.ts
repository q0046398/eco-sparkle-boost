import { createClient } from "@supabase/supabase-js";

// 你的 Supabase 設定
const supabaseUrl = "https://agdniagplmhohxxebbtd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZG5pYWdwbG1ob2h4eGViYnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM0ODEsImV4cCI6MjA4MDAzOTQ4MX0.n3HFS3Q0YZiTKGRj0JxijhVI_JUX71oTcgcwjZEXIiE";

export const supabase = createClient(supabaseUrl, supabaseKey);
