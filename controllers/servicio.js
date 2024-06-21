const comunes = require("../config/comunes")
const modelo = require("../models/servicio")
const modeloNovedad = require("../models/novedad_servicio")

exports.consultarSubContratoCerrado = (req, res) => {
    const { id } = req.body
    modelo
        .consultarSubContratoCerrado(id)
        .then(async (resultado) => {
            resultado = await this.consultarNovedadServicio(resultado)
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
//Consultar servicios activos de un subcontrato
exports.consultarSubContratoActivo = (req, res) => {
    const { id } = req.body
    modelo
        .consultarSubContratoActivo(id)
        .then(async (resultado) => {
            resultado = await this.consultarNovedadServicio(resultado)
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.consultarSubContratoGeneral = (req, res) => {
    const { id } = req.body
    modelo
        .consultarSubContratoGeneral(id)
        .then(async (resultado) => {
            resultado = await this.consultarNovedadServicio(resultado)
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.consultarDocumento = (req, res) => {
    const { documento } = req.body
    modelo
        .consultarDocumento(documento)
        .then(async (resultado) => {
            resultado = await this.consultarNovedadServicio(resultado)
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.crear = (req, res) => {
    const { subcontrato, tipo_servicio, detalle_inicial, contacto } = req.body
    modelo
        .crear(subcontrato, tipo_servicio, contacto)
        .then(async (respuesta) => {
            if (respuesta) {
                respuesta = await modeloNovedad.crear(respuesta[0].secuencia, 'Creación', detalle_inicial)
                if (respuesta > 0) {
                    return res.send(comunes.respuestaCreacion())
                }
            }
            return res.send(comunes.respuestaExcepcion(comunes.DTL_ERROR_CREACION_SERVICIO))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.cerrarServicio = (req, res) => {
    const { detalle_final, secuencia } = req.body

    modelo
        .cerrarServicio(secuencia)
        .then(async (respuesta) => {
            if (respuesta > 0) {
                respuesta = await modeloNovedad.crear(secuencia, 'Cierre', detalle_final)
                if (respuesta > 0) {
                    return res.send(comunes.respuestaModificacion())
                }
            }
            return res.send(comunes.respuestaExcepcion(comunes.DTL_ERROR_CIERRE_SERVICIO))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.consultarServicioTiempo = (req, res) => {
    const { fechaInicio, fechaFin } = req.body
    modelo
        .consultarServicioTiempo(fechaInicio, fechaFin)
        .then((resultado) => {
            let respuesta = [];

            if (resultado && resultado.length > 0) {
                for (let i = 0; i < resultado.length; i++) {
                    const r = resultado[i];
                    let entry = {
                        'ID': r['ID'],
                        'Documento': r['Documento'],
                        'Servicio': r['Servicio'],
                        'Fecha inicial': r.fecha,
                        'Detalle inicial': r.detalle
                    };

                    if (i + 1 < resultado.length && resultado[i + 1].novedad === 'Cierre') {
                        entry['Fecha final'] = resultado[i + 1].fecha;
                        entry['Detalle final'] = resultado[i + 1].detalle;
                        i++; // Saltar al siguiente elemento ya que ha sido procesado
                    }
                    respuesta.push(entry);
                }
            }
            return res.send(comunes.respuestaConsulta(respuesta))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.consultarNovedadServicio = async (servicios) => {
    try {
        if (servicios && servicios.length > 0) {
            for (let i = 0; i < servicios.length; i++) {
                const servicio = servicios[i];
                servicios[i].novedades = await modeloNovedad.consultar(servicio.secuencia)
            }
        }
        return servicios
    } catch (error) {
        console.log('Error obteniendo el detalle de los servicios')
    }
}
