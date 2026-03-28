// src/main.ts
import { Produto } from './types';
import { calcularStatus } from './utils';

// Dados de exemplo (depois virão do banco de dados/Supabase)
const produtosExemplo: Produto[] = [
  {
    codigoBarra: "7891234567890",
    nome: "Biscoito Piraquê Supreme",
    fornecedor: "Piraquê",
    validade: new Date("2026-12-24"),
    quantidade: 10,
    proximoLote: new Date("2026-06-01"),
    status: 'longe',
    avaria: 0
  },
  {
    codigoBarra: "789000111222",
    nome: "Leite Integral 1L",
    fornecedor: "Betânia",
    validade: new Date("2026-04-05"), // Próximo de hoje (28/03/2026)
    quantidade: 50,
    proximoLote: new Date("2026-04-10"),
    status: 'em risco',
    avaria: 0
  }
];

function renderizarTabela() {
  const tbody = document.getElementById('product-tbody');
  if (!tbody) return;

  tbody.innerHTML = ""; // Limpa a tabela antes de renderizar

  produtosExemplo.forEach(produto => {
    const hoje = new Date();
    const diffTime = produto.validade.getTime() - hoje.getTime();
    const diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Atualiza o status em tempo real baseada na data de hoje
    const statusAtualizado = calcularStatus(produto.validade);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>1</td>
      <td>${produto.codigoBarra}</td>
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>${produto.validade.toLocaleDateString('pt-BR')}</td>
      <td>${diasRestantes < 0 ? 'Expirado' : diasRestantes + ' dias'}</td>
      <td class="status-${statusAtualizado}">${statusAtualizado.toUpperCase()}</td>
      <td>
        <button class="btn-avaria" onclick="console.log('Registrar avaria para ${produto.nome}')">⚠️ Avaria</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  atualizarCards();
}

function atualizarCards() {
    // Lógica para contar quantos de cada status existem e exibir nos spans id="count-..."
    const counts = { longe: 0, organizar: 0, 'a vencer': 0, 'em risco': 0, vencido: 0 };
    
    produtosExemplo.forEach(p => {
        const status = calcularStatus(p.validade);
        counts[status as keyof typeof counts]++;
    });

    document.getElementById('count-longe')!.innerText = counts.longe.toString();
    document.getElementById('count-organizar')!.innerText = counts.organizar.toString();
    document.getElementById('count-avencer')!.innerText = counts['a vencer'].toString();
    document.getElementById('count-emrisco')!.innerText = counts['em risco'].toString();
    document.getElementById('count-vencidos')!.innerText = counts.vencido.toString();
}

// Inicia a página
renderizarTabela();