const express = require("express")
const controller = require("../controllers/usuario")
const router = express.Router()
const path = '/usuario'

router.post(path + '/autenticar', controller.autenticar)
router.post(path + '/clave', controller.modificarClave)
router.get(path, controller.consultaGeneral)

module.exports = router