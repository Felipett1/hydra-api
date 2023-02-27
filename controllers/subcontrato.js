const comunes = require("../config/comunes")
const modelo = require("../models/subcontrato")


exports.consultar = (req, res) => {
    modelo
        .consultar()
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},

exports.consultarPorId = (req, res) => {
    const { id } = req.body
    modelo
        .consultarPorId(id)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},

exports.crear = (req, res) => {
    const { id, cliente, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado } = req.body
    modelo
        .crear(id, cliente, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
// Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
exports.consultarPorCliente = (req, res) => {
    const { cliente } = req.body
    modelo
        .consultarPorCliente(cliente)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
// Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
exports.modificar = (req, res) => {
    const { cliente, estado, plan, valor, soporte, cuotas, correo, direccion, celular, telefono, observaciones, valor_total, adicional, mascota, anticipado} = req.body
    modelo
        .crear(cliente, estado, plan, valor, soporte, cuotas, correo, direccion, celular, telefono, observaciones, valor_total, adicional, mascota, anticipado)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
// Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
exports.modificarEstadoCliente = (req, res) => {
    const { cliente, estado } = req.body
    modelo
        .modificarEstadoCliente(cliente, estado)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}