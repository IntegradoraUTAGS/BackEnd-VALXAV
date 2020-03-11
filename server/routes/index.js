/* jshint esversion: 8 */
//agrupa todos los archivos-rutas
const express = require('express');
const app = express();

app.use(require('./usuario/usuario'));
app.use(require('./login/login'));
app.use(require('./academia/academia'));
app.use(require('./periodo/periodo'));
app.use(require('./carrera/carrera'));
app.use(require('./especialidad/especialidad'));
app.use(require('./grupo/grupo'));
app.use(require('./materia/materia'));
module.exports = app;