/*
Autor: Julian Camilo Calderon
    Fecha: 27/12/2022
    Detalle: Funcion que realiza el cambion de un contrato de estado activo (TRUE) a cerrado (FALSE).
*/

const conexion = require("../config/db");

module.exports = {
    /*
    async consultar() {
        const resultados = await conexion.query(`select * from contrato`);
        return resultados.rows;
    },*/
    async modificarEstado(contrato, fecha_fin, causal) {
        const resultados = await conexion.query(`insert into cierre_contrato
        (contrato, fecha_fin, causal) values($1, $2, $3)`, [contrato, fecha_fin, causal]);
        return resultados.rowCount;     //Valor de retorno 1 de verificacion para la condicional
    },
}