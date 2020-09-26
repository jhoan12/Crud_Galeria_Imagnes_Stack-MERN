const multer = require('multer')
const path = require('path')
const {v4: uuidv4} = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../storage/galeria'),
    filename:function(req, file, cb){
        cb(null, uuidv4()+path.extname(file.originalname).toLocaleLowerCase())
    }
})

const upload = multer({
    storage,
    fileFilter:(req, file, cb) =>{
        const filetypes = /jpeg|jpg|png|JPG|PNG/  //comentario: aca irian los tipos de archivos que aceptaremos, en este caso, trabajamos con imagenes
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            return cb(null, true)
        }
        cb('error: EL Archivo no es valido deve ser jpeg|jpg|png|JPG')
    }
})

module.exports = upload