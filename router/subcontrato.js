const express = require("express")
const controller = require("../controllers/subcontrato")
const router = express.Router()
const path = '/subcontrato'

router.get(path, controller.consultar)
router.get(path + '/id', controller.consultarPorId)
router.post(path, controller.crear)


module.exports = router
