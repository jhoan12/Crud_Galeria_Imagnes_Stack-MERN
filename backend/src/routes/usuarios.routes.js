const {Router} = require('express')
const route = Router()
const usuariosCtrl = require('../controllers/usuarios.controllers')

route.post('/crearCuenta', usuariosCtrl.crearUsuario)
route.post('/login', usuariosCtrl.login)
route.delete('/eliminarCuenta/:id', usuariosCtrl.eliminar)

module.exports = route