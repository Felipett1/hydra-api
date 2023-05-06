const express = require("express")
const controller = require("../controllers/pago")
const router = express.Router()
const path = '/pago'

router.get(path, controller.consultarSubContratoDetalle)
router.get(path + '/cliente', controller.consultarCliente)
router.get(path + '/subcontrato', controller.consultarSubContrato)
router.post(path, controller.cargar)
router.put(path + '/valor', controller.modificarPago)
router.post(path + '/masivo', controller.cargarMasivo)
module.exports = router