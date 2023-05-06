const comunes = require("../config/comunes")
const modelo = require("../models/usuario")

exports.autenticar = async (req, res) => {
    const { usuario, clave } = req.body
    try {
        autenticar = await modelo.autenticar(usuario, clave)
        let respuesta = comunes.respuestaGenerica()
        if (autenticar) {
            resultado = await modelo.consulta(usuario)
            respuesta.usuario = resultado
            respuesta.token = 'kjh389hd29oh983b34ihroiwdu23h'
        }
        respuesta.autenticar = autenticar

        return res.send(respuesta)
    } catch (err) {
        return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
    }
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