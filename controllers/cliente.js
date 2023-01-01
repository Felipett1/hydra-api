const comunes = require("../config/comunes")
const modelo = require("../models/cliente")

exports.crear = (req, res) => {
    const {documento, nombre_completo, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones} = req.body
    modelo
        .crear(documento, nombre_completo, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones)
        .then(() => {
            return res.send(comunes.respuestaCreacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}