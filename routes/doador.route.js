const express = require('express');
const app = express();
const doadorRoutes = express.Router();

let Doador = require('../model/Doador');

// api to add doador
doadorRoutes.route('/add').post(function (req, res) {
    let doador = new Doador(req.body);
    doador.save()
        .then(doador => {
            res.status(200).json({ 'status': 'success', 'mssg': 'doador added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get doadores
doadorRoutes.route('/').get(function (req, res) {
    Doador.find(function (err, doadores) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'doadores': doadores });
        }
    });
});

// api to get doador
doadorRoutes.route('/doador/:id').get(function (req, res) {
    let id = req.params.id;
    Doador.findById(id, function (err, doador) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'doador': doador });
        }
    });
});

// api to update route
doadorRoutes.route('/update/:id').put(function (req, res) {
    Doador.findById(req.params.id, function (err, doador) {
        if (!doador) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            doador.nome = req.body.nome;
            doador.numero = req.body.numero;
            doador.id = req.body.id;

            doador.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
doadorRoutes.route('/delete/:id').delete(function (req, res) {
    Doador.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = doadorRoutes;