# 🍪 Cantec

Aplicativo de cantina universitária desenvolvido em React Native com Expo. Permite que estudantes visualizem o cardápio, montem pedidos e realizem pagamentos de forma prática. Conta com uma área administrativa completa para gerenciamento da cantina.

---

## 📱 Funcionalidades

### Usuário
- Tela de splash e boas-vindas
- Cadastro e login de usuários
- Seleção de instituição
- Visualização de destaques e categorias de produtos
- Carrinho de compras
- Seleção de forma de pagamento (PIX, cartão, balcão)
- Geração de QR Code para retirada do pedido
- Confirmação de pedido com registro automático de venda

### Área Administrativa
- Login exclusivo para administradores
- Proteção de rotas — acesso restrito ao admin
- **Mapa de cliques** — rastreia quais botões e áreas são mais acessados
- **Gerenciamento de produtos** — adicionar, visualizar e excluir produtos com upload de imagem
- **Gráficos** — visualização de vendas por produto e estoque atual

---

## 🛠️ Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Supabase](https://supabase.com/) — autenticação e banco de dados
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — armazenamento local
- [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) — upload de imagens
- [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit) — gráficos
- [react-native-qrcode-svg](https://github.com/awesomejerry/react-native-qrcode-svg) — geração de QR Code

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- Conta no [Supabase](https://supabase.com/)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/LipeTerto/Cantec.git

# Entre na pasta do projeto
cd Cantec

# Instale as dependências
npm install
```

### Executando

```bash
# Rodar no navegador
npx expo start --web

# Rodar no Android
npx expo start --android

# Rodar no iOS
npx expo start --ios
```

---

## 🗄️ Banco de dados

O projeto utiliza o Supabase com as seguintes tabelas:

| Tabela | Descrição |
|---|---|
| `cliques` | Registros do mapa de calor de interações |
| `produtos` | Produtos da cantina com preço, estoque e imagem |
| `vendas` | Histórico de pedidos finalizados |

---

## 🔐 Acesso administrativo

O painel admin é acessado pelo rodapé da tela de boas-vindas. O usuário administrador é cadastrado diretamente no Supabase Authentication e não tem acesso às telas comuns do app.

---

## 📁 Estrutura do projeto

```
Cantec/
├── assets/
│   └── images/
├── src/
│   ├── components/
│   │   └── AdminGuard.js
│   ├── config/
│   │   └── supabase.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── CarrinhoContext.js
│   │   └── AdminContext.js
│   ├── data/
│   │   ├── mockData.js
│   │   └── imagens.js
│   ├── screens/
│   │   ├── SplashScreen.js
│   │   ├── WelcomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── CriarContaScreen.js
│   │   ├── InstituicaoScreen.js
│   │   ├── AdicionarInstituicaoScreen.js
│   │   ├── HomeScreen.js
│   │   ├── CategoriaScreen.js
│   │   ├── CarrinhoScreen.js
│   │   ├── PagamentoScreen.js
│   │   ├── TokenScreen.js
│   │   ├── ConfirmacaoScreen.js
│   │   ├── AdminLoginScreen.js
│   │   ├── AdminHomeScreen.js
│   │   ├── AdminRelatorioScreen.js
│   │   ├── AdminProdutosScreen.js
│   │   └── AdminGraficosScreen.js
│   ├── styles/
│   │   └── colors.js
│   └── utils/
│       └── clickTracker.js
├── App.js
└── package.json
```

---

## 👩‍💻 Desenvolvido por: Filipe Terto, Michelle Kaolin e Pedro Martins

Projeto desenvolvido como trabalho acadêmico — Fatec Osasco, 2026.
