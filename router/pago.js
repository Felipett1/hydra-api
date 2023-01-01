const express = require("express")
const controller = require("../controllers/pago")
const router = express.Router()
const path = '/pago'

router.get(path, controller.consultar)
router.get(path + '/cliente', controller.consultarCliente)
router.get(path + '/contrato', controller.consultarContrato)

module.exports = router