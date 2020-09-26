const Auth = {}
const jwt = require('jsonwebtoken')


Auth.verificarToken = (req, res, next) => {
    if(!req.headers.autorizacion){
        return res.json({mensaje: 'No estas Autorizado'})
    }
    const token = req.headers.autorizacion
    if(token === 'null'){
        return res.json({mensaje: 'No estas Autorizado'})
    }
    next()
}

module.exports = Auth