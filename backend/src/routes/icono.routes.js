const {Router} = require('express')
const route = Router()
const IconoCtrl = require('../controllers/icono.controllers')
const Auth = require('../helpers/Auth')

route.post('/agregarIcono', Auth.verificarToken, IconoCtrl.agregarIcono)
route.get('/obtenerIconosUsuario/:id', Auth.verificarToken, IconoCtrl.obtenerIconosUsuario)
route.get('/obtenerIconosPertenece/:id', Auth.verificarToken, IconoCtrl.obtenerIconosPertenece)
route.put('/actualizarIcono/:id', Auth.verificarToken, IconoCtrl.actualizarIcono)
route.delete('/eliminarIcono/:id', Auth.verificarToken, IconoCtrl.eliminarIcono)

module.exports = route