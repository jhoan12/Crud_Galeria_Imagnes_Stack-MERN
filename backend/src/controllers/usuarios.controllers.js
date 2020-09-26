const usuarioCtrl = {}
const Usuario = require('../models/usuario.models')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


usuarioCtrl.crearUsuario = async (req, res) => {
    const {nombre, correo, contrasena} = req.body
    const nuevoUsuario = new Usuario({
        nombre,
        correo,
        contrasena
    })
    const correoUsuario = await Usuario.findOne({correo: correo})
    if(correoUsuario){
        res.json({mensaje: 'El Correo ya Existe'})
        
    }else{
        nuevoUsuario.contrasena = await bcrypt.hash(contrasena, 10)
        const token = jwt.sign({_id: nuevoUsuario._id}, 'admin')
        await nuevoUsuario.save()
        res.json({
            mensaje: 'Bienvenido',
            id: nuevoUsuario._id,
            nombre: nuevoUsuario.nombre,
            token
        })
    }
}

usuarioCtrl.login = async (req, res) =>{
    const {correo, contrasena} = req.body
    const usuario = await Usuario.findOne({correo: correo})
    if(!usuario){
        return res.json({mensaje: 'Correo Incorrecto'})
    }
    const comparar = await bcrypt.compare(contrasena, usuario.contrasena)
    if(comparar){
        const token = jwt.sign({_id: usuario._id}, 'admin')
        res.json({
            mensaje: 'Bienvenido',
            id: usuario._id,
            nombre: usuario.nombre,
            token
        })
    }else{
        res.json({mensaje: 'Contraseña Incorrecta'})
    }
}


usuarioCtrl.eliminar = async (req, res) => {
    const id = req.params.id
    const token = jwt.sign({_id: id}, 'admin')
    const respuesta = await Usuario.findByIdAndDelete({_id: id})
    res.json({
        mensaje: 'Adios :( ',
        respuesta,
        token
    })
    
}

module.exports = usuarioCtrl