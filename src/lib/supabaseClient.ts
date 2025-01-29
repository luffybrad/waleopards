
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ypcfdkctzsxezookiwxa.supabase.co"
// //process.env.SUPABASE_URL;
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwY2Zka2N0enN4ZXpvb2tpd3hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MDU4MzQsImV4cCI6MjA1MzM4MTgzNH0.t7rlHTEQOjPhgE702uWfu5d0-UgFQF1jRs0O5u1h1Jo"
// process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
