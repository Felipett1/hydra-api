const fs = require('fs');
const correo = require("../config/correo");
const comunes = require("../config/comunes")
const preRegistro = require("../storage/notificaciones/pre_registro")
const recuperacion = require("../storage/notificaciones/recuperacion")

/*
Autor: Felipe Triviño
Fecha: 20/12/2022
Detalle: FUNCION QUE GENERA NOTIFICACIONES DEL SISTEMA
Tipo de notificaciones:
1 -> Pre registro
2 -> Creacion de servicio
3 -> ANS
4 -> Solicitud de servicio
5 -> Renovación Subcontrato
*/
exports.enviarCorreo = async (para, tipoNotificacion, cargaUtil) => {
    const transporter = correo
    try {
        const info = await transporter.sendMail({
            from: comunes.DE,
            to: para,
            subject: validarAsunto(tipoNotificacion),
            html: validarNotificacion(tipoNotificacion, cargaUtil)
        })
        console.log("Mensaje enviado con el id: " + info.messageId)
        return info.messageId
    } catch (error) {
        console.log(error + "")
    }
}

/*
Autor: Felipe Triviño
Fecha: 20/12/2022
Detalle: Obtiene el html dependiendo del tipo de notificación
Tipo de notificaciones:
1 -> Pre registro
2 -> Creacion de servicio
3 -> ANS
4 -> Solicitud de servicio
5 -> Renovación Subcontrato
6 -> Recuperación de contraseña
*/
function validarNotificacion(tipoNotificacion, datos) {
    try {
        let data
        switch (tipoNotificacion) {
            case 1:
                data = preRegistro.mensaje(datos)
                return data
            case 2:
                data = fs.readFileSync('./storage/notificaciones/servicio.html', 'utf8');
                return data
            case 3:
                data = fs.readFileSync('./storage/notificaciones/ans.html', 'utf8');
                return data
            case 4:
                data = fs.readFileSync('./storage/notificaciones/solicitud.js', 'utf8');
                return data
            case 5:
                data = fs.readFileSync('./storage/notificaciones/renovacion.html', 'utf8');
                return data
            case 6:
                data = recuperacion.mensaje(datos)
                return data
            default:
                console.log('No se reconoce el tipo de notificación')
        }
    } catch (err) {
        console.error(err);
    }
}

function validarAsunto(tipoNotificacion) {
    try {
        let data
        switch (tipoNotificacion) {
            case 1:
                return comunes.ASUNTO_PR
            case 2:
                return comunes.ASUNTO_CS
            case 3:
                return comunes.ASUNTO_ANS
            case 4:
                return comunes.ASUNTO_SS
            case 5:
                return comunes.ASUNTO_RC
            case 6:
                return comunes.ASUNTO_RP
            default:
                console.log('No se reconoce el tipo de notificación')
        }
    } catch (err) {
        console.error(err);
    }
}