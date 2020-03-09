const express = require('express');
const _ = require('underscore');
const Grupo = require('../models/grupo'); //subir nivel
const app = express();

app.post('/grupo/registrar', (req, res) => {
    let body = req.body;
    let grupo = new Grupo({
   
        nombre: body.nombre,
        carrera:body.carrera,
        especialidad:body.especialidad,
        periodo:body.periodo

    });

    grupo.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al registrar el nombre del grupo.',
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
app.get('/grupo', (req, res) => {
    Grupo.find({ estado: true }).populate('carrera').populate('especialidad').populate('periodo')
        .exec((err, grupos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
          
            return res.status(200).json({
                ok: true,
                count: grupos.length,
                grupos
            });
        });
});

//get id
app.get('/grupo/:id', (req, res) => {
    let id = req.params.id;
    Grupos.find({ estado: true, _id: id })
        .exec((err, grupos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
        
            return res.status(200).json({
                ok: true,
                count: grupos.length,
                grupos
            });
        });
});

//put
app.put('/grupo/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','carrera','especialidad','periodo']); 
    Grupo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
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
app.delete('/grupo/:id', (req, res) => {
    let id = req.params.id;
    Grupos.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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