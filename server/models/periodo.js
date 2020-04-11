/* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;

let periodoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del periodo']
    },
    fechaInicio: {
        type: String,
        required: [true, 'Por favor ingresa la fecha de inicio']
    },
    fechaFin: {
        type: String,
        required: [true, 'Por favor ingresa la fecha de fin']
    },

    estado: {
        type: Boolean,
        default: true
    }
});
//el esquema utilize el plugin
periodoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Periodo', periodoSchema);