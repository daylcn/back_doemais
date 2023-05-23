const express = require('express');
const app = express();
const enderecoRoutes = express.Router();

let Endereco = require('../model/Endereco');

// api to add endereco
enderecoRoutes.route('/add').post(function (req, res) {
    let endereco = new Endereco(req.body);
    endereco.save()
        .then(endereco => {
            res.status(200).json({ 'status': 'success', 'mssg': 'endereco added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get enderecos
enderecoRoutes.route('/').get(function (req, res) {
    Endereco.find(function (err, enderecos) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'enderecos': enderecos });
        }
    });
});

// api to get endereco
enderecoRoutes.route('/endereco/:id').get(function (req, res) {
    let id = req.params.id;
    Endereco.findById(id, function (err, endereco) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'endereco': endereco });
        }
    });
});

// api to update route
enderecoRoutes.route('/update/:id').put(function (req, res) {
    Endereco.findById(req.params.id, function (err, endereco) {
        if (!endereco) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            endereco.nome = req.body.nome;
            endereco.numero = req.body.numero;
            endereco.id = req.body.id;

            endereco.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
enderecoRoutes.route('/delete/:id').delete(function (req, res) {
    Endereco.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = enderecoRoutes;