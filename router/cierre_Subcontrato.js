//Creado por Julian Calderon
//Julian Calderon 2023/02/26 Se modifica la funcion cierre_Contrato por cierre_subcontrato
const express = require("express")
const controller = require("../controllers/cierre_subcontrato")
const router = express.Router()
const path = '/cierreSubcontrato'

router.put(path, controller.modificarEstado)

module.exports = router