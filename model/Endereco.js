const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Endereco = new Schema({
    cep: {
        type: String
    },
    rua: {
        type: String
    },
    numero: {
        type: String
    },
    bairro: {
        type: String
    },
    cidade: {
        type: String
    },
    estado: {
        type: String
    }

}, {
    collection: 'endereco'
});

module.exports = mongoose.model('Endereco', Endereco);