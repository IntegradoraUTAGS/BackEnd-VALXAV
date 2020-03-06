const express = require('express');
const _ = require('underscore');
const Periodo = require('../models/periodo'); //subir nivel
const app = express();

app.post('/periodo/registrar', (req, res) => {
    let body = req.body;
    let periodo = new Periodo({
        //para poder mandar los datos a la coleccion
        nombre: body.nombre,
        fechaInicio: body.fechaInicio,
        fechaFin: body.fechaFin
    
    });

    periodo.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al registrar el periodo.',
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
app.get('/periodo/', (req, res) => {
    Periodo.find({ estado: true, }) 
        .exec((err, periodos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.periodo);
            return res.status(200).json({
                ok: true,
                count: periodos.length,
                periodos
            });
        });
});

//get id
app.get('/periodo/:id', (req, res) => {
    let id = req.params.id;
    Periodo.find({ estado: true, _id: id }) 
        .exec((err, periodos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.periodo);
            return res.status(200).json({
                ok: true,
                count: periodos.length,
                periodos
            });
        });
});

//put
app.put('/periodo/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'fechaInicio', 'fechaFin']); 
    Periodo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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
app.delete('/periodo/:id', (req, res) => {
    let id = req.params.id;
    Periodo.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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