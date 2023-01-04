const express = require("express")
const controller = require("../controllers/beneficiario")
const router = express.Router()
const path = '/beneficiario'

router.post(path, controller.crear)

module.exports = router