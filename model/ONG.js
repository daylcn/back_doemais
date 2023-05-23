const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ONG = new Schema({
    nome: {
        type: String
    },
    cpf: {
        type: String
    },
    telefone: {
        type: String
    },
    razaoSocial: {
        type: String
    },
    cnpj: {
        type: String
    },
    email: {
        type: String
    },
    senha: {
        type: String
    },

}, {
    collection: 'ong'
});

module.exports = mongoose.model('ONG', ONG);