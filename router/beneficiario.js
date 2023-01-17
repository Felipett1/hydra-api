const express = require("express")
const controller = require("../controllers/beneficiario")
const router = express.Router()
const path = '/beneficiario'

router.get(path, controller.consultar)
router.post(path, controller.crear)
router.put(path, controller.modificar)
router.put(path + "/marquilla", controller.modificarMarquilla)
router.delete(path, controller.eliminar)

module.exports = router