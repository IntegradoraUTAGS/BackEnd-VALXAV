/* jshint esversion: 8 */
const express = require("express");
const _ = require("underscore");
const Academia = require("../../models/academia");
const app = express();

app.get("/obtener", (req, res) => {
  Academia.find({ estado: true }).exec((err, academia) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        status: 400,
        msg: "No se mostro la academia",
        cont: err
      });
    }

    return res.status(200).json({
      ok: true,
      status: 200,
      msg: "Se obtuvieron las academias correctamente",
      count: academia.length,
      academia
    });
  });
});

app.post("/registrar", (req, res) => {
  let body = req.body;

  let academia = new Academia({
    nombre: body.nombre
  });

  academia.save((err, usrDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        status: 400,
        msg: "No se registro la academia",
        cont: err
      });
    }

    return res.status(200).json({
      ok: true,
      status: 200,
      msg: "Se registro las academias correctamente",
      cont: usrDB
    });
  });
});

app.put("/actualizar/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre"]);

  Academia.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, usrDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          status: 400,
          msg: "No se actualizo la academia",
          cont: err
        });
      }
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: "Se actualizo correctamente la academia",
        cont: usrDB
      });
    }
  );
});

app.delete("/eliminar/:id", (req, res) => {
  let id = req.params.id;

  Academia.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true, runValidators: true, context: "query" },
    (err, usrDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          status: 400,
          msg: "No se elimino la academia",
          cont: err
        });
      }
      return res.status(200).json({
        ok: true,
        status: 200,
        msg: "Se elimino correctamente",
        cont: usrDB
      });
    }
  );
});

module.exports = app;
