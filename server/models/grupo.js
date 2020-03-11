/* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Especialidad = require('../models/especialidad');
const Carrera = require('../models/carrera');
const Periodo = require('../models/periodo');
//declarar esquema
let Schema = mongoose.Schema;

let grupoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del grupo']
    },
    carrera:{
        type: Schema.Types.ObjectId,
        ref:'Carrera',
    },
    especialidad:{
        type: Schema.Types.ObjectId,
        ref:'Especialidad',
    },
    periodo:{
        type: Schema.Types.ObjectId,
        ref:'Periodo',
    },
    estado: {
        type: Boolean,
        default: true
    }

});


//el esquema utilize el plugin
grupoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Grupo', grupoSchema);