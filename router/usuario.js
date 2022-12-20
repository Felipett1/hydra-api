const express = require("express")
const controller = require("../controllers/usuario")
const router = express.Router()
const path = '/usuario'

router.post(path + '/autenticar', controller.autenticar)

module.exports = router