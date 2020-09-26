const {Router} = require('express')
const route = Router()
const galeriaCtrl = require('../controllers/galeria.controllers')
const upload = require('../libs/upload')
const Auth = require('../helpers/Auth')

route.post('/agregarImagen', Auth.verificarToken,  upload.single('imagen'), galeriaCtrl.agregarImagen)
route.get('/obtenerImagen/:id', Auth.verificarToken, galeriaCtrl.obtenerImagen)
route.get('/galeriaUsuario/:id', Auth.verificarToken, galeriaCtrl.obtenerGaleriaUsuario)
route.get('/galeriaAriticulo/:id', Auth.verificarToken, galeriaCtrl.obtenerGaleriaArticulo)
route.get('/buscarImagen/:titulo', Auth.verificarToken, galeriaCtrl.buscarImagen)
route.delete('/eliminarImagen/:id', Auth.verificarToken, galeriaCtrl.eliminarImagen)



module.exports = route