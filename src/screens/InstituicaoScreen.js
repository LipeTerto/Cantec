import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/colors";
import { instituicoes } from "../data/mockData";

export default function InstituicaoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.logo}>🍪 cantec</Text>
        <Text style={styles.suaConta}>Sua conta</Text>
      </View>

      {/* Pergunta */}
      <Text style={styles.pergunta}>Qual cantina deseja acessar?</Text>

      {/* Lista de instituições */}
      <FlatList
        data={instituicoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.instituicaoItem}
            onPress={() => navigation.navigate("Home", { instituicao: item })}
          >
            <Text style={styles.instituicaoNome}>{item.nome}</Text>
            <View style={styles.linha} />
          </TouchableOpacity>
        )}
        style={styles.lista}
      />

      {/* Botão adicionar */}
      <TouchableOpacity style={styles.botaoAdicionar}>
        <Text style={styles.botaoAdicionarTexto}>
          adicionar instituição &gt;
        </Text>
      </TouchableOpacity>

      {/* Rodapé */}
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
    marginBottom: 24,
  },
  botaoAdicionarTexto: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "bold",
  },
  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textDark,
    paddingBottom: 16,
  },
});
