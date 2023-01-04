const comunes = require("../config/comunes")
const modeloCierre = require("../models/cierre_Contrato")
const modeloContrato = require("../models/contrato")


exports.modificarEstado = (req, res) => {
    const {contrato, fecha_fin, causal} = req.body
    console.log(req.body)
    modeloCierre
        .modificarEstado(contrato, fecha_fin, causal)
        .then((resultado) => {
            if (resultado > 0) {
                modeloContrato.modificarEstadoId(contrato, false)
            }
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}