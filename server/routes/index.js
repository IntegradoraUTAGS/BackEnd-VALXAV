//agrupa todos los archivos-rutas
const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./academia'));
app.use(require('./periodo'));
app.use(require('./carrera'));
app.use(require('./especialidad'));
app.use(require('./grupo'));
module.exports = app;