const express = require("express")
const controller = require("../controllers/pago")
const router = express.Router()
const path = '/pago'

router.post(path, controller.cargar)

module.exports = router