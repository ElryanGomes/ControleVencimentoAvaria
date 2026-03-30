export type StatusProduto = 'longe' | 'organizar' | 'a vencer' | 'em risco' | 'vencido';

export interface Produto {
    codigoBarra: string;
    setor: string;
    nome: string;
    fornecedor: string;
    validade: Date;
    quantidade: number;
    proximoLote: Date;
    status: StatusProduto;
    avaria: number;
    imageUrl?: string;
}