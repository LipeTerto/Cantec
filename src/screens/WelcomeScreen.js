import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/cantina.png")}
        style={styles.foto}
        resizeMode="cover"
      />

      <View style={styles.inferior}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.nome}>cantec</Text>
        </View>

        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.botaoEntrarTexto}>entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCriar}
          onPress={() => navigation.navigate("CriarConta")}
        >
          <Text style={styles.botaoCriarTexto}>criar conta</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("AdminLogin")}>
        <Text style={styles.rodape}>Se você é Cantina </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
  },
  foto: {
    width: "100%",
    height: "40%",
  },
  inferior: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  nome: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.textDark,
  },
  botaoEntrar: {
    backgroundColor: colors.orange,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
  },
  botaoEntrarTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoCriar: {
    backgroundColor: colors.orange,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  botaoCriarTexto: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  rodape: {
    textAlign: "center",
    fontSize: 11,
    color: colors.textDark,
    paddingBottom: 16,
  },
});
