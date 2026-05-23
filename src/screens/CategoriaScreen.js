import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState, useRef } from "react";
import Toast from "./Toast.js";
import { colors } from "../styles/colors";
import { produtos, imagens } from "../data/mockData";
import { useCarrinho } from "../context/CarrinhoContext";

export default function CategoriaScreen({ route, navigation }) {
  const { categoria } = route.params;
  const produtosDaCategoria = produtos.filter(
    (p) => p.categoriaId === categoria.id,
  );
  const { adicionarItem } = useCarrinho();

//toast aq
  const [toastVisivel, setToastVisivel] = useState(false);
  const [toastMensagem, setToastMensagem] = useState("");
  const timeoutRef = useRef(null);
  const mostrarToast = (nome) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToastMensagem(`✓ adicionado! ao carrinho`);
    setToastVisivel(false);
    setTimeout(() => setToastVisivel(true), 10);
    timeoutRef.current = setTimeout(() => setToastVisivel(false), 2100);
};

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>{categoria.nome}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Grade de produtos */}
      <FlatList
        data={produtosDaCategoria}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.produtoCard}>
            <View style={styles.produtoImagem}>
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
            <Text style={styles.produtoNome}>{item.nome}</Text>
            <Text style={styles.produtoPreco}>R${item.preco.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.botaoAdd}
              onPress={() => {adicionarItem(item);
              mostrarToast(item.nome);
              }}
            >
              <Text style={styles.botaoAddTexto}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botão fixo Seu Pedido */}
      <TouchableOpacity
        style={styles.botaoPedido}
        onPress={() => navigation.navigate("Carrinho")}
      >
        <Text style={styles.botaoPedidoTexto}>SEU PEDIDO &gt;</Text>
      </TouchableOpacity>

       <Toast visivel={toastVisivel} msg={toastMensagem} />

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
  lista: {
    padding: 8,
  },
  produtoCard: {
    flex: 1,
    alignItems: "center",
    margin: 6,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 8,
  },
  produtoImagem: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  semImagem: {
    fontSize: 40,
  },
  produtoNome: {
    fontSize: 11,
    textAlign: "center",
    color: colors.textDark,
    marginTop: 4,
  },
  produtoPreco: {
    fontSize: 11,
    color: colors.textDark,
    marginTop: 2,
  },
  botaoAdd: {
    backgroundColor: colors.orange,
    borderRadius: 20,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  botaoAddTexto: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 22,
  },
  botaoPedido: {
    backgroundColor: colors.orange,
    padding: 18,
    alignItems: "center",
  },
  botaoPedidoTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
