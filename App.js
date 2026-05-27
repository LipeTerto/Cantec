import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, View, StyleSheet } from "react-native";
import { CarrinhoProvider } from "./src/context/CarrinhoContext";
import { AuthProvider } from "./src/context/AuthContext";
import { AdminProvider } from "./src/context/AdminContext";

import SplashScreen from "./src/screens/SplashScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import InstituicaoScreen from "./src/screens/InstituicaoScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CategoriaScreen from "./src/screens/CategoriaScreen";
import CarrinhoScreen from "./src/screens/CarrinhoScreen";
import TokenScreen from "./src/screens/TokenScreen";
import ConfirmacaoScreen from "./src/screens/ConfirmacaoScreen";
import CriarContaScreen from "./src/screens/CriarContaScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AdicionarInstituicaoScreen from "./src/screens/AdicionarInstituicaoScreen";
import PagamentoScreen from "./src/screens/PagamentoScreen";
import AdminLoginScreen from "./src/screens/AdminLoginScreen";
import AdminHomeScreen from "./src/screens/AdminHomeScreen";
import AdminRelatorioScreen from "./src/screens/AdminRelatorioScreen";
import AdminProdutosScreen from "./src/screens/AdminProdutosScreen";
import AdminGraficosScreen from "./src/screens/AdminGraficosScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Instituicao" component={InstituicaoScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Categoria" component={CategoriaScreen} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        <Stack.Screen name="Token" component={TokenScreen} />
        <Stack.Screen name="Confirmacao" component={ConfirmacaoScreen} />
        <Stack.Screen name="CriarConta" component={CriarContaScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdicionarInstituicao" component={AdicionarInstituicaoScreen} />
        <Stack.Screen name="Pagamento" component={PagamentoScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
        <Stack.Screen name="AdminRelatorio" component={AdminRelatorioScreen} />
        <Stack.Screen name="AdminProdutos" component={AdminProdutosScreen} />
        <Stack.Screen name="AdminGraficos" component={AdminGraficosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  if (Platform.OS !== "web") {
    return (
      <AuthProvider>
        <AdminProvider>
          <CarrinhoProvider>
            <AppNavigator />
          </CarrinhoProvider>
        </AdminProvider>
      </AuthProvider>
    );
  }

  return (
    <View style={styles.webContainer}>
      <View style={styles.phoneFrame}>
        <AuthProvider>
          <AdminProvider>
            <CarrinhoProvider>
              <AppNavigator />
            </CarrinhoProvider>
          </AdminProvider>
        </AuthProvider>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  phoneFrame: {
    width: "100%",
    maxWidth: 390,
    height: "100dvh",
    borderRadius: 0,
    boxShadow: "0 0 40px rgba(0,0,0,0.5)",
  },
});
