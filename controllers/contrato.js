const comunes = require("../config/comunes")
const modelo = require("../models/contrato")

exports.consultarPorId = (req, res) => {
    const { id } = req.body
    modelo
        .consultarPorId(id)
        .then((resultado) => {console.log(resultado)
            return res.send(comunes.respuestaConsulta(resultado))
        })
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

exports.crearNuevo = (req, res) => {
    const {id, cliente, fecha_inicio, estado, plan, valor, soporte} = req.body
    modelo
        .crearNuevo(id, cliente, fecha_inicio, estado, plan, valor, soporte)
        .then(() => {
            return res.send(comunes.respuestaCreacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}

