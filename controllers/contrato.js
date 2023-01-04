const comunes = require("../config/comunes")
const modelo = require("../models/contrato")

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
    const {cliente} = req.body
    modelo
        .consultarPorCliente(cliente)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
        //console.log(params);
}

exports.consultarPorId = (req, res) => {
    const {id} = req.body
    modelo
        .consultarPorId(id)
        .then(resultados => {
            return res.send(comunes.respuestaConsulta(resultados))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.crear = (req, res) => {
    const {id, cliente, fecha_inicio, estado, plan, valor, soporte} = req.body
    modelo
        .crear(id, cliente, fecha_inicio, estado, plan, valor, soporte)
        .then(() => {
            return res.send(comunes.respuestaCreacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.modificarValorId = (req, res) => {
    const {id, valor} = req.body
    modelo
        .modificarValorId(id, valor)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.modificarValorCliente = (req, res) => {
    const {cliente, valor} = req.body
    modelo
        .modificarValorCliente(cliente, valor)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.modificarEstadoId = (req, res) => {
    const {id, estado} = req.body
    modelo
        .modificarEstadoId(id, estado)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.modificarEstadoCliente = (req, res) => {
    const {cliente, estado} = req.body
    modelo
        .modificarEstadoCliente(cliente, estado)
        .then(() => {
            return res.send(comunes.respuestaModificacion())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}
exports.eliminar = (req, res) => {
    const {id} = req.body
    modelo
        .eliminar(id)
        .then(() => {
            return res.send(comunes.respuestaEliminar())
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}