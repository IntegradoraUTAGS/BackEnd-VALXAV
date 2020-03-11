/* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;

let carreraSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre de la carrera']
    },
    estado: {
        type: Boolean,
        default: true
    }
});
//el esquema utilize el plugin
carreraSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Carrera', carreraSchema);