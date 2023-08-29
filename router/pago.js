const express = require("express")
const controller = require("../controllers/pago")
const router = express.Router()
const path = '/pago'

router.post(path, controller.consultarSubContratoDetalle)
router.get(path + '/cliente', controller.consultarCliente)
router.get(path + '/subcontrato', controller.consultarSubContrato)
router.put(path + '/cargar', controller.cargar)
router.put(path + '/valor', controller.modificarPago)
router.post(path + '/masivo', controller.cargarMasivo)
router.post(path + '/reporte', controller.consultarPagoTiempo)
router.post(path + '/aldia', controller.dejarAlDia)
module.exports = router