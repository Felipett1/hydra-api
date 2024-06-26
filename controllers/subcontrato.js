const comunes = require("../config/comunes")
const modelo = require("../models/subcontrato")
const verificar = require("../utils/validacion")
const modeloPago = require("../models/pago")
const modeloCliente = require("../models/cliente")
const modeloBeneficiario = require("../models/beneficiario")
const modeloCierreSubcontrato = require("../models/cierre_subcontrato")
const mNovedadSubContrato = require("../models/novedad_subcontrato")
const mNovedadBeneficiario = require("../models/novedad_beneficiario")
const mSubContrato = require("../models/subcontrato")
const mPago = require("../models/pago")
const mAnticipado = require("../models/pago_anticipado")

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
exports.consultarPorCliente = async (req, res) => {
    const { cliente } = req.body
    try {
        var resultados = await modelo.consultarPorCliente(cliente)
        if (resultados) {
            for (let i = 0; i < resultados.length; i++) {
                const subcontrato = resultados[i];
                if (!subcontrato.estado) {
                    cierre = await modeloCierreSubcontrato.consultarPorSubContrato(subcontrato.id)
                    if (cierre) {
                        resultados[i].cierre = cierre
                    }
                }

            }
        }
        return res.send(comunes.respuestaConsulta(resultados))
    } catch (err) {
        return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
    }
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
            console.log(error)
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
    exports.consultarEstadoSubContrato = async (req, res) => {
        try {
            const { id } = req.body
            estadoMora = await this.logicaEstado(id)
            return res.send(comunes.respuestaExitosaElemento(estadoMora))
        } catch (error) {
            console.log(error)
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(error))
        }
    },

    exports.consultarReporteGeneral = (req, res) => {
        modelo
            .consultaReporteGeneral()
            .then(async resultados => {
                /*let respuesta = [];
                if (resultados && resultados.length > 0) {
                    for (let i = 0; i < resultados.length; i++) {
                        const r = resultados[i];
                        let entry = {
                            ...r
                        };
                        estadoMora = await this.logicaEstado(r['# Subcontrato'])
                        entry['Estado'] = estadoMora ? 'En Mora' : 'Al día'
                        respuesta.push(entry);
                    }
                }
                return res.send(comunes.respuestaConsulta(respuesta))*/
                return res.send(comunes.respuestaConsulta(resultados))
            })
            .catch(err => {
                return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
            })
    }

/*
Reusltado:
1 -> Al día
2 -> Pendiente
3 -> Incompleto
4 -> En mora
5 -> Pago sobrepasa lo esperado
6 -> En validación
7 -> Anticipado
*/
exports.validarEstado = async (subcontrato, fecha, valor) => {
    /*         //consulta de pagos para verificar anticipado
            console.log("entro")
            let anticipado = await mPago.consultarPagoConAnticipado(subcontrato);
            console.log(anticipado)
            if (anticipado) {
                await mAnticipado.actualizarSubContrato(true,subcontrato)
              return {
                estado: 7,
              };
            } */
    if (fecha >= new Date() && valor == 0) {
        return {
            estado: 2
        }
    } else if (fecha >= new Date() && valor != 0) {
        return {
            estado: 6
        }
    } else {
        //Consulta el valor plan segun la fecha
        let novedadSubcontrato =
            await mNovedadSubContrato.consultarUltimaNovedad(
                subcontrato,
                fecha
            );
        let valorPlan = novedadSubcontrato.valor;
        //Consulta los beneficiarios adicionales segun la fecha
        let novedadBeneficiario =
            await mNovedadBeneficiario.consultarUltimaNovedad(
                subcontrato,
                fecha
            );
        //Consultar valor del beneficiario, mascota adicional y fecha inicio contrato
        let dtlSubContrato = await mSubContrato.consultarPorId(subcontrato);
        //Iniciamos el valor de adicioanl y de mascota
        let adicional = 0;
        let mascota = 0;

        //Validamos si este contrato tiene beneficiarios adicionales
        if (novedadBeneficiario) {
            let vlrAdicional = dtlSubContrato.adicional;
            let vlrMascota = dtlSubContrato.mascota;
            //Consolidad valores a pagar por beneficiarios adicionales y mascota.
            novedadBeneficiario.forEach((beneficiario) => {
                if (beneficiario.parentesco == "MA") {
                    mascota += vlrMascota;
                } else {
                    adicional += vlrAdicional;
                }
            });
        }
        let valorTotal = valorPlan + adicional + mascota;

        if (valor == 0) {
            //Validar estado si no se ha recibido pago pero esta dentro de los días de gabela
            gabela = fecha.setDate(fecha.getDate() + process.env.DIAS_GABELA);
            if (new Date() > gabela) {
                return {
                    estado: 4,
                    valorMes: valorTotal,
                };
            } else {
                return {
                    estado: 2,
                    valorMes: valorTotal,
                };
            }
        } else if (valor > valorTotal) {
            return {
                estado: 5,
            };
        } else if (valor == valorTotal) {
            return {
                estado: 1,
            };
        } else if (valor < valorTotal) {
            return {
                estado: 3,
                valorMes: valorTotal,
            };
        }

    }
}

exports.logicaEstado = async (id) => {
    var subcontrato = id
    //Consulta el valor plan a la fecha
    let novedadSubcontrato = await mNovedadSubContrato.consultarUltimaNovedad(subcontrato, new Date())
    //Consultar valor del beneficiario, mascota adicional y fecha inicio contrato
    let dtlSubContrato = await mSubContrato.consultarPorId(subcontrato)
    //Consulta pagos registrados
    let pagos = await mPago.consultarSubContratoDetalle(subcontrato)
    //Completar meses que no tienen pago
    let listaPagos = []
    //Se obtiene la fecha inicial del contrato
    let fecha = new Date(dtlSubContrato.fecha_inicio)
    //Obtiene el día del inicio del subcontrato
    let diaSubContrato = fecha.getDate();
    for (let i = 1; i <= novedadSubcontrato.cuotas; i++) {
        aplico = false
        if (pagos) {
            for (let j = 0; j < pagos.length; j++) {
                const pago = pagos[j];
                if (pago.periodo == i && !aplico) {
                    validacion = await this.validarEstado(subcontrato, fecha, pago.valor)
                    pago.estado = validacion.estado
                    pago.valorMes = validacion.valorMes
                    listaPagos.push(pago)
                    aplico = true
                }
            }

            if (!aplico) {
                validacion = await this.validarEstado(subcontrato, fecha, 0)
                listaPagos.push(comunes.pagoGenerico(i, 0, comunes.obtenerMesAnio(fecha), validacion.estado, validacion.valorMes))
            }
        } else {
            validacion = await this.validarEstado(subcontrato, fecha, 0)
            listaPagos.push(comunes.pagoGenerico(i, 0, comunes.obtenerMesAnio(fecha), validacion.estado, validacion.valorMes))
        }
        fecha = comunes.agregarMes(fecha, diaSubContrato)
    }

    if (listaPagos) {
        estadoMora = false
        for (let i = 0; i < listaPagos.length; i++) {
            const pago = listaPagos[i];
            //Verifica si alguno de los pagos registrados esta incompleto o esta en mora
            if (pago.estado == 3 || pago.estado == 4) {
                estadoMora = true
                break
            }
        }
        return estadoMora
    }
    return true
}