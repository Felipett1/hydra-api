const express = require("express")
const controller = require("../controllers/cierre_Contrato")
const router = express.Router()
const path = '/cierreContrato'

//router.get(path, controller.consultar)
router.put(path, controller.modificarEstado)

module.exports = router