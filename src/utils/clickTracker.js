import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_STORAGE = "cantec_mapa_cliques";

// Registra um clique — chame isso no onPress de qualquer botão
// tela: nome da tela (ex: "Home")
// elemento: nome do botão (ex: "botaoPedido")
export async function registrarClique(tela, elemento) {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
    const lista = dados ? JSON.parse(dados) : [];
    lista.push({ tela, elemento, timestamp: Date.now() });
    await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  } catch (e) {
    // erro silencioso — não interrompe o fluxo do app
  }
}

// Retorna todos os cliques registrados
export async function buscarCliques() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    return [];
  }
}

// Apaga todos os dados do mapa de cliques
export async function limparCliques() {
  try {
    await AsyncStorage.removeItem(CHAVE_STORAGE);
  } catch (e) {}
}