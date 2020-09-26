const ArticuloCtrl = {}
const Articulo = require('../models/articulo.models')
const fs = require('fs')

ArticuloCtrl.agregarArticulo = async (req, res) =>{
    const {titulo, descripcion, usuario} = req.body
    const imagen = new Articulo({
        titulo,
        descripcion,
        usuario,
        ubicacion: req.file.path
    })
    
    if(req.file){
        const {filename} = req.file
        imagen.setImgUrl(filename)
    }
    const respuesta = await imagen.save() 
    res.json({
        mensaje: 'Articulo Guardado',
        respuesta
    })
}

ArticuloCtrl.obtenerArticulosUsuario = async (req, res) => {
    const id = req.params.id
    const respuesta = await Articulo.find({usuario: id})
    res.json(respuesta)
}

ArticuloCtrl.obtenerArticulo = async (req, res) => {
    const id = req.params.id
    const respuesta = await Articulo.findById({_id: id})
    res.json(respuesta)
}

ArticuloCtrl.buscarArticulo = async (req, res) => {
    const titulo = req.params.titulo
    const respuesta = await Articulo.find({titulo:{$regex: ".*"+titulo+".*"}})
    res.json(respuesta)
}

ArticuloCtrl.actualizarArticulo = async (req, res) => {
    const id = req.params.id
    const respuesta = await Articulo.findByIdAndUpdate({_id: id}, req.body)
    res.json(respuesta)
}

ArticuloCtrl.eliminarArticulo = async (req, res) => {
    const id = req.params.id
    const articulo = await Articulo.findByIdAndRemove({ _id: id })

    fs.unlink(articulo.ubicacion, (err) => {
        if (err) throw err;
        res.json({
            mensaje: 'Articulo Eliminado',
            articulo
        })
    });
}

module.exports = ArticuloCtrl