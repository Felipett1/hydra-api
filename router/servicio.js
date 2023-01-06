const express = require("express")
const controller = require("../controllers/servicio")
const router = express.Router()
const path = '/servicio'

router.get(path + '/contrato', controller.consultarContrato)
router.get(path + '/documento', controller.consultarDocumento)
router.put(path, controller.crear)
router.get(path, controller.consultarServicio)

module.exports = router
