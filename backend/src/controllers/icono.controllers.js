const IconoCtrl = {}
const Icono = require('../models/icono.models')

IconoCtrl.agregarIcono = async (req, res) => {
    const {nombre, pertenece, usuario, icono} = req.body

    const nuevoIcono = new Icono({
        nombre,
        pertenece,
        usuario,
        icono
    })
    const respuesta = await nuevoIcono.save()
    res.json(respuesta)
}

IconoCtrl.obtenerIconosUsuario = async (req, res) =>{
    const id = req.params.id
    const respuesta = await Icono.find({usuario: id})
    res.json(respuesta)
}

IconoCtrl.obtenerIconosPertenece = async (req, res) => {
    const pertenece = req.params.id
    const respuesta = await Icono.find({pertenece: pertenece})
    res.json(respuesta)
}

IconoCtrl.actualizarIcono = async (req, res) => {
    const id = req.params.id
    const respuesta = await Icono.findByIdAndUpdate({_id: id}, req.body)
    res.json(respuesta)
}

IconoCtrl.eliminarIcono = async (req, res) => {
    const id = req.params.id
    const respuesta = await Icono.findByIdAndDelete({_id: id})
    res.json(respuesta)
}
module.exports = IconoCtrl