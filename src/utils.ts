import { StatusValidade } from './types';

export function calcularStatus(validade: Date): StatusValidade {
  const hoje = new Date();
  
  // Zeramos as horas para comparar apenas os dias
  hoje.setHours(0, 0, 0, 0);
  const dataValidade = new Date(validade);
  dataValidade.setHours(0, 0, 0, 0);

  // Diferença em milissegundos convertida para dias
  const diferencaTempo = dataValidade.getTime() - hoje.getTime();
  const diasRestantes = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

  if (diasRestantes < 0) return 'vencido';
  if (diasRestantes <= 10) return 'em risco';
  if (diasRestantes <= 25) return 'a vencer';
  if (diasRestantes <= 60) return 'organizar';
  
  return 'longe';
}