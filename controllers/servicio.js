const comunes = require("../config/comunes")
const modelo = require("../models/servicio")

exports.consultarContrato = (req, res) => {
    const { id } = req.body
    modelo
        .consultarContrato(id)
        .then((resultado) => {console.log(resultado)
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.consultarDocumento = (req, res) => {
    const { documento } = req.body
    modelo
        .consultarDocumento(documento)
        .then((resultado) => {console.log(resultado)
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports. crear = (req, res) => {
    const {contrato, tipo_servicio, fecha_inicial, detalle_inicial} = req.body
    modelo
        .crear(contrato, tipo_servicio, fecha_inicial, detalle_inicial)
        .then(() => {
            return res.send(comunes.respuestaCreacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.consultarServicio = (req, res) => {
    const {inicio, fin} = req.body
    modelo
        .consultarServicio(inicio, fin)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

