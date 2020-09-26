const {Router} = require('express')
const route = Router()
const ArticuloCtrl = require('../controllers/articulo.controllers')
const upload = require('../libs/upload')
const Auth = require('../helpers/Auth')

route.post('/agregarArticulo', Auth.verificarToken, upload.single('imagen'), ArticuloCtrl.agregarArticulo)
route.get('/obtenerArticuolo/:id', Auth.verificarToken, ArticuloCtrl.obtenerArticulo)
route.get('/articulosUsuario/:id', Auth.verificarToken, ArticuloCtrl.obtenerArticulosUsuario)
route.put('/actualizarArticulo/:id', Auth.verificarToken, ArticuloCtrl.actualizarArticulo)
route.get('/buscarArticulo/:titulo', Auth.verificarToken, ArticuloCtrl.buscarArticulo)
route.delete('/eliminarArticulo/:id', Auth.verificarToken, ArticuloCtrl.eliminarArticulo)



module.exports = route