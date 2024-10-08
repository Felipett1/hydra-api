const comunes = require("../config/comunes")
const notificacion = require("../utils/notificacion")


exports.ntfPreRegistro = (req, res) => {
    notificacion
        .enviarCorreo(comunes.PARA_PR, 1, req.body)
        .then(() => {
            return res.send(comunes.respuestaGenerica())
        })
        .catch(err => {
            console.log(err)
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.ntfRecuperacion = (req, res) => {
    notificacion
        .enviarCorreo(comunes.PARA_RP, 6, req.body)
        .then(() => {
            return res.send(comunes.respuestaGenerica())
        })
        .catch(err => {
            console.log(err)
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.ntfServicio = (req, res) => {
    notificacion
        .enviarCorreo(req.body.para, 2, req.body)
        .then(() => {
            return res.send(comunes.respuestaGenerica())
        })
        .catch(err => {
            console.log(err)
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.ntfSolicitud = (req, res) => {
    notificacion
        .enviarCorreo(comunes.PARA_SS, 4, req.body)
        .then(() => {
            return res.send(comunes.respuestaGenerica())
        })
        .catch(err => {
            console.log(err)
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

