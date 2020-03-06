const express = require('express');
const _ = require('underscore');
const Carrera = require('../models/carrera'); //subir nivel
const app = express();

app.post('/carrera/registrar', (req, res) => {
    let body = req.body;
    let carrera = new Carrera({
        //para poder mandar los datos a la coleccion
        nombre: body.nombre
    });

    carrera.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al registrar el nombre de la carrera.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});


//get
app.get('/carrera/', (req, res) => {
    Carrera.find({ estado: true, }) 
        .exec((err, carreras) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.carrera);
            return res.status(200).json({
                ok: true,
                count: carreras.length,
                carreras
            });
        });
});

//get id
app.get('/carrera/:id', (req, res) => {
    let id = req.params.id;
    Carrera.find({ estado: true, _id: id }) 
        .exec((err, carreras) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.carrera);
            return res.status(200).json({
                ok: true,
                count: carreras.length,
                carreras
            });
        });
});

//put
app.put('/carrera/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']); 
    Carrera.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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

//delete
app.delete('/carrera/:id', (req, res) => {
    let id = req.params.id;
    Carrera.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;