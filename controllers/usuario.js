const comunes = require("../config/comunes")
const modelo = require("../models/usuario")

exports.autenticar = (req, res) => {
    const { usuario, clave } = req.body
    modelo
        .autenticar(usuario, clave)
        .then((resultado) => {
            if (resultado) {
                resultado = comunes.DTL_AUTENTICACION_EXITOSO
            } else {
                resultado = comunes.DTL_AUTENTICACION_FALLIDO
            }
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}