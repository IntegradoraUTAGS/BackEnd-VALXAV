/* jshint esversion: 8 */
//agrupa todos los archivos-rutas
const express = require('express');
const app = express();

app.use('/usuario',require('./usuario/usuario'));
app.use('/login',require('./login/login'));
app.use('/academia',require('./academia/academia'));
app.use('/periodo',require('./periodo/periodo'));
app.use('/carrera',require('./carrera/carrera'));
app.use('/especialidad',require('./especialidad/especialidad'));
app.use('/grupo',require('./grupo/grupo'));
app.use('/materia',require('./materia/materia'));
app.use('/coordinador',require('./coordinador/coordinador'))
module.exports = app;