const express = require('express');
const app = express();
const registroRoutes = express.Router();

let Registro = require('../model/Registro');

// api to add registro
registroRoutes.route('/add').post(function (req, res) {
  let registro = new Registro(req.body);
  registro.save()
  .then(registro => {
    res.status(200).json({'status': 'success','mssg': 'registro added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get registros
registroRoutes.route('/').get(function (req, res) {
  Registro.find(function (err, registros){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','registros': registros});
    }
  });
});

// api to get registro
registroRoutes.route('/registro/:id').get(function (req, res) {
  let id = req.params.id;
  Registro.findById(id, function (err, registro){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','registro': registro});
    }
  });
});

// api to update route
registroRoutes.route('/update/:id').put(function (req, res) {
    Registro.findById(req.params.id, function(err, registro) {
    if (!registro){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        registro.nome = req.body.nome;
        registro.imagem = req.body.imagem;
        registro.endereco = req.body.endereco;
        registro.id = req.body.id;
        registro.detalhe = req.body.detalhe;

        registro.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
registroRoutes.route('/delete/:id').delete(function (req, res) {
  Registro.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = registroRoutes;