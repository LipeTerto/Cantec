import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  function adicionarItem(produto) {
    setItens((atual) => {
      const existe = atual.find((i) => i.id === produto.id);
      if (existe) {
        // Produto já está no carrinho, aumenta a quantidade
        return atual.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i,
        );
      }
      // Produto novo, adiciona com quantidade 1
      return [...atual, { ...produto, quantidade: 1 }];
    });
  }

  function removerItem(produtoId) {
    setItens((atual) => atual.filter((i) => i.id !== produtoId));
  }

  function limparCarrinho() {
    setItens([]);
  }

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionarItem, removerItem, limparCarrinho, total }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}
