const comunes = require("../config/comunes")
const modelo = require("../models/novedad_servicio")

exports.consultar = (req, res) => {
    const { servicio } = req.body
    modelo
        .consultar(servicio)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.crear = (req, res) => {
    const { servicio, novedad, detalle } = req.body
    modelo
        .crear(servicio, novedad, detalle)
        .then(resultado => {
            if (resultado && resultado > 0) {
                return res.send(comunes.respuestaCreacion())
            } else {
                return res.send(comunes.respuestaExcepcion('No fue posible crear la novedad'))
            }
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.modificar = (req, res) => {
    const { servicio, detalle } = req.body
    modelo
        .modificar(servicio, detalle)
        .then(resultado => {
            if (resultado && resultado > 0) {
                return res.send(comunes.respuestaModificacion())
            } else {
                return res.send(comunes.respuestaExcepcion('No fue posible modificar la novedad'))
            }
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.eliminar = (req, res) => {
    const { servicio } = req.body
    modelo
        .eliminar(servicio)
        .then(resultado => {
            if (resultado && resultado > 0) {
                return res.send(comunes.respuestaEliminar())
            } else {
                return res.send(comunes.respuestaExcepcion('No fue posible eliminar la novedad'))
            }
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
