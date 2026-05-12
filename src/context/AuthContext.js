import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // usuário logado
  const [carregando, setCarregando] = useState(true);

  // Verifica se já tem usuário logado ao abrir o app
  useEffect(() => {
    async function verificarLogin() {
      try {
        const dados = await AsyncStorage.getItem("usuario_logado");
        if (dados) {
          setUsuario(JSON.parse(dados));
        }
      } catch (e) {
        console.log("Erro ao verificar login:", e);
      } finally {
        setCarregando(false);
      }
    }
    verificarLogin();
  }, []);

  async function cadastrar(nome, email, senha) {
    try {
      // Verifica se já existe uma conta com esse email
      const contas = await AsyncStorage.getItem("contas");
      const listaContas = contas ? JSON.parse(contas) : [];
      const jaExiste = listaContas.find((c) => c.email === email);

      if (jaExiste) {
        return { sucesso: false, mensagem: "Este e-mail já está cadastrado!" };
      }

      // Salva a nova conta
      const novaConta = { nome, email, senha };
      listaContas.push(novaConta);
      await AsyncStorage.setItem("contas", JSON.stringify(listaContas));

      // Loga automaticamente após cadastro
      await AsyncStorage.setItem(
        "usuario_logado",
        JSON.stringify({ nome, email }),
      );
      setUsuario({ nome, email });

      return { sucesso: true };
    } catch (e) {
      return { sucesso: false, mensagem: "Erro ao cadastrar!" };
    }
  }

  async function entrar(email, senha) {
    try {
      const contas = await AsyncStorage.getItem("contas");
      const listaContas = contas ? JSON.parse(contas) : [];
      const conta = listaContas.find(
        (c) => c.email === email && c.senha === senha,
      );

      if (!conta) {
        return { sucesso: false, mensagem: "E-mail ou senha incorretos!" };
      }

      await AsyncStorage.setItem(
        "usuario_logado",
        JSON.stringify({ nome: conta.nome, email: conta.email }),
      );
      setUsuario({ nome: conta.nome, email: conta.email });

      return { sucesso: true };
    } catch (e) {
      return { sucesso: false, mensagem: "Erro ao entrar!" };
    }
  }

  async function sair() {
    await AsyncStorage.removeItem("usuario_logado");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, cadastrar, entrar, sair }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
