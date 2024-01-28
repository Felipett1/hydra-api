const comunes = require("../config/comunes")
const modelo = require("../models/beneficiario")

//Julian Calderon   2023/02/26 Modificacion de contrato por subcontrato
exports.consultar = (req, res) => {
    const {subcontrato} = req.body
    modelo
        .consultar(subcontrato)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Julian Calderon   2023/01/10 Creacion de funcion
//Julian Calderon   2023/02/26 Modificacion de contrato por subcontrato y actualizacion de tabla
exports.crear = (req, res) => {
    const {subcontrato, nombre, edad, parentesco, adicional, contacto, emoji, estado} = req.body
    modelo
        .crear(subcontrato, nombre, edad, parentesco, adicional, contacto, emoji, estado)
        .then(() => {
            return res.send(comunes.respuestaCreacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Julian Calderon   2023/01/10 Creacion de funcion
//Julian Calderon   2023/02/26 Actualizacion de tabla
exports.modificar = (req, res) => {
    const {secuencia, nombre, edad, parentesco, adicional, contacto, emoji, estado} = req.body
    modelo
        .modificar(secuencia, nombre, edad, parentesco, adicional, contacto, emoji, estado)
        .then(() => {
            return res.send(comunes.respuestaModificacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Julian Calderon   2023/01/10 Creacion de funcion
//Julian Calderon   2023/02/26 Actualizacion de tabla
exports.modificarEmoji = (req, res) => {
    const {secuencia, emoji} = req.body
    modelo
        .modificarEmoji(secuencia, emoji)
        .then(() => {
            return res.send(comunes.respuestaModificacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Julian Calderon   2023/01/10 Creacion de funcion
exports.cambiarEstado = (req, res) => {
    const {secuencia, estado} = req.body
    modelo
        .cambiarEstado(secuencia, estado)
        .then(() => {
            return res.send(comunes.respuestaGenerica())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.consultarPorSecuencia = (req, res) => {
    modelo
        .consultarPorSecuencia(req.params.secuencia)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}