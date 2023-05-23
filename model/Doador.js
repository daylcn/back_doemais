const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Doador = new Schema({
    nome: {
        type: String
    },
    cpf: {
        type: String
    },
    telefone: {
        type: String
    },
    email: {
        type: String
    },
    senha: {
        type: String
    },

}, {
    collection: 'doador'
});

module.exports = mongoose.model('Doador', Doador);