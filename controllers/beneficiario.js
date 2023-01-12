const comunes = require("../config/comunes")
const modelo = require("../models/beneficiario")

exports.consultar = (req, res) => {
    const {contrato} = req.body
    modelo
        .consultar(contrato)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Julian Calderon   10/1/2023
exports.crear = (req, res) => {
    const {contrato, nombre, edad, parentesco, adicional, telefono, marquilla} = req.body
    modelo
        .crear(contrato, nombre, edad, parentesco, adicional, telefono, marquilla)
        .then(() => {
            return res.send(comunes.respuestaCreacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Julian Calderon   10/1/2023
exports.modificar = (req, res) => {
    const {secuencia, nombre, edad, parentesco, adicional, telefono, marquilla} = req.body
    modelo
        .modificar(secuencia, nombre, edad, parentesco, adicional, telefono, marquilla)
        .then(() => {
            return res.send(comunes.respuestaModificacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Julian Calderon   10/1/2023
exports.modificarMarquilla = (req, res) => {
    const {secuencia, marquilla} = req.body
    modelo
        .modificarMarquilla(secuencia, marquilla)
        .then(() => {
            return res.send(comunes.respuestaModificacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Julian Calderon   10/1/2023
exports.eliminar = (req, res) => {
    const {secuencia} = req.body
    modelo
        .eliminar(secuencia)
        .then(() => {
            return res.send(comunes.respuestaEliminar())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}