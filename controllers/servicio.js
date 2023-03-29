const comunes = require("../config/comunes")
const modelo = require("../models/servicio")

exports.consultarSubContrato = (req, res) => {
    const { id } = req.body
    modelo
        .consultarSubContrato(id)
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
    const {subcontrato, tipo_servicio, fecha_inicial, detalle_inicial, contacto} = req.body
    modelo
        .crear(subcontrato, tipo_servicio, fecha_inicial, detalle_inicial, contacto)
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
exports.cerrarServicio = (req, res) => {
    const { fecha_final, detalle_final , secuencia} = req.body
   
    modelo
        .cerrarServicio( fecha_final, detalle_final, secuencia)
        .then((resultado) => {
          
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
