import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.nome}>Cantec</Text>
      <Text style={styles.rodape}>
        Cantec©2026 - Todos os direitos reservados
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  nome: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.beige,
    letterSpacing: 2,
  },
  rodape: {
    position: "absolute",
    bottom: 20,
    fontSize: 11,
    color: colors.beige,
  },
});
