import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://bvquohctrxklneajmroa.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2cXVvaGN0cnhrbG5lYWptcm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4MjQ5MjMsImV4cCI6MjA5NTQwMDkyM30.0a-UMOnxBjg8jfLJpR4gl5K_bBFwP46Lvu3RNCRnA_0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});