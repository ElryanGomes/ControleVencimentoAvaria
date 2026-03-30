import { Produto } from '../types';
import { calcularStatus } from '../utils/date';

export const UI = {
    trocarTela(idExibir: string, idEsconder: string) {
        document.getElementById(idExibir)!.style.display = 'block';
        document.getElementById(idEsconder)!.style.display = 'none';
    },
    
    preencherModal(produto: Produto, placeholder: string) {
        const img = document.getElementById('modal-product-image') as HTMLImageElement;
        img.src = produto.imageUrl || placeholder;
        document.getElementById('modal-product-code')!.innerText = produto.codigoBarra;
        document.getElementById('modal-product-name')!.innerText = produto.nome;
        document.getElementById('modal-product-setor')!.innerText = produto.setor;
        document.getElementById('modal-product-fornecedor')!.innerText = produto.fornecedor;
        document.getElementById('modal-product-lote')!.innerText = produto.proximoLote.toLocaleDateString('pt-BR');
    },

    limparFormulario(idForm: string) {
        (document.getElementById(idForm) as HTMLFormElement).reset();
    }
};