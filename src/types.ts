export type StatusValidade = 'longe' | 'organizar' | 'a vencer' | 'em risco' | 'vencido';

export interface Produto {
  codigoBarra: string;
  nome: string;
  fornecedor: string;
  validade: Date;
  quantidade: number;
  proximoLote: Date;
  status: StatusValidade;
  avaria: number; // Campo extra para somar o que quebrou no mês
}