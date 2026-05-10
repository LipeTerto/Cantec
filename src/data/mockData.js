import { imagens } from "./imagens";

export const instituicoes = [
  {
    id: 1,
    nome: "Fatec - Osasco",
    imagem: imagens.fatec,
  },
];

export const categorias = [
  { id: 1, nome: "Salgados", imagem: imagens.salgados },
  { id: 2, nome: "Doces", imagem: imagens.doces },
  { id: 3, nome: "Bebidas", imagem: imagens.bebidas },
];

export const produtos = [
  {
    id: 1,
    nome: "Guaraviton",
    preco: 5.5,
    categoriaId: 3,
    destaque: true,
    imagem: imagens.guaraviton,
  },
  {
    id: 2,
    nome: "Croissant de chocolate",
    preco: 8.0,
    categoriaId: 1,
    destaque: true,
    imagem: imagens.croissant,
  },
  {
    id: 3,
    nome: "Batata Frita G.",
    preco: 20.0,
    categoriaId: 1,
    destaque: true,
    imagem: imagens.batataFrita,
  },
  {
    id: 4,
    nome: "Coxinha de frango",
    preco: 8.0,
    categoriaId: 1,
    destaque: false,
    imagem: null,
  },
  {
    id: 5,
    nome: "Kibe",
    preco: 8.0,
    categoriaId: 1,
    destaque: false,
    imagem: null,
  },
  {
    id: 6,
    nome: "X-Bacon",
    preco: 8.0,
    categoriaId: 1,
    destaque: false,
    imagem: null,
  },
  {
    id: 7,
    nome: "Esfiha de queijo",
    preco: 8.0,
    categoriaId: 1,
    destaque: false,
    imagem: null,
  },
  {
    id: 8,
    nome: "Enroladinho de salsicha",
    preco: 20.0,
    categoriaId: 1,
    destaque: false,
    imagem: null,
  },
];
