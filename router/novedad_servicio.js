const express = require("express")
const controller = require("../controllers/novedad_servicio")
const router = express.Router()
const path = '/novedad/servicio'

router.post(path + '/consulta', controller.consultar)
router.put(path + '/crear', controller.crear)
router.post(path + '/modificar', controller.modificar)
router.post(path + '/eliminar', controller.eliminar)

module.exports = router
