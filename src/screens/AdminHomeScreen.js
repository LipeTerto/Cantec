import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { useAdmin } from "../context/AdminContext";
import AdminGuard from "../components/AdminGuard";

export default function AdminHomeScreen({ navigation }) {
  const { sairAdmin } = useAdmin();

  async function handleSair() {
    await sairAdmin();
    navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
  }

  return (
    <AdminGuard navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>🍪 cantec</Text>
          <TouchableOpacity onPress={handleSair}>
            <Text style={styles.sair}>Sair</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>Painel do administrador</Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("AdminRelatorio")}
          >
            <Text style={styles.cardIcone}>📊</Text>
            <Text style={styles.cardTitulo}>Mapa de cliques</Text>
            <Text style={styles.cardDescricao}>Veja quais áreas são mais acessadas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("AdminProdutos")}
          >
            <Text style={styles.cardIcone}>🍽️</Text>
            <Text style={styles.cardTitulo}>Produtos</Text>
            <Text style={styles.cardDescricao}>Adicione e gerencie produtos da cantina</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("AdminGraficos")}
          >
            <Text style={styles.cardIcone}>📈</Text>
            <Text style={styles.cardTitulo}>Gráficos</Text>
            <Text style={styles.cardDescricao}>Vendas e estoque da cantina</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.rodape}>Cantec©2026 - Todos os direitos reservados</Text>
      </View>
    </AdminGuard>
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
    marginBottom: 32,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
  },
  sair: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textDark,
    textDecorationLine: "underline",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 24,
  },
  grid: {
    flex: 1,
    gap: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
  },
  cardIcone: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 4,
  },
  cardDescricao: {
    fontSize: 13,
    color: colors.textDark,
    opacity: 0.6,
  },
  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textDark,
    paddingBottom: 16,
    paddingTop: 8,
  },
});