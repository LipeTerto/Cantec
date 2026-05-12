import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { colors } from "../styles/colors";
import { produtos, categorias } from "../data/mockData";
import { useCarrinho } from "../context/CarrinhoContext";

export default function HomeScreen({ route, navigation }) {
  const { instituicao } = route.params;
  const destaques = produtos.filter((p) => p.destaque);
  const { adicionarItem } = useCarrinho();

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Foto da instituição */}

        <Image
          source={instituicao.imagem}
          style={styles.fotoInstituicao}
          resizeMode="cover"
        />

        {/* Nome da instituição */}
        <Text style={styles.nomeInstituicao}>{instituicao.nome}</Text>

        {/* Destaques */}
        <Text style={styles.secaoTitulo}>Destaques</Text>
        <FlatList
          data={destaques}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          numColumns={3}
          scrollEnabled={false}
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
                onPress={() => adicionarItem(item)}
              >
                <Text style={styles.botaoAddTexto}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Categorias */}
        <View style={styles.categoriasContainer}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoriaCard}
              onPress={() =>
                navigation.navigate("Categoria", { categoria: cat })
              }
            >
              {cat.imagem ? (
                <Image
                  source={cat.imagem}
                  style={styles.categoriaImagem}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.categoriaIcone}>{cat.icone}</Text>
              )}
              <Text style={styles.categoriaNome}>{cat.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botão fixo Seu Pedido */}
      <TouchableOpacity
        style={styles.botaoPedido}
        onPress={() => navigation.navigate("Carrinho")}
      >
        <Text style={styles.botaoPedidoTexto}>SEU PEDIDO &gt;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  fotoInstituicao: {
    width: "100%",
    height: 180,
  },
  nomeInstituicao: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.textDark,
    textAlign: "center",
    marginVertical: 16,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textDark,
    marginLeft: 16,
    marginBottom: 12,
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
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  semImagem: {
    fontSize: 36,
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
  categoriasContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    marginTop: 8,
  },
  categoriaCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "30%",
  },
  categoriaIcone: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoriaNome: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.textDark,
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
  categoriaImagem: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
});
