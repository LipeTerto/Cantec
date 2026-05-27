import { supabase } from "../config/supabase";

export async function registrarClique(tela, elemento, userId = "anonimo") {
  await supabase.from("cliques").insert({
    tela,
    elemento,
    user_id: userId,
    timestamp: Date.now(),
  });
}