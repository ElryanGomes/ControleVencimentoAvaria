import { StatusProduto } from '../types';

export function calcularStatus(validade: Date): StatusProduto {
  const hoje = new Date();
  const dataValidade = new Date(validade);
  const diferencaTempo = dataValidade.getTime() - hoje.getTime();  // Diferença em milissegundos convertida para dias
  const diasRestantes = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

  hoje.setHours(0, 0, 0, 0);  // Zeramos as horas para comparar apenas os dias
  dataValidade.setHours(0, 0, 0, 0);

  if (diasRestantes < 0) return 'vencido';
  if (diasRestantes <= 10) return 'em risco';
  if (diasRestantes <= 25) return 'a vencer';
  if (diasRestantes <= 60) return 'organizar';
  
  return 'longe';
}

export function formatarDataParaInput(data: Date): string {
    return data.toISOString().split('T')[0];
}