/* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Academia = require('./academia');
//declarar esquema
let Schema = mongoose.Schema;

let coordinadorSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:[true,"Favor de seleccionar el usuario para el coordinador"]

    },
    academia: {
        type: Schema.Types.ObjectId,
        ref:'Academia',
        required:[true,"Favor seleccione la cademia para el coordinador"]
    },
    estado:{
        type:Boolean,
        default:true
    }
});

//el esquema utilize el plugin
coordinadorSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Coordinador', coordinadorSchema);