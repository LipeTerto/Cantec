import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";
import { supabase } from "../config/supabase";
import { colors } from "../styles/colors";

const larguraTela = Dimensions.get("window").width - 48;

const configGrafico = {
  backgroundGradientFrom: colors.white,
  backgroundGradientTo: colors.white,
  color: (opacity = 1) => `rgba(242, 138, 48, ${opacity})`,
  labelColor: () => colors.textDark,
  barPercentage: 0.6,
  decimalPlaces: 0,
};

const configGraficoEstoque = {
  ...configGrafico,
  color: (opacity = 1) => `rgba(90, 122, 90, ${opacity})`,
};

export default function AdminGraficosScreen({ navigation }) {
  const [aba, setAba] = useState("vendas");
  const [dadosVendas, setDadosVendas] = useState(null);
  const [dadosEstoque, setDadosEstoque] = useState(null);
  const [totalArrecadado, setTotalArrecadado] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    setCarregando(true);

    const { data: vendas } = await supabase
      .from("vendas")
      .select("*")
      .order("timestamp", { ascending: false });

    if (vendas && vendas.length > 0) {
      const agrupado = {};
      let soma = 0;

      vendas.forEach((v) => {
        agrupado[v.produto_nome] = (agrupado[v.produto_nome] || 0) + v.quantidade;
        soma += v.total;
      });

      const entradas = Object.entries(agrupado)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

      setDadosVendas({
        labels: entradas.map(([nome]) => nome.substring(0, 8)),
        datasets: [{ data: entradas.map(([, qtd]) => qtd) }],
      });
      setTotalArrecadado(soma);
    } else {
      setDadosVendas(null);
      setTotalArrecadado(0);
    }

    const { data: produtos } = await supabase
      .from("produtos")
      .select("nome, estoque")
      .order("estoque", { ascending: true })
      .limit(6);

    if (produtos && produtos.length > 0) {
      setDadosEstoque({
        labels: produtos.map((p) => p.nome.substring(0, 8)),
        datasets: [{ data: produtos.map((p) => p.estoque) }],
      });
    } else {
      setDadosEstoque(null);
    }

    setCarregando(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Gráficos</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.abas}>
        <TouchableOpacity
          style={[styles.aba, aba === "vendas" && styles.abaAtiva]}
          onPress={() => setAba("vendas")}
        >
          <Text style={[styles.abaTexto, aba === "vendas" && styles.abaTextoAtivo]}>
            Vendas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.aba, aba === "estoque" && styles.abaAtiva]}
          onPress={() => setAba("estoque")}
        >
          <Text style={[styles.abaTexto, aba === "estoque" && styles.abaTextoAtivo]}>
            Estoque
          </Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <View style={styles.carregando}>
          <ActivityIndicator size="large" color={colors.orange} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.conteudo}>
          {aba === "vendas" ? (
            <>
              <View style={styles.resumoCard}>
                <Text style={styles.resumoLabel}>Total arrecadado</Text>
                <Text style={styles.resumoValor}>R${totalArrecadado.toFixed(2)}</Text>
              </View>

              <Text style={styles.secaoTitulo}>Unidades vendidas por produto</Text>

              {dadosVendas ? (
                <View style={styles.graficoContainer}>
                  <BarChart
                    data={dadosVendas}
                    width={larguraTela}
                    height={220}
                    chartConfig={configGrafico}
                    style={styles.grafico}
                    showValuesOnTopOfBars
                    fromZero
                  />
                </View>
              ) : (
                <View style={styles.vazio}>
                  <Text style={styles.vazioTexto}>Nenhuma venda registrada ainda.</Text>
                </View>
              )}
            </>
          ) : (
            <>
              <Text style={styles.secaoTitulo}>Estoque atual por produto</Text>

              {dadosEstoque ? (
                <View style={styles.graficoContainer}>
                  <BarChart
                    data={dadosEstoque}
                    width={larguraTela}
                    height={220}
                    chartConfig={configGraficoEstoque}
                    style={styles.grafico}
                    showValuesOnTopOfBars
                    fromZero
                  />
                </View>
              ) : (
                <View style={styles.vazio}>
                  <Text style={styles.vazioTexto}>Nenhum produto cadastrado ainda.</Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
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
  abas: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
  },
  aba: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  abaAtiva: {
    backgroundColor: colors.orange,
  },
  abaTexto: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textDark,
  },
  abaTextoAtivo: {
    color: colors.white,
  },
  carregando: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  conteudo: {
    padding: 16,
    paddingTop: 0,
  },
  resumoCard: {
    backgroundColor: colors.orange,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  resumoLabel: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.85,
    marginBottom: 4,
  },
  resumoValor: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.white,
  },
  secaoTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 12,
  },
  graficoContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    overflow: "hidden",
  },
  grafico: {
    borderRadius: 8,
  },
  vazio: {
    alignItems: "center",
    paddingTop: 48,
  },
  vazioTexto: {
    fontSize: 14,
    color: colors.textDark,
    opacity: 0.5,
  },
  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textDark,
    paddingBottom: 16,
    paddingTop: 8,
  },
});