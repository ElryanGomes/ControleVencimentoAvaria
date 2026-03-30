import { Produto } from './types';
import { calcularStatus, formatarDataParaInput } from './utils/date';
import { ProdutoService, listaProdutos } from './services/produtoService';
import { UI } from './ui/dom';

// Estado global da tela
let produtoSelecionado: Produto | null = null;
let indexEditando: number | null = null;
const PLACEHOLDER_IMG = "https://i0.wp.com/espaferro.com.br/wp-content/uploads/2024/06/placeholder-83.png?fit=1200%2C800&ssl=1&w=640";

// Função de Renderização (Desenhar a tabela)
function renderizarTabela() {
    const tbody = document.getElementById('product-tbody');
    if (!tbody) return;
    tbody.innerHTML = "";

    // Busca a lista que está lá no Service
    listaProdutos.forEach((produto) => {
        const status = calcularStatus(produto.validade);
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>1</td>
            <td title="${produto.nome}">${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.validade.toLocaleDateString('pt-BR')}</td>
            <td class="status-${status}">${status.toUpperCase()}</td>
        `;

        tr.onclick = () => {
            produtoSelecionado = produto; // Salva quem foi clicado
            UI.preencherModal(produto, PLACEHOLDER_IMG);
            (document.getElementById('modal-container')!).style.display = 'flex';
        };

        tbody.appendChild(tr);
    });

    atualizarCards();
}

function atualizarCards() {
    const counts = { longe: 0, organizar: 0, 'a vencer': 0, 'em risco': 0, vencido: 0 };
    listaProdutos.forEach(p => {
        const s = calcularStatus(p.validade);
        counts[s as keyof typeof counts]++;
    });
    
    document.getElementById('count-longe')!.innerText = counts.longe.toString();
    document.getElementById('count-organizar')!.innerText = counts.organizar.toString();
    document.getElementById('count-avencer')!.innerText = counts['a vencer'].toString();
    document.getElementById('count-emrisco')!.innerText = counts['em risco'].toString();
    document.getElementById('count-vencidos')!.innerText = counts.vencido.toString();
}

// Eventos do Formulário (Salvar)
document.getElementById('form-produto')!.onsubmit = (e) => {
    e.preventDefault();

    const dados: Produto = {
        codigoBarra: (document.getElementById('ipt-codigo') as HTMLInputElement).value,
        nome: (document.getElementById('ipt-nome') as HTMLInputElement).value,
        setor: (document.getElementById('ipt-setor') as HTMLInputElement).value,
        fornecedor: (document.getElementById('ipt-fornecedor') as HTMLInputElement).value,
        validade: new Date((document.getElementById('ipt-validade') as HTMLInputElement).value + "T12:00:00"),
        quantidade: Number((document.getElementById('ipt-qtd') as HTMLInputElement).value),
        proximoLote: new Date((document.getElementById('ipt-lote') as HTMLInputElement).value + "T12:00:00"),
        status: 'longe',
        avaria: 0
    };

    if (indexEditando !== null) {
        ProdutoService.atualizar(indexEditando, dados);
    } else {
        ProdutoService.adicionar(dados);
    }

    UI.trocarTela('tela-home', 'tela-adicionar');
    renderizarTabela();
    indexEditando = null;
};

// Botões de Ação (Editar / Excluir)
document.getElementById('btn-excluir-produto')!.onclick = () => {
    if (produtoSelecionado) {
        if (confirm(`Excluir ${produtoSelecionado.nome}?`)) {
            ProdutoService.excluir(produtoSelecionado.codigoBarra);
            (document.getElementById('modal-container')!).style.display = 'none';
            renderizarTabela();
        }
    }
};

document.getElementById('btn-editar-produto')!.onclick = () => {
    if (produtoSelecionado) {
        indexEditando = listaProdutos.findIndex(p => p.codigoBarra === produtoSelecionado?.codigoBarra);
        UI.trocarTela('tela-adicionar', 'tela-home');
        (document.getElementById('modal-container')!).style.display = 'none';
        
        // Preenche os inputs para edição
        (document.getElementById('ipt-codigo') as HTMLInputElement).value = produtoSelecionado.codigoBarra;
        (document.getElementById('ipt-nome') as HTMLInputElement).value = produtoSelecionado.nome;
        (document.getElementById('ipt-setor') as HTMLInputElement).value = produtoSelecionado.setor;
        (document.getElementById('ipt-fornecedor') as HTMLInputElement).value = produtoSelecionado.fornecedor;
        (document.getElementById('ipt-validade') as HTMLInputElement).value = formatarDataParaInput(produtoSelecionado.validade);
        (document.getElementById('ipt-qtd') as HTMLInputElement).value = produtoSelecionado.quantidade.toString();
        (document.getElementById('ipt-lote') as HTMLInputElement).value = formatarDataParaInput(produtoSelecionado.proximoLote);
    }
};

// Cliques de Navegação e Fechar Modal
document.getElementById('modal-close')!.onclick = () => (document.getElementById('modal-container')!).style.display = 'none';
document.getElementById('btn-cancelar')!.onclick = () => UI.trocarTela('tela-home', 'tela-adicionar');

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const texto = (e.target as HTMLElement).innerText;
        if (texto === "Adicionar") UI.trocarTela('tela-adicionar', 'tela-home');
        if (texto === "DashBoard") UI.trocarTela('tela-home', 'tela-adicionar');
    });
});



renderizarTabela();