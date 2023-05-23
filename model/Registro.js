const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Registro = new Schema({
  categoria: {
    type: String
  },
  nome: {
    type: String
  },
  endereco: {
    type: Number
  },
  descricao: {
    type: String
  },
  imagem:{
    type: String
  }
},{
    collection: 'registro'
});

module.exports = mongoose.model('Registro', Registro);