import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../styles/colors";

export default function AdicionarInstituicaoScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [erro, setErro] = useState("");

  async function adicionar() {
    if (!nome || !cidade || !estado) {
      setErro("Preencha todos os campos!");
      return;
    }

    try {
      // Busca instituições já salvas
      const salvas = await AsyncStorage.getItem("instituicoes");
      const lista = salvas ? JSON.parse(salvas) : [];

      // Cria nova instituição
      const nova = {
        id: Date.now(),
        nome: nome,
        cidade: cidade,
        estado: estado,
        imagem: null,
      };

      // Salva a lista atualizada
      lista.push(nova);
      await AsyncStorage.setItem("instituicoes", JSON.stringify(lista));

      navigation.goBack();
    } catch (e) {
      setErro("Erro ao salvar instituição!");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Adicionar instituição</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome da instituição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Fatec - Osasco"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Osasco"
          value={cidade}
          onChangeText={setCidade}
        />

        <Text style={styles.label}>Estado</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: SP"
          value={estado}
          onChangeText={setEstado}
          maxLength={2}
          autoCapitalize="characters"
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity style={styles.botao} onPress={adicionar}>
          <Text style={styles.botaoTexto}>adicionar instituição &gt;</Text>
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
  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textDark,
    paddingBottom: 16,
  },
});
