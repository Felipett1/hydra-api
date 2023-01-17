const express = require("express")
const controller = require("../controllers/usuario")
const router = express.Router()
const path = '/usuario'

router.post(path + '/autenticar', controller.autenticar)
router.put(path + '/clave', controller.modificarClave)

module.exports = router