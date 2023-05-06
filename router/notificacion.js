const express = require("express")
const controller = require("../controllers/notificacion")
const router = express.Router()
const path = '/notificacion'

router.post(path + '/PreRegistro', controller.ntfPreRegistro)
router.post(path + '/Recuperacion', controller.ntfRecuperacion)
router.post(path + '/servicio', controller.ntfServicio)
router.post(path + '/solicitud', controller.ntfSolicitud)

module.exports = router