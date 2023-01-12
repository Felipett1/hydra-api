const comunes = require("../config/comunes")
const modelo = require("../models/usuario")

exports.autenticar = (req, res) => {
    const { usuario, clave } = req.body
    modelo
        .autenticar(usuario, clave)
        .then((resultado) => {
            if (resultado) {
                resultado = comunes.MSG_EXITOSO
            } else {
                resultado = comunes.DTL_SIN_RESULTADOS
            }
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.modificarClave = (req, res) => {
    const {clave,id} = req.body
    modelo
        .modificarClave(clave,id)
        .then(() => {
            return res.send(comunes.respuestaModificacion())       
            })   
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}