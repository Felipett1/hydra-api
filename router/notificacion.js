const express = require("express")
const controller = require("../controllers/notificacion")
const router = express.Router()
const path = '/notificacion'

router.post(path + '/PreRegistro', controller.ntfPreRegistro)

module.exports = router