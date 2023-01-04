const express = require("express")
const controller = require("../controllers/beneficiario")
const router = express.Router()
const path = '/beneficiario'

router.put(path, controller.crear)

module.exports = router