/* jshint esversion: 8 */
const express = require('express');
const _ = require('underscore');
const Especialidad = require('../../models/especialidad'); //subir nivel
const app = express();

app.post('/registrar', (req, res) => {
    let body = req.body;
    let especialidad = new Especialidad({
   
        nombre: body.nombre,
        carrera:body.carrera
    });

    especialidad.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al registrar el nombre de la especialidad.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se registro la especialidad correctamente",
            usrDB
        });
    });
});


//get
app.get('/obtener', (req, res) => {
    Especialidad.find({ estado: true }).populate('carrera')
        .exec((err, especialidads) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener el nombre de la especialidad.',
                    err
                });
            }
          
            return res.status(200).json({
                ok: true,
                status:200,
                msg: 'Se obtuvieron las  especialidad.',
                count: especialidads.length,
                especialidads
            });
        });
});

//get id
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Especialidad.find({ estado: true, _id: id })
        .exec((err, especialidads) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener el nombre de la especialidad.',
                    err
                });
            }
            console.log(req.especialidad);
            return res.status(200).json({
                ok: true,
                status:400,
                msg: 'Se obtuvo el nombre de la especialidad.',
                count: especialidads.length,
                especialidads
            });
        });
});

//put
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','carrera']); 
    Especialidad.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al actualizar el nombre de la especialidad.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se actualizo el nombre de la especialidad.',
            usrDB
        });

    });
});

//delete
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Especialidad.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al eliminar el nombre de la especialidad.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se elimino la especialidad.',
            resp
        });
    });
});

module.exports = app;