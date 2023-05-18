const comunes = require("../config/comunes")
const { consultarPorDocumento } = require("../models/cliente")
const modelo = require("../models/pago")
const mSubContrato = require("../models/subcontrato")
const mNovedadSubContrato = require("../models/novedad_subcontrato")
const mNovedadBeneficiario = require("../models/novedad_beneficiario")

exports.consultar = (req, res) => {
    const { inicio, fin } = req.body
    modelo
        .consultar(inicio, fin)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.cargar = (req, res) => {
    const { subcontrato, fecha, periodo, valor, anticipado ,mes} = req.body
    modelo
        .cargar(subcontrato, fecha, periodo, valor, anticipado,mes)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })


}

exports.cargarMasivo = async (req, res) => {
    const pagos = req.body.pagos

    for (let i = 0; i < pagos.length; i++) {
        //console.log(`Esta pagando el periodo : ${pagos[i].periodo} del subcontrato ${pagos[i].subcontrato} por un valor de ${pagos[i].valor}`);
        await modelo
            .cargar(pagos[i].subcontrato, pagos[i].fecha, pagos[i].periodo, pagos[i].valor, pagos[i].anticipado)
            .then(() => {
                pagos[i].resultado = "Registro guardado exitosamente."
            })
            .catch(err => {
                pagos[i].resultado = err + ""
            })
    }
    respuesta = comunes.respuestaGenerica()
    respuesta.resultados = pagos
    return res.send(respuesta)
}

exports.consultarCliente = (req, res) => {
    const { cliente, inicio, fin } = req.body
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

exports.consultarSubContrato = (req, res) => {
    const { subcontrato, inicio, fin } = req.body
    //console.log("El dato ingresado es: " + id)
    modelo
        .consultarSubContrato(subcontrato, inicio, fin)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
            //console.log("El dato ingresado es: " + req.params.id)
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.modificarPago = (req, res) => {
    const { valor, secuencia } = req.body
    modelo
        .modificarPago(valor, secuencia)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.consultarSubContratoDetalle = async (req, res) => {
    try {
        const { subcontrato } = req.body
        //Consulta el valor plan a la fecha
        let novedadSubcontrato = await mNovedadSubContrato.consultarUltimaNovedad(subcontrato, new Date())
        let valorPlan = novedadSubcontrato.valor
        //Consulta los beneficiarios adicionales a la fecha
        let novedadBeneficiario = await mNovedadBeneficiario.consultarUltimaNovedad(subcontrato, new Date())
        //Consultar valor del beneficiario, mascota adicional y fecha inicio contrato
        let dtlSubContrato = await mSubContrato.consultarPorId(subcontrato)
        //Iniciamos el valor de adicioanl y de mascota
        let adicional = 0
        let mascota = 0
        //Validamos si este contrato tiene beneficiarios adicionales
        if (novedadBeneficiario) {
            let vlrAdicional = dtlSubContrato.adicional
            let vlrMascota = dtlSubContrato.mascota
            //Consolidad valores a pagar por beneficiarios adicionales y mascota.
            novedadBeneficiario.forEach(beneficiario => {
                if (beneficiario.parentesco == 'MA') {
                    mascota += vlrMascota
                } else {
                    adicional += vlrAdicional
                }
            });
        }
        //Consulta pagos registrados
        let pagos = await modelo.consultarSubContratoDetalle(subcontrato)
        //Completar meses que no tienen pago
        let listaPagos = []
        //Se obtiene la fecha inicial del contrato
        let fecha = new Date(dtlSubContrato.fecha_inicio)
        let diaSubContrato = fecha.getDate();
        //let fecha = new Date("2023-03-31")
        //fecha.setDate(1)
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
        var respuesta = {
            estado: comunes.estado(comunes.COD_EXITOSO, comunes.MSG_EXITOSO, comunes.DTL_EXITOSO),
            valorPlan,
            adicional,
            mascota,
            totalCuota: valorPlan + adicional + mascota,
            listaPagos,
        }
        return res.send(respuesta)
    } catch (error) {
        return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(error))
    }
}

/*
Reusltado:
1 -> Al día
2 -> Pendiente
3 -> Incompleto
4 -> En mora
*/
exports.validarEstado = async (subcontrato, fecha, valor) => {
    if (fecha >= new Date()) {
        return {
            estado: 2
        }
    } else {
        //Consulta el valor plan segun la fecha
        let novedadSubcontrato = await mNovedadSubContrato.consultarUltimaNovedad(subcontrato, fecha)
        let valorPlan = novedadSubcontrato.valor
        //Consulta los beneficiarios adicionales segun la fecha
        let novedadBeneficiario = await mNovedadBeneficiario.consultarUltimaNovedad(subcontrato, fecha)
        //Consultar valor del beneficiario, mascota adicional y fecha inicio contrato
        let dtlSubContrato = await mSubContrato.consultarPorId(subcontrato)
        //Iniciamos el valor de adicioanl y de mascota
        let adicional = 0
        let mascota = 0
        //Validamos si este contrato tiene beneficiarios adicionales
        if (novedadBeneficiario) {
            let vlrAdicional = dtlSubContrato.adicional
            let vlrMascota = dtlSubContrato.mascota
            //Consolidad valores a pagar por beneficiarios adicionales y mascota.
            novedadBeneficiario.forEach(beneficiario => {
                if (beneficiario.parentesco == 'MA') {
                    mascota += vlrMascota
                } else {
                    adicional += vlrAdicional
                }
            });
        }
        let valorTotal = valorPlan + adicional + mascota

        if (valor == 0) {
            return {
                estado: 4,
                valorMes: valorTotal
            }
        } else if (valor >= valorTotal) {
            return {
                estado: 1
            }
        } else if (valor < valorTotal) {
            return {
                estado: 3,
                valorMes: valorTotal
            }
        }
    }
}
