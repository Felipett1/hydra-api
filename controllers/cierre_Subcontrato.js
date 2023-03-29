const comunes = require("../config/comunes")
const modeloCierre = require("../models/cierre_subcontrato")
const modeloSubcontrato = require("../models/subcontrato")

//Julian Calderon 2023/02/26 Se modifica la funcion cierre_Contrato por cierre_subcontrato
exports.modificarEstado = (req, res) => {
    const {subcontrato, fecha_fin, causal} = req.body
    modeloCierre
        .modificarEstado(subcontrato, fecha_fin, causal)
        .then((resultado) => {
            if (resultado > 0) {
                modeloSubcontrato.modificarEstadoId(subcontrato, false)
            }
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}