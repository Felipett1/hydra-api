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