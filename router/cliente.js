const express = require("express")
const controller = require("../controllers/cliente")
const router = express.Router()
const path = '/cliente'

router.post(path, controller.crear)

module.exports = router