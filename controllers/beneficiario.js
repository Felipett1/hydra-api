const comunes = require("../config/comunes")
const modelo = require("../models/beneficiario")

exports.crear = (req, res) => {
    const {contrato, nombre, edad, parentesco, adicional} = req.body
    modelo
        .crear(contrato, nombre, edad, parentesco, adicional)
        .then(() => {
            return res.send(comunes.respuestaCreacion())        
        })     
        .catch(err => {
            return res.status(comunes.COD_500).send(comunes.respuestaExcepcion(err))
        })
}