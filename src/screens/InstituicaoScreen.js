import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../styles/colors";
import { instituicoes as instituicoesMock } from "../data/mockData";
// ── ADICIONADO ──────────────────────────────────────────────────────────────
import { useAuth } from "../context/AuthContext";
import { registrarClique } from "../utils/clickTracker";
// ────────────────────────────────────────────────────────────────────────────

export default function InstituicaoScreen({ navigation }) {
  const [instituicoes, setInstituicoes] = useState([]);
  // ── ADICIONADO ────────────────────────────────────────────────────────────
  const { sair } = useAuth();
  // ─────────────────────────────────────────────────────────────────────────

  // Recarrega sempre que a tela recebe foco (ex: ao voltar da tela de adicionar)
  useFocusEffect(
    useCallback(() => {
      carregarInstituicoes();
    }, []),
  );

  async function carregarInstituicoes() {
    try {
      const salvas = await AsyncStorage.getItem("instituicoes");
      const listaExtra = salvas ? JSON.parse(salvas) : [];
      // Junta as do mockData com as adicionadas pelo usuário
      setInstituicoes([...instituicoesMock, ...listaExtra]);
    } catch (e) {
      setInstituicoes(instituicoesMock);
    }
  }

  // ── ADICIONADO ────────────────────────────────────────────────────────────
  async function handleSair() {
    await registrarClique("Instituicao", "botaoSair");
    await sair();
    navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
  }
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🍪 cantec</Text>
        {/* ── MODIFICADO: "Sua conta" virou botão de Sair ───────────────── */}
        <TouchableOpacity onPress={handleSair}>
          <Text style={styles.suaConta}>Sair</Text>
        </TouchableOpacity>
        {/* ────────────────────────────────────────────────────────────────── */}
      </View>

      <Text style={styles.pergunta}>Qual cantina deseja acessar?</Text>

      <FlatList
        data={instituicoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.instituicaoItem}
            onPress={() => {
              // ── ADICIONADO ───────────────────────────────────────────────
              registrarClique("Instituicao", `selecionarInstituicao_${item.nome}`);
              // ─────────────────────────────────────────────────────────────
              navigation.navigate("Home", { instituicao: item });
            }}
          >
            <Text style={styles.instituicaoNome}>{item.nome}</Text>
            {item.cidade && (
              <Text style={styles.instituicaoCidade}>
                {item.cidade} - {item.estado}
              </Text>
            )}
            <View style={styles.linha} />
          </TouchableOpacity>
        )}
        style={styles.lista}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => {
          // ── ADICIONADO ─────────────────────────────────────────────────
          registrarClique("Instituicao", "botaoAdicionarInstituicao");
          // ───────────────────────────────────────────────────────────────
          navigation.navigate("AdicionarInstituicao");
        }}
      >
        <Text style={styles.botaoAdicionarTexto}>
          adicionar instituição &gt;
        </Text>
      </TouchableOpacity>

      {/* ── ADICIONADO: link discreto para o relatório ──────────────────── */}
      <TouchableOpacity
        style={styles.botaoRelatorio}
        onPress={() => navigation.navigate("Relatorio")}
      >
        <Text style={styles.botaoRelatorioTexto}>📊 Ver mapa de cliques</Text>
      </TouchableOpacity>
      {/* ──────────────────────────────────────────────────────────────────── */}

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
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
  },
  suaConta: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textDark,
    textDecorationLine: "underline",
  },
  pergunta: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 32,
  },
  lista: {
    flex: 1,
  },
  instituicaoItem: {
    marginBottom: 24,
  },
  instituicaoNome: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 4,
  },
  instituicaoCidade: {
    fontSize: 12,
    color: colors.textDark,
    opacity: 0.6,
    marginBottom: 8,
  },
  linha: {
    height: 1,
    backgroundColor: colors.textDark,
    opacity: 0.3,
  },
  botaoAdicionar: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 12,
  },
  botaoAdicionarTexto: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
  // ── ADICIONADO ────────────────────────────────────────────────────────────
  botaoRelatorio: {
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 4,
  },
  botaoRelatorioTexto: {
    fontSize: 13,
    color: colors.textDark,
    opacity: 0.5,
  },
  // ─────────────────────────────────────────────────────────────────────────
  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textDark,
    paddingBottom: 16,
  },
});