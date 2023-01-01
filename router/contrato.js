const express = require("express")
const controller = require("../controllers/contrato")
const router = express.Router()
const path = '/contrato'

router.post(path, controller.consultarPorId)
router.put(path, controller.crearNuevo)

module.exports = router