const comunes = require("../config/comunes")
const notificacion = require("../utils/notificacion")


exports.ntfPreRegistro = (req, res) => {
    const { nombre, correo, celular } = req.body
    notificacion
        .enviarCorreo(correo, 1, req.body)
        .then(() => {
            return res.send(comunes.respuestaGenerica())
        })
        .catch(err => {
            console.log(err)
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
