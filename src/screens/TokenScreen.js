import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { colors } from "../styles/colors";
import { useCarrinho } from "../context/CarrinhoContext";

export default function TokenScreen({ navigation }) {
  const { itens, total } = useCarrinho();

  // Gera um código único para o pedido
  const codigoPedido = `CANTEC-${Date.now()}`;

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

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <Text style={styles.qrLabel}>Resgate</Text>
        <QRCode value={codigoPedido} size={180} />
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

      {/* Botão Não Resgatado */}
      <TouchableOpacity
        style={styles.botaoNaoResgatado}
        onPress={() => navigation.navigate("Confirmacao")}
      >
        <Text style={styles.botaoNaoResgatadoTexto}>NÃO RESGATADO!</Text>
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
  qrContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  qrLabel: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 12,
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
  botaoNaoResgatado: {
    backgroundColor: colors.orange,
    padding: 18,
    alignItems: "center",
  },
  botaoNaoResgatadoTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
