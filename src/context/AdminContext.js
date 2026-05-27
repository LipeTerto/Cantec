import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../config/supabase";

const AdminContext = createContext();
const ADMIN_EMAIL = "admin@cantec.com";

export function AdminProvider({ children }) {
  const [adminLogado, setAdminLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email === ADMIN_EMAIL) {
        setAdminLogado(session.user);
      }
      setCarregando(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user?.email === ADMIN_EMAIL) {
          setAdminLogado(session.user);
        } else {
          setAdminLogado(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function entrarAdmin(email, senha) {
    if (email !== ADMIN_EMAIL) {
      return { sucesso: false, mensagem: "Acesso não autorizado!" };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      return { sucesso: false, mensagem: "E-mail ou senha incorretos!" };
    }

    return { sucesso: true };
  }

  async function sairAdmin() {
    await supabase.auth.signOut();
    setAdminLogado(null);
  }

  return (
    <AdminContext.Provider value={{ adminLogado, carregando, entrarAdmin, sairAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}