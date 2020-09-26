const galeriaCtrl = {}
const Galeria = require('../models/galeria.models')
const fs = require('fs')

galeriaCtrl.agregarImagen = async (req, res) =>{
    const {titulo, descripcion, usuario, pertenece} = req.body
    const imagen = new Galeria({
        pertenece,
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
        mensaje: 'Imagen Guardada',
        respuesta
    })
}

galeriaCtrl.obtenerGaleriaUsuario = async (req, res) => {
    const id = req.params.id
    const respuesta = await Galeria.find({usuario: id})
    res.json(respuesta)
}
galeriaCtrl.obtenerGaleriaArticulo = async (req, res) => {
    const pertenece = req.params.id
    const respuesta = await Galeria.find({pertenece: pertenece})
    res.json(respuesta)
}

galeriaCtrl.obtenerImagen = async (req, res) => {
    const id = req.params.id
    const respuesta = await Galeria.findById({_id: id})
    res.json(respuesta)
}

galeriaCtrl.buscarImagen = async (req, res) => {
    const titulo = req.params.titulo
    const respuesta = await Galeria.find({titulo:{$regex: ".*"+titulo+".*"}})
    res.json(respuesta)
}

galeriaCtrl.eliminarImagen = async (req, res) => {
    const id = req.params.id
    const imagen = await Galeria.findByIdAndRemove({ _id: id })

    fs.unlink(imagen.ubicacion, (err) => {
        if (err) throw err;
        res.json({
            mensaje: 'Articulo Eliminado',
            imagen
        })
    });
}

module.exports = galeriaCtrl