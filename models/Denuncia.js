const mongoose = require('mongoose');

// Define a estrutura dos dados de cada denúncia no MongoDB
const denunciaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    localizacao: {
        type: String,
        required: true,
        trim: true
    },
    volume: {
        type: String,
        required: true,
        enum: ['Pequeno', 'Médio', 'Grande']
    },
    dataRegistro: {
        type: Date,
        default: Date.now
    }
});

// Exporta o modelo para ser utilizado no servidor
module.exports = mongoose.model('Denuncia', denunciaSchema);