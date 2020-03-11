 /* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let academiaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Ingrese el nombre de la academia por favor']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

academiaSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe que ser único'
});

module.exports = mongoose.model('Academia', academiaSchema);