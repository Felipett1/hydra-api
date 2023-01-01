//Dependencias
const express = require("express")
require("dotenv").config()
const bodyParser = require("body-parser")
const routeUsuario = require("../hydra-api/router/usuario")
<<<<<<< HEAD
const routeContrato = require("../hydra-api/router/contrato")
const routeCierreContrato = require("./router/cierre_Contrato")
const routePago = require("./router/pago")
=======
const routePago = require("../hydra-api/router/pago")
>>>>>>> fd0a4b21a85f3070db36a573b07cb91509cf3f0b
//Variables
const app = express()

//Configuraciones
const port = process.env.PORT

app.use(
    bodyParser.json({
            limit:"50mb"
    })
)

app.use(
    bodyParser.urlencoded({
            limit:"50mb",
            extended: "true"
    })
)

//Aqui van las rutas
app.use(routeUsuario)
<<<<<<< HEAD
app.use(routeContrato)
app.use(routeCierreContrato)
app.use(routePago)
=======
app.use(routePago)

>>>>>>> fd0a4b21a85f3070db36a573b07cb91509cf3f0b

app.listen(port, () => {
    console.log(`La aplicación esta en linea por el puerto ${port}`)
})