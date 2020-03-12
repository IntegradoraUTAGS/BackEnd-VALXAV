/* jshint esversion: 8 */
const express = require('express');
const _ = require('underscore');
const Grupo = require('../../models/grupo'); //subir nivel
const app = express();

app.post('/registrar', (req, res) => {
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
                status:400,
                msg: 'Error al registrar el nombre del grupo.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se registro el nombre del grupo correctamente.',
            usrDB
        });
    });
});


//get
app.get('/obtener', (req, res) => {
    Grupo.find({ estado: true }).populate('carrera').populate('especialidad').populate('periodo')
        .exec((err, grupos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener el nombre del grupo.',
                    err
                });
            }
          
            return res.status(200).json({
                ok: true,
                status:200,
                msg: 'Se obtuvieron los grupos.',
                count: grupos.length,
                grupos
            });
        });
});

//get id
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Grupos.find({ estado: true, _id: id })
        .exec((err, grupos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener el nombre del grupo.',
                    err
                });
            }
        
            return res.status(200).json({
                ok: true,
                status:200,
                msg: 'Se obtuvo el grupo correctamente.',
                count: grupos.length,
                grupos
            });
        });
});

//put
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','carrera','especialidad','periodo']); 
    Grupo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al actualizar el nombre del grupo.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se al actualizo el grupo correctamente.',
            usrDB
        });

    });
});

//delete
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Grupos.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al eliminar el grupo.',
                cont:err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se eliminar el grupo correctamente.',
            cont:resp
        });
    });
});

module.exports = app;