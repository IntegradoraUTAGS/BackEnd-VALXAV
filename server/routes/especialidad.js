const express = require('express');
const _ = require('underscore');
const Especialidad = require('../models/especialidad'); //subir nivel
const app = express();

app.post('/especialidad/registrar', (req, res) => {
    let body = req.body;
    let especialidad = new Especialidad({
   
        nombre: body.nombre,
        carrera:body.carrera
    });

    especialidad.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al registrar el nombre de la especialidad.',
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
app.get('/especialidad', (req, res) => {
    Especialidad.find({ estado: true }).populate('carrera')
        .exec((err, especialidads) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
          
            return res.status(200).json({
                ok: true,
                count: especialidads.length,
                especialidads
            });
        });
});

//get id
app.get('/especialidad/:id', (req, res) => {
    let id = req.params.id;
    Especialidad.find({ estado: true, _id: id })
        .exec((err, especialidads) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            console.log(req.especialidad);
            return res.status(200).json({
                ok: true,
                count: especialidads.length,
                especialidads
            });
        });
});

//put
app.put('/especialidad/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','carrera']); 
    Especialidad.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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
app.delete('/especialidad/:id', (req, res) => {
    let id = req.params.id;
    Especialidad.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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