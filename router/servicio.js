const express = require("express")
const controller = require("../controllers/servicio")
const router = express.Router()
const path = '/servicio'

router.post(path + '/subcontrato/cerrado', controller.consultarSubContratoCerrado)
router.post(path + '/subcontrato/activo', controller.consultarSubContratoActivo)
router.post(path + '/subcontrato', controller.consultarSubContratoGeneral)
router.get(path + '/documento', controller.consultarDocumento)
router.put(path, controller.crear)
router.put(path + '/cerrar', controller.cerrarServicio)
router.post(path + '/reporte', controller.consultarServicioTiempo)
module.exports = router
