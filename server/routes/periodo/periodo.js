 /* jshint esversion: 8 */ 
const express = require('express');
const _ = require('underscore');
const Periodo = require('../../models/periodo'); //subir nivel
const app = express();

app.post('/registrar', (req, res) => {
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
                status:400,
                msg: 'Error al registrar el periodo.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se registro el periodo correctamente.',
            usrDB
        });
    });
});

//get
app.get('/obtener', (req, res) => {
    Periodo.find({ estado: true, }) 
        .exec((err, periodos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener los periodos.',
                    err
                });
            }
            console.log(req.periodo);
            return res.status(200).json({
                ok: true,
                status:200,
                msg: 'Se obtuvieron los periodos correctamente.',
                count: periodos.length,
                periodos
            });
        });
});

//get id
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Periodo.find({ estado: true, _id: id }) 
        .exec((err, periodos) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener el periodo.',
                    err
                });
            }
            console.log(req.periodo);
            return res.status(200).json({
                ok: true,
                status:200,
                msg: 'Se obtuvo el periodo correctamente.',
                count: periodos.length,
                periodos
            });
        });
});

//put
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'fechaInicio', 'fechaFin']); 
    Periodo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al actualizar el periodo.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se actualizo el periodo correctamente.',
            usrDB
        });

    });
});

//delete
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Periodo.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al eliminar el periodo.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se elimino el periodo correctamente.',
            resp
        });
    });
});

module.exports = app;