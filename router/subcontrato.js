const express = require("express")
const controller = require("../controllers/subcontrato")
const router = express.Router()
const path = '/subcontrato'

router.get(path, controller.consultar)
router.post(path + '/cliente', controller.consultarPorCliente)
router.post(path + '/clienteEstado', controller.consultarEstadoCliente)
router.post(path + '/IdEstado', controller.consultarEstadoSubContrato)
router.get(path + '/id', controller.consultarPorId)
router.post(path, controller.crear)
router.put(path, controller.modificar)
router.put(path + '/valorId', controller.modificarValorId)
router.put(path + '/valorCliente', controller.modificarValorCliente)
router.put(path + '/estadoId', controller.modificarEstadoId)
router.put(path + '/estadoCliente', controller.modificarEstadoCliente)

module.exports = router
