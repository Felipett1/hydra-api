const express = require("express")
const controller = require("../controllers/pago")
const router = express.Router()
const path = '/pago'

<<<<<<< HEAD
router.get(path, controller.consultar)
router.get(path + '/cliente', controller.consultarCliente)
router.get(path + '/contrato', controller.consultarContrato)
=======
router.post(path, controller.cargar)
>>>>>>> fd0a4b21a85f3070db36a573b07cb91509cf3f0b

module.exports = router