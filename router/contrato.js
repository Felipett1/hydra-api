const express = require("express")
const controller = require("../controllers/contrato")
const router = express.Router()
const path = '/contrato'

router.get(path, controller.consultar)
router.get(path + '/cliente', controller.consultarPorCliente)
router.get(path + '/clienteEstado', controller.consultarEstadoCliente)
router.get(path + '/id', controller.consultarPorId)
router.post(path, controller.crear)
router.put(path + '/valorId', controller.modificarValorId)
router.put(path + '/valorCliente', controller.modificarValorCliente)
router.put(path + '/estadoId', controller.modificarEstadoId)
router.put(path + '/estadoCliente', controller.modificarEstadoCliente)
router.delete(path, controller.eliminar)

module.exports = router