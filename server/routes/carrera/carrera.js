/* jshint esversion: 8 */
const express = require('express');
const _ = require('underscore');
const Carrera = require('../../models/carrera'); //subir nivel
const app = express();

app.post('/registrar', (req, res) => {
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
                cont:err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se registro la carrera correctamente",
            usrDB
        });
    });
});


//get
app.get('/obtener', (req, res) => {
    Carrera.find({ estado: true, }) 
        .exec((err, carreras) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg:"No se mostro la carrera",
                    cont:err
                });
            }
            console.log(req.carrera);
            return res.status(200).json({
                ok: true,
                status:200,
                msg:"Se obtuvieron las carreras correctamente",
                count: carreras.length,
                carreras
            });
        });
});

//get id
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Carrera.find({ estado: true, _id: id }) 
        .exec((err, carreras) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg:"No se mostro la carrera",
                    cont:err
                });
            }
            console.log(req.carrera);
            return res.status(200).json({
                ok: true,
                status:400,
                msg:"Se mostro la carrera correctamente",
                count: carreras.length,
                carreras
            });
        });
});

//put
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']); 
    Carrera.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg:"No se actualizo la materia",
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se actualizo correctamente la carrera",
            cont:usrDB
        });

    });
});

//delete
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Carrera.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg:"No se elimino la carrera",
                cont:err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se elimino correctamente la carrera",
            resp
        });
    });
});

module.exports = app;