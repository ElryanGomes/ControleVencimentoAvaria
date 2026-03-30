import { Produto } from '../types';

export let listaProdutos: Produto[] = [
    {
    codigoBarra: "7891234567890",
    setor: "1",
    nome: "Biscoito Piraquê Supreme",
    fornecedor: "Piraquê",
    validade: new Date("2026-12-24"),
    quantidade: 10,
    proximoLote: new Date("2026-06-01"),
    status: 'longe',
    avaria: 0,
    imageUrl: ""
  },
  {
    codigoBarra: "789000111222",
    setor: "1",
    nome: "Leite Integral 1L",
    fornecedor: "Betânia",
    validade: new Date("2026-04-05"),
    quantidade: 50,
    proximoLote: new Date("2026-04-10"),
    status: 'em risco',
    avaria: 0,
    imageUrl: "https://dmvfarma.vtexassets.com/arquivos/ids/292434-800-auto?v=638969268089800000&width=800&height=auto&aspect=true"
  }
];

export const ProdutoService = {
    adicionar(p: Produto) {
        listaProdutos.push(p);
    },
    atualizar(index: number, p: Produto) {
        listaProdutos[index] = p;
    },
    excluir(codigo: string) {
        listaProdutos = listaProdutos.filter(p => p.codigoBarra !== codigo);
    }
};