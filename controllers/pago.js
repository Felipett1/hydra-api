const comunes = require("../config/comunes")
const modelo = require("../models/pago")

exports.consultar = (req, res) => {
    const {inicio, fin} = req.body
    modelo
        .consultar(inicio, fin)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
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
