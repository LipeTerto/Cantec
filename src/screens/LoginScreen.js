import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { colors } from "../styles/colors";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { entrar } = useAuth();

  async function handleEntrar() {
    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    const resultado = await entrar(email, senha);

    if (resultado.sucesso) {
      navigation.navigate("Instituicao");
    } else {
      setErro(resultado.mensagem);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Entrar</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity style={styles.botao} onPress={handleEntrar}>
          <Text style={styles.botaoTexto}>entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CriarConta")}>
          <Text style={styles.linkCadastro}>Não tem conta? Criar conta</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.rodape}>
        Cantec©2026 - Todos os direitos reservados
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  voltar: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textDark,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: colors.textDark,
  },
  erro: {
    color: "red",
    fontSize: 13,
    marginTop: 12,
    textAlign: "center",
  },
  botao: {
    backgroundColor: colors.orange,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 32,
  },
  botaoTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  linkCadastro: {
    textAlign: "center",
    marginTop: 16,
    color: colors.textDark,
    textDecorationLine: "underline",
    fontSize: 14,
  },
  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textDark,
    paddingBottom: 16,
  },
});
