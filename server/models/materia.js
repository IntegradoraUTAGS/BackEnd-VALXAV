/* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Academia = require('./academia')

let Schema = mongoose.Schema;
let materiaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese el nombre de la materia por favor']
    },
    numeroUnidades:{
        type: Number,
        required:[true, 'Ingrese el numero de unidades']
    },
    academia:{
        type:Schema.Types.ObjectId,
        ref:'Academia',
       
    },
    estado:{
        type:Boolean,
        default:true
    }
});

materiaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe que ser único'
});

module.exports = mongoose.model('Materia', materiaSchema);