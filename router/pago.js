const express = require("express")
const controller = require("../controllers/pago")
const router = express.Router()
const path = '/pago'

router.get(path, controller.consultar)
router.get(path + '/cliente', controller.consultarCliente)
router.get(path + '/contrato', controller.consultarContrato)
router.post(path, controller.cargar)
router.post(path + '/masivo', controller.cargarMasivo)

module.exports = router