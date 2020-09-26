const mongoose = require('mongoose')
const {Schema} = mongoose

const ArticuloSchema = new Schema({
    titulo: String,
    descripcion: String,
    usuario: String,
    imageUrl: String,
    ubicacion: String
})

ArticuloSchema.methods.setImgUrl = function setImgUrl(filename){
    const url = 'http://localhost:4000/'
    this.imageUrl = url+'public/'+filename
}

module.exports = mongoose.model('Articulo', ArticuloSchema)