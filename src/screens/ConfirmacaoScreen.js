import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/colors";
import { useCarrinho } from "../context/CarrinhoContext";

export default function ConfirmacaoScreen({ navigation }) {
  const { itens, total, limparCarrinho } = useCarrinho();

  function concluir() {
    limparCarrinho();
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.titulo}>Seu pedido</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Status Resgatado */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusTexto}>Resgatado!{"\n"}Bom apetite!</Text>
        <Text style={styles.check}>✓</Text>
      </View>

      {/* Lista de itens */}
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemImagem}>
              {item.imagem ? (
                <Image
                  source={item.imagem}
                  style={styles.img}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.semImagem}>🍽️</Text>
              )}
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemPreco}>R${item.preco.toFixed(2)}</Text>
              {item.quantidade > 1 && (
                <Text style={styles.itemQuantidade}>x{item.quantidade}</Text>
              )}
            </View>
          </View>
        )}
      />

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>TOTAL: R${total.toFixed(2)}</Text>
      </View>

      {/* Botão Concluído */}
      <TouchableOpacity style={styles.botaoConcluido} onPress={concluir}>
        <Text style={styles.botaoConcluidoTexto}>CONCLUÍDO</Text>
      </TouchableOpacity>
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
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
  },
  statusContainer: {
    backgroundColor: colors.green,
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTexto: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  check: {
    color: colors.white,
    fontSize: 48,
    fontWeight: "bold",
  },
  lista: {
    paddingHorizontal: 16,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemImagem: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  semImagem: {
    fontSize: 36,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.textDark,
  },
  itemPreco: {
    fontSize: 13,
    color: colors.textDark,
    marginTop: 4,
  },
  itemQuantidade: {
    fontSize: 12,
    color: colors.orange,
    marginTop: 2,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.textDark,
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textDark,
  },
  botaoConcluido: {
    backgroundColor: colors.orange,
    padding: 18,
    alignItems: "center",
  },
  botaoConcluidoTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
