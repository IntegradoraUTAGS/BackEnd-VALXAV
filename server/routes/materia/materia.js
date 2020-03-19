/* jshint esversion: 8 */
const express = require('express');
const _ = require('underscore');
const Materia = require('../../models/materia');
const app = express();

app.get('/obtener', (req, res) => {
    Materia.find().populate('academia')
        .exec((err, materia) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg:"No se mostro la materia",
                    cont:err
                });
            }

            return res.status(200).json({
                ok: true,
                status:200,
                msg:"Se obtuvieron las materias correctamente",
                count: materia.length,
                cont:materia
            });
        });
});

app.post('/registrar', (req, res) => {
    let body = req.body;

    let materia = new Materia({
        nombre: body.nombre,
        numeroUnidades: body.numeroUnidades,
        academia: body.academia
    });

    materia.save((err, mtrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg:"No se registro la materia",
                cont:err
            });
        }

        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se registro la materia correctamente",
            cont:mtrDB
        });
    });
});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre','numeroUnidades','academia']);

    Materia.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, mtrDB) => {
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
            msg:"Se actualizo correctamente",
            cont:mtrDB
        });
    });
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;

    Materia.findByIdAndUpdate(id, {estado:false}, { new: true, runValidators: true, context: 'query' }, (err, mtrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg:"No se elimino",
                cont:err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se elimino correctamente",
            cont:mtrDB
        });
    });

});

module.exports = app;