const comunes = require("../config/comunes")
const { consultarPorDocumento } = require("../models/cliente")
const modelo = require("../models/pago")
const mSubContrato = require("../models/subcontrato")
const mNovedadSubContrato = require("../models/novedad_subcontrato")
const mNovedadBeneficiario = require("../models/novedad_beneficiario")
const mCliente = require("../models/cliente")
const mAnticipado = require("../models/pago_anticipado")
const mPago = require("../models/pago")

require("dotenv").config()

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
    const { subcontrato, fecha, periodo, valor, anticipado, mes } = req.body
    modelo
        .cargar(subcontrato, fecha, periodo, valor, anticipado, mes)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })


}

exports.cargarMasivo = async (req, res) => {
    try {
        const { archivoEntrada } = req.body
        // Decodificar el archivo CSV base64 en texto
        const contenidoCSV = atob(archivoEntrada);
        // Dividir el contenido en filas (registros)
        const filas = contenidoCSV.split('\n');
        let archivoSalida = `${comunes.TITULOS}${comunes.SEPERADOR}`
        //Valida si el archivo tiene registros para procesar
        if (filas && filas.length > 0) {
            // Iterar sobre cada fila de pago
            for (let i = 0; i < filas.length; i++) {
                // Dividir la fila en columnas utilizando el punto y coma como separador
                const columnas = filas[i].split(';');
                //Validar si tiene 3 columnas cada registro
                if (columnas && columnas.length == 3) {
                    let cliente = columnas[0]
                    let sub = columnas[1]
                    let valor = columnas[2]
                    //Valida si el valor a pagar es mayor a cero
                    if (valor && valor > 0) {
                        //Consulta si existe el cliente
                        let resultado = await mCliente.consultarPorDocumento(cliente)
                        if (resultado.length > 0) {
                            //Consultar subcontratos activos
                            //let subcontratos = await mSubContrato.consultarPorClienteActivo(cliente)
                            let subcontratos = await mSubContrato.consultarPorIdActivo(sub, cliente)
                            if (subcontratos) {
                                //Almacenará el detalle de los pagos aplicados por registro
                                let detallePagoRegistro = ''
                                //Consultar estado de cuenta de cada uno de los subContratos vigentes
                                for (let j = 0; j < subcontratos.length; j++) {
                                    let subcontrato = subcontratos[j];
                                    if (!subcontrato.anticipado) {
                                        let fechaDia = new Date()
                                        //Consulta el detalle de cada subcontrato para identificar el estado de cuenta
                                        let detalle = await this.obtenerDetalle(subcontrato.id)
                                        for (let k = 0; k < detalle.listaPagos.length; k++) {
                                            let mes = detalle.listaPagos[k]
                                            let valorPlan = detalle.valorPlan
                                            //Bandera para saber si el insert o el update funcionarón
                                            let aplicado = 0
                                            //Se almacena valor en caso de que el pago no se pueda aplicar por un error, se restaura al valor anterior
                                            var bckValor = valor
                                            if (valor > 0) {
                                                try {
                                                    //Si el pago esta incompleto
                                                    if (mes.estado == 3) {
                                                        let faltante = mes.valorMes - mes.valor
                                                        if (valor >= faltante) {
                                                            valor = valor - faltante
                                                            //Actualizar registro de pago para dejar al día ese periodo
                                                            aplicado = await mPago.modificarPago(mes.valorMes, mes.secuencia)
                                                            if (aplicado > 0) {
                                                                detallePagoRegistro += `${comunes.SEPERADOR}*Se aplico pago (${subcontrato.id} - ${mes.mes}) a registro incompleto y quedo al día (Diferencia aplicada ${faltante})`
                                                            }
                                                        } else {
                                                            //Actualizar registro de pago para reducir la diferencia
                                                            aplicado = await mPago.modificarPago(mes.valor + valor, mes.secuencia)
                                                            if (aplicado > 0) {
                                                                detallePagoRegistro += `${comunes.SEPERADOR}*Se aplico pago (${subcontrato.id} - ${mes.mes}) a registro incompleto, sin embago no alcanzo a quedar al día (Diferencia aplicada ${valor})`
                                                                valor = 0
                                                            }
                                                        }
                                                    }
                                                    //Si el pago esta en mora
                                                    else if (mes.estado == 4) {
                                                        if (valor >= mes.valorMes) {
                                                            valor = valor - mes.valorMes
                                                            //Insertar registro de pago para dejar al día ese periodo
                                                            aplicado = await mPago.cargar(subcontrato.id, fechaDia, mes.periodo, mes.valorMes, null, mes.mes)
                                                            if (aplicado > 0) {
                                                                detallePagoRegistro += `${comunes.SEPERADOR}*Se aplico pago (${subcontrato.id} - ${mes.mes}) a registro en mora y quedo al día (Valor aplicado ${mes.valorMes})`
                                                            }
                                                        } else {
                                                            //Insertar registro de pago para reducir la mora
                                                            aplicado = await mPago.cargar(subcontrato.id, fechaDia, mes.periodo, valor, null, mes.mes)
                                                            if (aplicado > 0) {
                                                                detallePagoRegistro += `${comunes.SEPERADOR}*Se aplico pago (${subcontrato.id} - ${mes.mes}) a registro en mora, sin embago no alcanzo a quedar al día (Valor aplicado ${valor})`
                                                                valor = 0
                                                            }
                                                        }
                                                    }
                                                    //Si el pago esta pendiente
                                                    else if (mes.estado == 2 && (j == subcontratos.length - 1)) {
                                                        if (valor >= valorPlan) {
                                                            valor = valor - valorPlan
                                                            //Insertar registro de pago en un periodo con estado pendiente
                                                            aplicado = await mPago.cargar(subcontrato.id, fechaDia, mes.periodo, valorPlan, null, mes.mes)
                                                            if (aplicado > 0) {
                                                                detallePagoRegistro += `${comunes.SEPERADOR}*Se aplico pago (${subcontrato.id} - ${mes.mes}) a registro en estado pendiente (Valor aplicado ${valorPlan})`
                                                            }
                                                        } else {
                                                            //Insertar registro de pago en un periodo con estado pendiente
                                                            aplicado = await mPago.cargar(subcontrato.id, fechaDia, mes.periodo, valor, null, mes.mes)
                                                            if (aplicado > 0) {
                                                                detallePagoRegistro += `${comunes.SEPERADOR}*Se aplico pago (${subcontrato.id} - ${mes.mes}) a registro en estado pendiente (Valor aplicado ${valor})`
                                                                valor = 0
                                                            }
                                                        }
                                                    }
                                                    if (aplicado == 0 && (mes.estado == 3 || mes.estado == 4)) {
                                                        detallePagoRegistro += `${comunes.SEPERADOR}*No fue posible aplicar el pago  (${subcontrato.id} - ${mes.mes})`
                                                        valor = bckValor
                                                    }
                                                } catch (error) {
                                                    detallePagoRegistro += `${comunes.SEPERADOR}*No fue posible aplicar el pago  (${subcontrato.id} - ${mes.mes}) / Detalle: ${error}`
                                                }
                                            } else {
                                                break
                                            }
                                        }
                                    }
                                }
                                if (valor == 0) {
                                    filas[i] = `${comunes.APLICADO};"${detallePagoRegistro.replace(/\n/, "")}";` + filas[i]
                                } else {
                                    filas[i] = `${comunes.APLICADO_PARCIALMENTE};"${detallePagoRegistro.replace(/\n/, "")} - Valor pendiente de aplicar (${valor})";` + filas[i]
                                }
                            } else {
                                filas[i] = `${comunes.NO_APLICADO};Subcontrato no esta activo, no existe o no corresponde al cliente;` + filas[i]
                            }
                        } else {
                            filas[i] = `${comunes.NO_APLICADO};Cliente no existe;` + filas[i]
                        }
                    } else {
                        filas[i] = `${comunes.NO_APLICADO};Valor invalido;` + filas[i]
                    }
                } else {
                    //Estructura invalida
                    filas[i] = `${comunes.NO_APLICADO};Estuctura invalida;` + filas[i]
                }
                archivoSalida += filas[i]
            }
        } else {
            //Archivo vacio
            archivoSalida = comunes.SIN_REGISTROS
        }
        var base64String = btoa(archivoSalida);
        return res.send(comunes.respuestaExitosaElemento(base64String))
    } catch (error) {
        return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(error))
    }
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
        var respuesta = await this.obtenerDetalle(subcontrato)
        return res.send(respuesta)
    } catch (error) {
        console.log(error)
        return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(error))
    }
}

exports.obtenerDetalle = async (subcontrato) => {
    try {
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
        let estadoPlan = dtlSubContrato.estado
        let documento = dtlSubContrato.cliente
        let grado = dtlSubContrato.grado
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
        //Obtiene el día del inicio del subcontrato
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
                        pago.mesN = fecha.getMonth() + 1
                        pago.anio = fecha.getFullYear()
                        listaPagos.push(pago)
                        aplico = true
                    }
                }

                if (!aplico) {
                    validacion = await this.validarEstado(subcontrato, fecha, 0)
                    listaPagos.push(comunes.pagoGenerico(i, 0, comunes.obtenerMesAnio(fecha), validacion.estado, validacion.valorMes, (fecha.getMonth() + 1), fecha.getFullYear()))
                }
            } else {
                validacion = await this.validarEstado(subcontrato, fecha, 0)
                listaPagos.push(comunes.pagoGenerico(i, 0, comunes.obtenerMesAnio(fecha), validacion.estado, validacion.valorMes, (fecha.getMonth() + 1), fecha.getFullYear()))
            }
            fecha = comunes.agregarMes(fecha, diaSubContrato)
        }
        return respuesta = {
            estado: comunes.estado(comunes.COD_EXITOSO, comunes.MSG_EXITOSO, comunes.DTL_EXITOSO),
            valorPlan,
            adicional,
            mascota,
            estadoPlan,
            documento,
            grado,
            totalCuota: valorPlan + adicional + mascota,
            listaPagos,
        }
    } catch (error) {
        console.log(error)
        return comunes.respuestaExcepcion(error)
    }
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
    //consulta de pagos para verificar anticipado y se actualiza el subcontrato

    let anticipado = await mPago.consultarPagoConAnticipado(subcontrato);
    if (anticipado) {
        await mAnticipado.actualizarSubContrato(true, subcontrato)
        return {
            estado: 7,
        };
    }
    if (fecha >= new Date() && valor == 0) {
        //consulta de pagos para verificar anticipado y se actualiza el subcontrato

        let anticipado = await mPago.consultarPagoConAnticipado(subcontrato);
        if (anticipado) {
            await mAnticipado.actualizarSubContrato(true, subcontrato);
            return {
                estado: 7,
            };
        }
        return {
            estado: 2,
        };
    } else if (fecha >= new Date() && valor != 0) {
        return {
            estado: 6
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
            //Validar estado si no se ha recibido pago pero esta dentro de los días de gabela
            gabela = fecha.setDate(fecha.getDate() + parseInt(process.env.DIAS_GABELA));
            if (new Date() > gabela) {
                return {
                    estado: 4,
                    valorMes: valorTotal
                }
            } else {
                return {
                    estado: 2,
                    valorMes: valorTotal
                }
            }
        } else if (valor > valorTotal) {
            return {
                estado: 5
            }
        } else if (valor == valorTotal) {
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

exports.consultarPagoTiempo = (req, res) => {
    const { fechaInicio, fechaFin } = req.body
    modelo
        .consultarPagoTiempo(fechaInicio, fechaFin)
        .then((resultado) => {
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.dejarAlDia = async (req, res) => {
    try {
        const { subcontratos } = req.body
        for (let i = 0; i < subcontratos.length; i++) {
            const id = subcontratos[i];
            //Consultar subcontrato
            let subcontrato = await mSubContrato.consultarPorId(id)
            if (!subcontrato.anticipado && subcontrato.estado) {
                let fechaDia = new Date()
                fechaDia.setHours(0, 0, 0, 0)
                //Consulta el detalle de cada subcontrato para identificar el estado de cuenta
                let detalle = await this.obtenerDetalle(subcontrato.id)
                for (let k = 0; k < detalle.listaPagos.length; k++) {
                    let mes = detalle.listaPagos[k]
                    try {
                        //Si el pago esta incompleto
                        if (mes.estado == 3) {
                            aplicado = await mPago.modificarPago(mes.valorMes, mes.secuencia)
                        }
                        //Si el pago esta en mora
                        else if (mes.estado == 4) {
                            aplicado = await mPago.cargar(subcontrato.id, fechaDia, mes.periodo, mes.valorMes, null, mes.mes)
                        }
                    } catch (error) {
                        console.log('No fue posible aplicar el pago')
                    }
                }
            }
        }
        return res.send(comunes.respuestaGenerica())
    } catch (error) {
        return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(error))
    }
}
