const express = require("express")
const controller = require("../controllers/pago_anticipado")
const router = express.Router()
const path = '/pago_anticipado'


router.put(path + '/cargar', controller.cargar)
router.put(path + '/actualizar', controller.actualizar)

module.exports = router