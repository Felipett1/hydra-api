const comunes = require("../config/comunes")
const modelo = require("../models/pago")

exports.cargar = (req, res) => {
    const { contrato, fecha, periodo, valor } = req.body
    modelo
        .cargar(contrato, fecha, periodo, valor)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}