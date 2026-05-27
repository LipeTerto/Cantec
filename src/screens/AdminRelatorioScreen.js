import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../config/supabase";
import { colors } from "../styles/colors";

function getCorCalor(ratio) {
  if (ratio <= 0) return "#4A90D9";
  if (ratio >= 1) return "#D93025";
  if (ratio < 0.5) {
    const t = ratio * 2;
    const r = Math.round(74 + t * (255 - 74));
    const g = Math.round(144 + t * (165 - 144));
    const b = Math.round(217 + t * (0 - 217));
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const t = (ratio - 0.5) * 2;
    const g = Math.round(165 + t * (48 - 165));
    return `rgb(255, ${g}, 0)`;
  }
}

export default function AdminRelatorioScreen({ navigation }) {
  const [cliques, setCliques] = useState([]);
  const [telaSelecionada, setTelaSelecionada] = useState("Todas");
  const [agrupados, setAgrupados] = useState([]);
  const [telas, setTelas] = useState(["Todas"]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    const { data, error } = await supabase
      .from("cliques")
      .select("*")
      .order("timestamp", { ascending: false });

    if (!error && data) {
      setCliques(data);
      const telasUnicas = ["Todas", ...new Set(data.map((c) => c.tela))];
      setTelas(telasUnicas);
    }
  }

  useEffect(() => {
    const filtrados =
      telaSelecionada === "Todas"
        ? cliques
        : cliques.filter((c) => c.tela === telaSelecionada);

    const contagem = {};
    filtrados.forEach(({ tela, elemento }) => {
      const chave = `${tela} › ${elemento}`;
      contagem[chave] = (contagem[chave] || 0) + 1;
    });

    const lista = Object.entries(contagem)
      .map(([chave, total]) => ({ chave, total }))
      .sort((a, b) => b.total - a.total);

    setAgrupados(lista);
  }, [cliques, telaSelecionada]);

  async function handleLimpar() {
    await supabase.from("cliques").delete().neq("id", 0);
    setCliques([]);
    setAgrupados([]);
    setTelas(["Todas"]);
  }

  const totalFiltrado = cliques.filter(
    (c) => telaSelecionada === "Todas" || c.tela === telaSelecionada
  ).length;

  const maxCliques = agrupados.length > 0 ? agrupados[0].total : 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Mapa de cliques</Text>
        <TouchableOpacity onPress={handleLimpar}>
          <Text style={styles.limpar}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtros}
        contentContainerStyle={styles.filtrosConteudo}
      >
        {telas.map((tela) => (
          <TouchableOpacity
            key={tela}
            style={[styles.filtroItem, telaSelecionada === tela && styles.filtroItemAtivo]}
            onPress={() => setTelaSelecionada(tela)}
          >
            <Text style={[styles.filtroTexto, telaSelecionada === tela && styles.filtroTextoAtivo]}>
              {tela}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtotal}>{totalFiltrado} cliques registrados</Text>

      <View style={styles.legenda}>
        <Text style={styles.legendaTexto}>Frio</Text>
        <View style={styles.legendaBarra}>
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <View key={v} style={[styles.legendaBloco, { backgroundColor: getCorCalor(v) }]} />
          ))}
        </View>
        <Text style={styles.legendaTexto}>Quente</Text>
      </View>

      {agrupados.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTexto}>Nenhum clique registrado ainda.</Text>
          <Text style={styles.vazioSub}>Use o app normalmente e volte aqui para ver os dados.</Text>
        </View>
      ) : (
        <FlatList
          data={agrupados}
          keyExtractor={(item) => item.chave}
          contentContainerStyle={styles.lista}
          renderItem={({ item, index }) => {
            const ratio = item.total / maxCliques;
            const cor = getCorCalor(ratio);
            return (
              <View style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemRank}>#{index + 1}</Text>
                  <Text style={styles.itemNome} numberOfLines={1}>{item.chave}</Text>
                  <Text style={[styles.itemContagem, { color: cor }]}>{item.total}x</Text>
                </View>
                <View style={styles.barraFundo}>
                  <View style={[styles.barra, { width: `${Math.max(ratio * 100, 4)}%`, backgroundColor: cor }]} />
                </View>
              </View>
            );
          }}
        />
      )}

      <Text style={styles.rodape}>Cantec©2026 - Todos os direitos reservados</Text>
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
  limpar: {
    fontSize: 14,
    color: colors.orange,
    fontWeight: "bold",
  },
  filtros: {
    maxHeight: 48,
  },
  filtrosConteudo: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  filtroItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: 8,
  },
  filtroItemAtivo: {
    backgroundColor: colors.orange,
  },
  filtroTexto: {
    fontSize: 13,
    color: colors.textDark,
  },
  filtroTextoAtivo: {
    color: colors.white,
    fontWeight: "bold",
  },
  subtotal: {
    fontSize: 12,
    color: colors.textDark,
    opacity: 0.6,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  legenda: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  legendaTexto: {
    fontSize: 11,
    color: colors.textDark,
    opacity: 0.6,
  },
  legendaBarra: {
    flex: 1,
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  legendaBloco: {
    flex: 1,
  },
  lista: {
    padding: 16,
    paddingTop: 8,
  },
  itemContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemRank: {
    fontSize: 12,
    color: colors.textDark,
    opacity: 0.4,
    width: 28,
  },
  itemNome: {
    flex: 1,
    fontSize: 13,
    color: colors.textDark,
    fontWeight: "500",
  },
  itemContagem: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },
  barraFundo: {
    height: 10,
    backgroundColor: "#E8DDD3",
    borderRadius: 5,
    overflow: "hidden",
  },
  barra: {
    height: 10,
    borderRadius: 5,
  },
  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  vazioTexto: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  vazioSub: {
    fontSize: 13,
    color: colors.textDark,
    opacity: 0.6,
    textAlign: "center",
    lineHeight: 20,
  },
  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textDark,
    paddingBottom: 16,
    paddingTop: 8,
  },
});