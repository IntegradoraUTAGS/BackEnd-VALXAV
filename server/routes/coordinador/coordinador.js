/* jshint esversion: 8 */
const express = require('express');
const _ = require('underscore');
const Coordinador = require('../../models/coordinador'); //subir nivel
const app = express();

app.post('/registrar', (req, res) => {
    let body = req.body;
    let coordinador = new Coordinador({
   
        usuario: body.usuario,
        academia:body.academia,
        

    });

    coordinador.save((err, cooDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al registrar el coordinador.',
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se registro el coordinador correctamente.',
            cont:cooDB
        });
    });
});


//get
app.get('/obtener', (req, res) => {
    Coordinador.find({ estado: true }).populate('usuario').populate('academia')
        .exec((err, cooDB) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener los coordinadores.',
                    cont:err
                });
            }
          
            return res.status(200).json({
                ok: true,
                status:200,
                msg: 'Se obtuvieron los coordinadores correctamente.',
                count: cooDB.length,
                cont:cooDB
            });
        });
});


//put
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['usuario','academia']); 
    Coordinador.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, cooDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al actualizar el coordinador.',
                cont:err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se al actualizo el coordinador correctamente.',
            cont:cooDB
        });

    });
});

//delete
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Coordinador.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, cooDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg: 'Error al eliminar el coordinador.',
                cont:err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg: 'Se eliminar el coordinador correctamente.',
            cont:cooDB
        });
    });
});

module.exports = app;