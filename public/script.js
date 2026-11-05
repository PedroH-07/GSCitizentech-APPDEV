// Aguarda o carregamento completo do documento HTML
document.addEventListener('DOMContentLoaded', () => {
    carregarIndicadores();
    carregarDenuncias();

    const form = document.getElementById('form-denuncia');
    form.addEventListener('submit', registrarDenuncia);
});

// Função para buscar e renderizar os indicadores (Total e Resumo)
async function carregarIndicadores() {
    try {
        const resposta = await fetch('/api/indicadores');
        const dados = await resposta.json();

        // Atualiza o indicador total
        document.getElementById('indicador-total').textContent = dados.total;

        // Atualiza o indicador de resumo por volume
        const containerResumo = document.getElementById('indicador-resumo');
        
        if (dados.resumo.length === 0) {
            containerResumo.innerHTML = '<p>Nenhum dado registrado.</p>';
            return;
        }

        let htmlResumo = '';
        dados.resumo.forEach(item => {
            htmlResumo += `
                <div class="indicador-item">
                    <span>${item._id}</span>
                    <strong>${item.quantidade}</strong>
                </div>
            `;
        });
        
        containerResumo.innerHTML = htmlResumo;

    } catch (erro) {
        console.error('Erro ao carregar indicadores:', erro);
        document.getElementById('indicador-resumo').innerHTML = '<p>Erro ao carregar dados.</p>';
    }
}

// Função para buscar e renderizar a tabela de denúncias
async function carregarDenuncias() {
    try {
        const resposta = await fetch('/api/denuncias');
        const denuncias = await resposta.json();
        
        const tbody = document.getElementById('tabela-denuncias');
        
        if (denuncias.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhuma denúncia cadastrada até o momento.</td></tr>';
            return;
        }

        let htmlTabela = '';
        denuncias.forEach(denuncia => {
            const dataFormatada = new Date(denuncia.dataRegistro).toLocaleDateString('pt-BR');
            const classeBadge = `badge-${denuncia.volume.toLowerCase()}`;

            htmlTabela += `
                <tr>
                    <td>${dataFormatada}</td>
                    <td>${denuncia.localizacao}</td>
                    <td>${denuncia.descricao}</td>
                    <td><span class="badge ${classeBadge}">${denuncia.volume}</span></td>
                </tr>
            `;
        });

        tbody.innerHTML = htmlTabela;

    } catch (erro) {
        console.error('Erro ao carregar denúncias:', erro);
    }
}

// Função para enviar os dados do formulário para a API
async function registrarDenuncia(evento) {
    evento.preventDefault(); 

    const btnSubmit = evento.target.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';

    const dadosFormulario = {
        descricao: document.getElementById('descricao').value,
        localizacao: document.getElementById('localizacao').value,
        volume: document.getElementById('volume').value
    };

    try {
        const resposta = await fetch('/api/denuncias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosFormulario)
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            exibirMensagem('sucesso', 'Denúncia registada com sucesso!');
            document.getElementById('form-denuncia').reset();
            
            // Recarrega os dados na tela para exibir o novo registo
            carregarIndicadores();
            carregarDenuncias();
        } else {
            exibirMensagem('erro', resultado.erro || 'Erro ao registar denúncia.');
        }

    } catch (erro) {
        console.error('Erro no envio:', erro);
        exibirMensagem('erro', 'Erro de comunicação com o servidor.');
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar Denúncia';
    }
}

// Função utilitária para exibir feedbacks no formulário
function exibirMensagem(tipo, texto) {
    const divMensagem = document.getElementById('mensagem-status');
    divMensagem.textContent = texto;
    divMensagem.className = `mensagem ${tipo}`;
    
    // Oculta a mensagem após 5 segundos
    setTimeout(() => {
        divMensagem.className = 'mensagem hidden';
    }, 5000);
}