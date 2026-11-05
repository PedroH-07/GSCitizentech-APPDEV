const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Denuncia = require('./models/Denuncia');

const app = express();
const PORT = 3000;

// Configuração para processar requisições JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração para servir os arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com o banco de dados MongoDB local
mongoose.connect('mongodb://127.0.0.1:27017/citizentech_lixo')
    .then(() => console.log('Conectado ao MongoDB com sucesso.'))
    .catch((erro) => console.error('Erro de conexão com o MongoDB:', erro));

// Rota POST: Recebimento, validação básica e persistência dos dados
app.post('/api/denuncias', async (req, res) => {
    try {
        const { descricao, localizacao, volume } = req.body;

        if (!descricao || !localizacao || !volume) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        const novaDenuncia = new Denuncia({ descricao, localizacao, volume });
        await novaDenuncia.save();

        res.status(201).json({ mensagem: 'Denúncia registrada com sucesso.' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro interno ao processar o registro.' });
    }
});

// Rota GET: Consulta e listagem das denúncias
app.get('/api/denuncias', async (req, res) => {
    try {
        const denuncias = await Denuncia.find().sort({ dataRegistro: -1 });
        res.status(200).json(denuncias);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao consultar os registros.' });
    }
});

// Rota GET: Processamento dos indicadores (Quantidade total e Resumo por categoria)
app.get('/api/indicadores', async (req, res) => {
    try {
        const totalRegistros = await Denuncia.countDocuments();
        
        const resumoPorVolume = await Denuncia.aggregate([
            { $group: { _id: '$volume', quantidade: { $sum: 1 } } },
            { $sort: { quantidade: -1 } }
        ]);

        res.status(200).json({
            total: totalRegistros,
            resumo: resumoPorVolume
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao processar os indicadores.' });
    }
});

// Tratamento simples para rotas inexistentes (Erro 404)
app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada.' });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado. Acesse http://localhost:${PORT}`);
});