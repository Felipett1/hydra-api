/*
Autor: Julian Camilo Calderon
    Fecha: 27/12/2022
    Detalle: Funcion que realiza el cambion de un contrato de estado activo (TRUE) a cerrado (FALSE).
*/

const conexion = require("../config/db");

module.exports = {
    //Julian Calderon 2023/02/26 Se modifica la funcion cierre_Contrato por cierre_subcontrato
    async modificarEstado(subcontrato, fecha_fin, causal) {
        const resultados = await conexion.query(`insert into cierre_subcontrato
        (subcontrato, fecha_fin, causal) values($1, $2, $3)`, [subcontrato, fecha_fin, causal]);
        return resultados.rowCount;
    },

    async consultarPorSubContrato(subcontrato) {
        const resultados = await conexion.query('select * from cierre_subcontrato where subcontrato = $1', [subcontrato]);
        return (resultados.rows.length > 0 ? resultados.rows[0] : false);
    },
}