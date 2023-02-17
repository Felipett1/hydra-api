const express = require("express")
const controller = require("../controllers/servicio")
const router = express.Router()
const path = '/servicio'

router.post(path + '/contrato', controller.consultarContrato)
router.get(path + '/documento', controller.consultarDocumento)
router.put(path, controller.crear)
router.get(path, controller.consultarServicio)
router.put(path + '/cerrar', controller.cerrarServicio)
module.exports = router
