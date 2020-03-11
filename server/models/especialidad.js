/* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Carrera = require('../models/carrera');

//declarar esquema
let Schema = mongoose.Schema;

let especialidadSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre de la especialidad']
    },
    carrera:{
        type: Schema.Types.ObjectId,
        ref:'Carrera',
    },
    estado: {
        type: Boolean,
        default: true
    }

});
//el esquema utilize el plugin
especialidadSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Especialidad', especialidadSchema);