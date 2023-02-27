/*
Autor: Julian Camilo Calderon
    Fecha: 27/12/2022
    Detalle: Funcion que realiza el cambion de un contrato de estado activo (TRUE) a cerrado (FALSE).
*/

const conexion = require("../config/db");

module.exports = {
    //Julian Calderon 2023/02/26 Se modifica la funcion cierre_Contrato por cierre_subcontrato
    async modificarEstado(subcontrato, fecha_fin, causal) {
        const resultados = await conexion.query(`insert into cierre_contrato
        (subcontrato, fecha_fin, causal) values($1, $2, $3)`, [subcontrato, fecha_fin, causal]);
        return resultados.rowCount;
    },
}