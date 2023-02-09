const comunes = require("../config/comunes")
const modelo = require("../models/usuario")

exports.autenticar = (req, res) => {
    const { usuario, clave } = req.body
    modelo
        .autenticar(usuario, clave)
        .then((autenticar) => {
            let respuesta = comunes.respuestaGenerica()
            respuesta.autenticar = autenticar
            return res.send(respuesta)
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.modificarClave = (req, res) => {
    const { clave, id } = req.body
    modelo
        .modificarClave(clave, id)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}