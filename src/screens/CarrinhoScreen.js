import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/colors";
import { useCarrinho } from "../context/CarrinhoContext";

export default function CarrinhoScreen({ navigation }) {
  const { itens, removerItem, total } = useCarrinho();

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Seu pedido</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Lista de itens */}
      {itens.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTexto}>Seu carrinho está vazio!</Text>
        </View>
      ) : (
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
              <TouchableOpacity onPress={() => removerItem(item.id)}>
                <Text style={styles.remover}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Total */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalTexto}>TOTAL: R${total.toFixed(2)}</Text>
      </View>

      {/* Botão Finalizar */}
      <TouchableOpacity
        style={styles.botaoFinalizar}
        onPress={() => navigation.navigate("Pagamento")}
      >
        <Text style={styles.botaoFinalizarTexto}>FINALIZAR &gt;</Text>
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
  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  vazioTexto: {
    fontSize: 16,
    color: colors.textDark,
    opacity: 0.5,
  },
  lista: {
    padding: 16,
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
  remover: {
    fontSize: 16,
    color: colors.textDark,
    opacity: 0.4,
    padding: 8,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.textDark,
    borderTopOpacity: 0.1,
  },
  totalTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textDark,
  },
  botaoFinalizar: {
    backgroundColor: colors.orange,
    padding: 18,
    alignItems: "center",
  },
  botaoFinalizarTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
