//Dependencias
const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const routeUsuario = require("../hydra-api/router/usuario")
const routeSubContrato = require("../hydra-api/router/subcontrato")
const routeCierreSubcontrato = require("./router/cierre_subcontrato")
const routeCliente = require("../hydra-api/router/cliente")
const routeBeneficiario = require("../hydra-api/router/beneficiario")
const routeServicio = require("../hydra-api/router/servicio")
const routeNotificacion = require("../hydra-api/router/notificacion")
const routePago = require("../hydra-api/router/pago")
const routePago_anticipado = require("../hydra-api/router/pago_anticipado")
const routeNovedadServicio = require("../hydra-api/router/novedad_servicio")
//Variables
const app = express()

//Configuraciones
const port = process.env.PORT

app.use(
    bodyParser.json({
        limit: "50mb"
    })
)

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: "true"
    })
)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

//Aqui van las rutas
app.use(routeUsuario)
app.use(routeSubContrato)
app.use(routeCliente)
app.use(routeCierreSubcontrato)
app.use(routeBeneficiario)
app.use(routeServicio)
app.use(routeNotificacion)
app.use(routePago)
app.use(routePago_anticipado)
app.use(routeNovedadServicio)

app.listen(port, () => {
    console.log(`La aplicación esta en linea por el puerto ${port}`)
})