const comunes = require("../config/comunes")
const modelo = require("../models/subcontrato")
const verificar = require("../utils/validacion")
const modeloPago = require("../models/pago")
const modeloCliente = require("../models/cliente")
const modeloBeneficiario = require("../models/beneficiario")

exports.consultar = (req, res) => {
    modelo
        .consultar()
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
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

    exports.crear = async (req, res) => {
        const { cliente, subcontrato, beneficiarios } = req.body
        try {
            var respuesta = await modeloCliente.consultarPorDocumento(cliente.documento);
            if (!respuesta || respuesta.length == 0) {
                respuesta = await modeloCliente.crear(cliente);
            }
            if (respuesta && (respuesta.length > 0 || respuesta > 0)) {
                respuesta = await modelo.crear(cliente, subcontrato);
                if (respuesta > 0) {
                    if (beneficiarios && beneficiarios.length > 0) {
                        beneficiarios.forEach(async beneficiario => {
                            respuesta = await modeloBeneficiario.crear(subcontrato, beneficiario)
                        });
                    }
                    if (respuesta > 0) {
                        return res.send(comunes.respuestaCreacion())
                    }
                } else {
                    return res.send(comunes.respuestaExcepcion(comunes.DTL_ERROR_CREACION_SUBCONTRATO))
                }
            } else {
                return res.send(comunes.respuestaExcepcion(comunes.DTL_ERROR_CREACION_SUBCONTRATO))
            }
        } catch (error) {
            console.log(error)
            return res.send(comunes.respuestaExcepcion(error.detail))
        }
    }
// Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
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
    // Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
    exports.modificar = async (req, res) => {
        const { cliente, subcontrato, beneficiarios } = req.body
        try {
            await modeloCliente.modificar(cliente);
            await modelo.modificar(subcontrato);
            if (beneficiarios && beneficiarios.length > 0) {
                beneficiarios.forEach(async beneficiario => {
                    if (beneficiario.secuencia) {
                        await modeloBeneficiario.modificar(beneficiario)
                    } else {
                        respuesta = await modeloBeneficiario.crear(subcontrato, beneficiario)
                    }
                });
            }
            return res.send(comunes.respuestaModificacion())
        } catch (error) {
            return res.send(comunes.respuestaExcepcion(error.detail))
        }
    },
    // Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
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
    exports.consultarEstadoCliente = (req, res) => {
        const { cliente } = req.body
        modelo
            .consultarPorClienteActivo(cliente)
            .then(subcontrato => {
                if (!subcontrato) {    //Si no hay resultado en a consulta del subcontrato
                    //console.log("No arrojo ningun resulado la consulta")
                    return res.send(comunes.respuestaExcepcion(`No arrojo resultados`))
                } else {            //Entra si el cliente exiten en la base de datos
                    let mensualidad = verificar.valorMensual(subcontrato)
                    subcontrato.mensualidad = mensualidad
                    modeloPago.consultarSubContratoGlobal(subcontrato.id).then(resultado => {
                        if (resultado.periodos == 0) {      //Verifica si se han relizado pagos
                            subcontrato.mora = true
                            //console.log("No hay pagos registrados")
                            //console.log(subcontrato)
                            return res.send(comunes.respuestaConsulta([subcontrato]))
                        } else {         //Si hay pagos entra hacer los calculos
                            let estadoMora = verificar.estadoMora(subcontrato, resultado)
                            subcontrato.mora = estadoMora
                            //console.log("se verifica los pagos realizados")
                            //console.log(subcontrato)
                            return res.send(comunes.respuestaConsulta([subcontrato]))
                        }
                    })
                }
            })
            .catch(err => {
                return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
            })
    },
    exports.consultarEstadoSubContrato = (req, res) => {
        const { id } = req.body
        modelo
            .consultarPorId(id)
            .then(subcontrato => {
                if (subcontrato && subcontrato.estado) {    //Si no hay resultado en a consulta del subcontrato
                    let mensualidad = verificar.valorMensual(subcontrato)
                    subcontrato.mensualidad = mensualidad
                    modeloPago.consultarSubContratoGlobal(subcontrato.id).then(resultado => {
                        if (resultado.periodos == 0) {      //Verifica si se han relizado pagos
                            //subcontrato.mora = true
                            //console.log("No hay pagos registrados")
                            //console.log(subcontrato)
                            return res.send(comunes.respuestaExitosaElemento(true))
                        } else {         //Si hay pagos entra hacer los calculos
                            let estadoMora = verificar.estadoMora(subcontrato, resultado)
                            subcontrato.mora = estadoMora
                            //console.log("se verifica los pagos realizados")
                            //console.log(subcontrato)
                            return res.send(comunes.respuestaExitosaElemento(estadoMora))
                        }
                    })
                } else {            //Entra si el cliente exiten en la base de datos
                    return res.send(comunes.respuestaExcepcion(`No arrojo resultados`))
                }
            })
            .catch(err => {
                return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
            })
    }