const comunes = require("../config/comunes")
const modelo = require("../models/pago_anticipado")
const mPago = require("../models/pago")

exports.cargar = (req, res) => {
    const { pendiente, porcentaje, pagado, descuento } = req.body
    modelo
        .cargar(pendiente, porcentaje, pagado, descuento)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })

}
exports.actualizar = (req, res) => {
    const { estado,id } = req.body
    modelo
        .actualizarSubContrato(estado,id)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })

}