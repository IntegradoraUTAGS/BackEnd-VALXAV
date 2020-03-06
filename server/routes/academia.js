const express = require('express');
const _ = require('underscore');
const Academia = require('../models/academia');
const app = express();

app.get('/academia', (req, res) => {
    Academia.find()
        .exec((err, academia) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: academia.length,
                academia
            });
        });
});

app.post('/academia', (req, res) => {
    let body = req.body;

    let academia = new Academia({
        nombre: body.nombre
    });

    academia.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.put('/academia/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);

    Academia.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.delete('/academia/:id', (req, res) => {
    let id = req.params.id;

    Usuario.deleteOne({ _id: id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'Academia no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            resp
        });
    });

})

module.exports = app;