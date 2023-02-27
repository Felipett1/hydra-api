const express = require("express")
const controller = require("../controllers/beneficiario")
const router = express.Router()
const path = '/beneficiario'

router.post(path, controller.consultar)
router.post(path + "/crear", controller.crear)
router.put(path, controller.modificar)
router.put(path + "/emoji", controller.modificarEmoji)
router.delete(path, controller.eliminar)
router.get(path + '/:secuencia', controller.consultarPorSecuencia)
module.exports = router