import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAdmin } from "../context/AdminContext";
import { colors } from "../styles/colors";

export default function AdminGuard({ navigation, children }) {
  const { adminLogado, carregando } = useAdmin();

  useEffect(() => {
    if (!carregando && !adminLogado) {
      navigation.reset({ index: 0, routes: [{ name: "AdminLogin" }] });
    }
  }, [adminLogado, carregando]);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    );
  }

  if (!adminLogado) return null;

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
    alignItems: "center",
    justifyContent: "center",
  },
});