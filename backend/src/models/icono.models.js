const mongoose = require('mongoose')
const {Schema} = mongoose

const IconoSchema = new Schema({
    nombre: String,
    pertenece: String,
    usuario: String,
    icono: String
})

module.exports = mongoose.model('Icono', IconoSchema)