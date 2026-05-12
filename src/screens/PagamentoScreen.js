import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { colors } from "../styles/colors";

export default function PagamentoScreen({ navigation }) {
  const [selecionado, setSelecionado] = useState(null);
  const [erro, setErro] = useState("");

  const formas = [
    { id: 1, label: "PIX", icone: "📱" },
    { id: 2, label: "Cartão de crédito", icone: "💳" },
    { id: 3, label: "Cartão de débito", icone: "💳" },
    { id: 4, label: "Pagar no balcão", icone: "🏪" },
  ];

  function confirmar() {
    if (!selecionado) {
      setErro("Selecione uma forma de pagamento!");
      return;
    }
    navigation.navigate("Token", { formaPagamento: selecionado });
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Forma de pagamento</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.subtitulo}>Como deseja pagar?</Text>

        {/* Opções de pagamento */}
        {formas.map((forma) => (
          <TouchableOpacity
            key={forma.id}
            style={[
              styles.opcao,
              selecionado?.id === forma.id && styles.opcaoSelecionada,
            ]}
            onPress={() => {
              setSelecionado(forma);
              setErro("");
            }}
          >
            <Text style={styles.opcaoIcone}>{forma.icone}</Text>
            <Text
              style={[
                styles.opcaoLabel,
                selecionado?.id === forma.id && styles.opcaoLabelSelecionada,
              ]}
            >
              {forma.label}
            </Text>
            <View
              style={[
                styles.radio,
                selecionado?.id === forma.id && styles.radioSelecionado,
              ]}
            >
              {selecionado?.id === forma.id && (
                <View style={styles.radioPonto} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* PIX — mostra chave quando selecionado */}
        {selecionado?.id === 1 && (
          <View style={styles.pixContainer}>
            <Text style={styles.pixLabel}>Chave PIX da cantina:</Text>
            <Text style={styles.pixChave}>cantec@fatec.sp.gov.br</Text>
          </View>
        )}

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      </View>

      {/* Botão Confirmar */}
      <TouchableOpacity style={styles.botao} onPress={confirmar}>
        <Text style={styles.botaoTexto}>CONFIRMAR &gt;</Text>
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
  conteudo: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 24,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  opcaoSelecionada: {
    borderColor: colors.orange,
  },
  opcaoIcone: {
    fontSize: 24,
    marginRight: 12,
  },
  opcaoLabel: {
    flex: 1,
    fontSize: 15,
    color: colors.textDark,
  },
  opcaoLabelSelecionada: {
    fontWeight: "bold",
    color: colors.orange,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textDark,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelecionado: {
    borderColor: colors.orange,
  },
  radioPonto: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.orange,
  },
  pixContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.orange,
  },
  pixLabel: {
    fontSize: 12,
    color: colors.textDark,
    opacity: 0.6,
    marginBottom: 4,
  },
  pixChave: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textDark,
  },
  erro: {
    color: "red",
    fontSize: 13,
    marginTop: 12,
    textAlign: "center",
  },
  botao: {
    backgroundColor: colors.orange,
    padding: 18,
    alignItems: "center",
  },
  botaoTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
