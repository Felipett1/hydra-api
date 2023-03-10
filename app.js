//Dependencias
const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const routeUsuario = require("../hydra-api/router/usuario")
const routeContrato = require("../hydra-api/router/contrato")
const routeCierreContrato = require("./router/cierre_Contrato")
const routeCliente = require("../hydra-api/router/cliente")
const routeBeneficiario = require("../hydra-api/router/beneficiario")
const routeServicio = require("../hydra-api/router/servicio")
const routeNotificacion = require("../hydra-api/router/notificacion")
const routePago = require("../hydra-api/router/pago")
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

//Aqui van las rutas
app.use(routeUsuario)
app.use(routeContrato)
app.use(routeCliente)
app.use(routeCierreContrato)
app.use(routeBeneficiario)
app.use(routeServicio)
app.use(routeNotificacion)
app.use(routePago)


app.listen(port, () => {
    console.log(`La aplicación esta en linea por el puerto ${port}`)
})