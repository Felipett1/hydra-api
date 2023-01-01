const comunes = require("../config/comunes")
const modelo = require("../models/pago")

<<<<<<< HEAD
exports.consultar = (req, res) => {
    const {inicio, fin} = req.body
    modelo
        .consultar(inicio, fin)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
=======
exports.cargar = (req, res) => {
    const { contrato, fecha, periodo, valor } = req.body
    modelo
        .cargar(contrato, fecha, periodo, valor)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
>>>>>>> fd0a4b21a85f3070db36a573b07cb91509cf3f0b
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
<<<<<<< HEAD
},

exports.consultarCliente = (req, res) => {
    const {cliente, inicio, fin} = req.body
    modelo
        .consultarCliente(cliente, inicio, fin)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
        //console.log(params);
}

exports.consultarContrato = (req, res) => {
    const {contrato, inicio, fin} = req.body
    //console.log("El dato ingresado es: " + id)
    modelo
        .consultarContrato(contrato, inicio, fin)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
            //console.log("El dato ingresado es: " + req.params.id)
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
=======
}
>>>>>>> fd0a4b21a85f3070db36a573b07cb91509cf3f0b
