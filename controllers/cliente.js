const comunes = require("../config/comunes")
const modelo = require("../models/cliente")

exports.crear = (req, res) => {
    const {documento, nombre_completo} = req.body
    modelo
        .crear(documento, nombre_completo)
        .then(() => {
            return res.send(comunes.respuestaCreacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.consultarPorDocumento = (req, res) => {
    modelo
        .consultarPorDocumento(req.params.documento)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })



}
