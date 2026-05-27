import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../config/supabase";
import { colors } from "../styles/colors";

export default function AdminProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [estoque, setEstoque] = useState("");
  const [destaque, setDestaque] = useState(false);
  const [imagemUri, setImagemUri] = useState(null);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [aba, setAba] = useState("lista");

  useFocusEffect(
    useCallback(() => {
      carregarProdutos();
    }, [])
  );

  async function carregarProdutos() {
    const { data } = await supabase.from("produtos").select("*").order("id");
    if (data) setProdutos(data);
  }

  async function escolherImagem() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!resultado.canceled) {
      setImagemUri(resultado.assets[0].uri);
    }
  }

  async function uploadImagem(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const nomeArquivo = `produto_${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from("produtos")
      .upload(nomeArquivo, blob, { contentType: "image/jpeg" });

    if (error) return null;

    const { data } = supabase.storage.from("produtos").getPublicUrl(nomeArquivo);
    return data.publicUrl;
  }

  async function handleSalvar() {
    if (!nome || !preco || !estoque || !categoriaId) {
      setErro("Preencha nome, preço, estoque e categoria!");
      return;
    }

    setSalvando(true);
    setErro("");

    let imagemUrl = null;
    if (imagemUri) {
      imagemUrl = await uploadImagem(imagemUri);
    }

    const { error } = await supabase.from("produtos").insert({
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria_id: parseInt(categoriaId),
      estoque: parseInt(estoque),
      destaque,
      imagem_url: imagemUrl,
    });

    setSalvando(false);

    if (error) {
      setErro("Erro ao salvar produto!");
      return;
    }

    setNome("");
    setDescricao("");
    setPreco("");
    setCategoriaId("");
    setEstoque("");
    setDestaque(false);
    setImagemUri(null);
    await carregarProdutos();
    setAba("lista");
  }

  async function handleExcluir(id) {
    await supabase.from("produtos").delete().eq("id", id);
    await carregarProdutos();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Produtos</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.abas}>
        <TouchableOpacity
          style={[styles.aba, aba === "lista" && styles.abaAtiva]}
          onPress={() => setAba("lista")}
        >
          <Text style={[styles.abaTexto, aba === "lista" && styles.abaTextoAtivo]}>
            Lista
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.aba, aba === "adicionar" && styles.abaAtiva]}
          onPress={() => setAba("adicionar")}
        >
          <Text style={[styles.abaTexto, aba === "adicionar" && styles.abaTextoAtivo]}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>

      {aba === "lista" ? (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.lista}
          ListEmptyComponent={
            <View style={styles.vazio}>
              <Text style={styles.vazioTexto}>Nenhum produto cadastrado ainda.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.produtoCard}>
              {item.imagem_url ? (
                <Image source={{ uri: item.imagem_url }} style={styles.produtoImagem} />
              ) : (
                <View style={styles.produtoSemImagem}>
                  <Text style={styles.produtoEmoji}>🍽️</Text>
                </View>
              )}
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{item.nome}</Text>
                <Text style={styles.produtoPreco}>R${parseFloat(item.preco).toFixed(2)}</Text>
                <Text style={styles.produtoEstoque}>Estoque: {item.estoque}</Text>
              </View>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => handleExcluir(item.id)}
              >
                <Text style={styles.botaoExcluirTexto}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.form}>
          <TouchableOpacity style={styles.imagemPicker} onPress={escolherImagem}>
            {imagemUri ? (
              <Image source={{ uri: imagemUri }} style={styles.imagemPreview} />
            ) : (
              <Text style={styles.imagemPickerTexto}>📷 Toque para adicionar imagem</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Nome do produto</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Coxinha de frango" />

          <Text style={styles.label}>Descrição</Text>
          <TextInput style={[styles.input, styles.inputMultilinha]} value={descricao} onChangeText={setDescricao} placeholder="Descreva o produto" multiline numberOfLines={3} />

          <Text style={styles.label}>Preço (R$)</Text>
          <TextInput style={styles.input} value={preco} onChangeText={setPreco} placeholder="Ex: 8.00" keyboardType="decimal-pad" />

          <Text style={styles.label}>Categoria (1=Salgados, 2=Doces, 3=Bebidas)</Text>
          <TextInput style={styles.input} value={categoriaId} onChangeText={setCategoriaId} placeholder="Ex: 1" keyboardType="number-pad" />

          <Text style={styles.label}>Estoque</Text>
          <TextInput style={styles.input} value={estoque} onChangeText={setEstoque} placeholder="Ex: 20" keyboardType="number-pad" />

          <TouchableOpacity
            style={[styles.checkboxContainer]}
            onPress={() => setDestaque(!destaque)}
          >
            <View style={[styles.checkbox, destaque && styles.checkboxAtivo]}>
              {destaque && <Text style={styles.checkboxMarca}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Produto em destaque na Home</Text>
          </TouchableOpacity>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity
            style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]}
            onPress={handleSalvar}
            disabled={salvando}
          >
            {salvando ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.botaoSalvarTexto}>salvar produto</Text>
            )}
          </TouchableOpacity>
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
  lista: {
    padding: 16,
    paddingTop: 0,
  },
  produtoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  produtoImagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  produtoSemImagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.beige,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  produtoEmoji: {
    fontSize: 28,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textDark,
  },
  produtoPreco: {
    fontSize: 13,
    color: colors.textDark,
    marginTop: 2,
  },
  produtoEstoque: {
    fontSize: 12,
    color: colors.textDark,
    opacity: 0.6,
    marginTop: 2,
  },
  botaoExcluir: {
    padding: 8,
  },
  botaoExcluirTexto: {
    fontSize: 16,
    color: colors.textDark,
    opacity: 0.4,
  },
  form: {
    padding: 24,
    paddingTop: 8,
  },
  imagemPicker: {
    backgroundColor: colors.white,
    borderRadius: 12,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  imagemPreview: {
    width: "100%",
    height: "100%",
  },
  imagemPickerTexto: {
    fontSize: 14,
    color: colors.textDark,
    opacity: 0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: colors.textDark,
  },
  inputMultilinha: {
    height: 80,
    textAlignVertical: "top",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.textDark,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxAtivo: {
    backgroundColor: colors.orange,
    borderColor: colors.orange,
  },
  checkboxMarca: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.textDark,
  },
  erro: {
    color: "red",
    fontSize: 13,
    marginTop: 12,
    textAlign: "center",
  },
  botaoSalvar: {
    backgroundColor: colors.orange,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 32,
  },
  botaoDesabilitado: {
    opacity: 0.6,
  },
  botaoSalvarTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
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