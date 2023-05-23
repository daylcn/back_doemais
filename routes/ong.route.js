const express = require('express');
const app = express();
const ongRoutes = express.Router();

let Ong = require('../model/Ong');

// api to add ong
ongRoutes.route('/add').post(function (req, res) {
    let ong = new Ong(req.body);
    ong.save()
        .then(ong => {
            res.status(200).json({ 'status': 'success', 'mssg': 'ong added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get ongs
ongRoutes.route('/').get(function (req, res) {
    Ong.find(function (err, ongs) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'ongs': ongs });
        }
    });
});

// api to get ong
ongRoutes.route('/ong/:id').get(function (req, res) {
    let id = req.params.id;
    Ong.findById(id, function (err, ong) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'ong': ong });
        }
    });
});

// api to update route
ongRoutes.route('/update/:id').put(function (req, res) {
    Ong.findById(req.params.id, function (err, ong) {
        if (!ong) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            ong.nome = req.body.nome;
            ong.numero = req.body.numero;
            ong.id = req.body.id;

            ong.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
ongRoutes.route('/delete/:id').delete(function (req, res) {
    Ong.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = ongRoutes;