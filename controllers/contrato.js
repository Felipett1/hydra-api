const comunes = require("../config/comunes")
const modelo = require("../models/contrato")
const verificar = require("../utils/validacion")
const modeloPago = require("../models/pago")

exports.consultar = (req, res) => {
    modelo
        .consultar()
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.consultarPorCliente = (req, res) => {
    const { cliente } = req.body
    modelo
        .consultarPorCliente(cliente)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.consultarPorId = (req, res) => {
    const { id } = req.body
    modelo
        .consultarPorId(id)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.crear = (req, res) => {
    const { id, cliente, fecha_inicio, estado, plan, valor, soporte, periodo } = req.body
    modelo
        .crear(id, cliente, fecha_inicio, estado, plan, valor, soporte, periodo)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.modificarValorId = (req, res) => {
    const { id, valor } = req.body
    modelo
        .modificarValorId(id, valor)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.modificarValorCliente = (req, res) => {
    const { cliente, valor } = req.body
    modelo
        .modificarValorCliente(cliente, valor)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.modificarEstadoId = (req, res) => {
    const { id, estado } = req.body
    modelo
        .modificarEstadoId(id, estado)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.modificarEstadoCliente = (req, res) => {
    const { cliente, estado } = req.body
    modelo
        .modificarEstadoCliente(cliente, estado)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.eliminar = (req, res) => {
    const { id } = req.body
    modelo
        .eliminar(id)
        .then(() => {
            return res.send(comunes.respuestaEliminar())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
},
exports.consultarEstadoCliente = (req, res) => {
    const { cliente } = req.body
    modelo
        .consultarPorClienteActivo(cliente)
        .then(contrato => {
            if (!contrato) {    //Si no hay resultado en a consulta del contrato
                console.log("no arrojo ningun resulado la consulta")
                return res.send(comunes.respuestaExcepcion(`No arrojo resultados`))
            } else {            //Entra si el cliente exiten en la base de datos
                let mensualidad = verificar.valorMensual(contrato)
                contrato.mensualidad = mensualidad
                modeloPago.consultarContratoGlobal(contrato.id).then(resultado => {
                    if (resultado.periodos == 0) {      //Verifica si se han relizado pagos
                        contrato.mora = true
                        console.log("No hay pagos registrados")
                        console.log(contrato)
                        return res.send(comunes.respuestaConsulta([contrato]))
                    }else {         //Si hay pagos entra hacer los calculos
                        let estadoMora = verificar.estadoMora(contrato, resultado)
                        contrato.mora = estadoMora
                        console.log("se verifica los pagos realizados")
                        console.log(contrato)
                        return res.send(comunes.respuestaConsulta([contrato]))
                    }
                })
            }
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}