/*
Autor: Julian Camilo Calderon
    Fecha: 27/12/2022
    Detalle: Funcion que realiza la verificacion de el estado en mora de un contrato.
*/

exports.valorMensual = (subcontrato) => {
    const valorMensual = (subcontrato.valor / subcontrato.cuotas).toFixed(2)
    return valorMensual
},
exports.estadoMora = (subcontrato, pagos,) => {
    // segundos = milisegundos/1000
    // minutos = segundos/60
    // horas = minutos/60
    // Días = horas/24
    // Meses = 30
    const date1 = new Date() / (1000*60*60*24*30)
    const date2 = new Date(subcontrato.fecha_inicio) / (1000*60*60*24*30)
    const meses = (date1 - date2).toFixed(0)
    const valorContractual = meses * subcontrato.mensualidad
    return (valorContractual > pagos.recaudado ? true : false)
}