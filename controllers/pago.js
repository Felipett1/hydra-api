const comunes = require("../config/comunes")
const pago = require("../models/pago")
const modelo = require("../models/pago")

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

exports.cargarMasivo = async (req, res) => {
    const pagos = req.body.pagos

    for (let i = 0; i < pagos.length; i++) {
        //console.log(`Esta pagando el periodo : ${pagos[i].periodo} del contrato ${pagos[i].contrato} por un valor de ${pagos[i].valor}`);
        await modelo
            .cargar(pagos[i].contrato, pagos[i].fecha, pagos[i].periodo, pagos[i].valor)
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

exports.consultarContrato = (req, res) => {
    const { contrato, inicio, fin } = req.body
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
exports.modificarPago= (req, res) => {
    const {valor,secuencia} = req.body
    modelo
        .modificarPago(valor,secuencia)
        .then(() => {
            return res.send(comunes.respuestaModificacion())       
            })   
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}