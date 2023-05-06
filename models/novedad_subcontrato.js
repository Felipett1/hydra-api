const conexion = require("../config/db");

module.exports = {
    async consultarUltimaNovedad(subcontrato, fecha) {
        const resultado = await conexion.query(
            `SELECT * 
            FROM NOVEDAD_SUBCONTRATO 
        WHERE SUBCONTRATO = $1 
        AND fecha = (
           SELECT MAX (fecha)
            FROM NOVEDAD_SUBCONTRATO
            WHERE SUBCONTRATO = $1 
            AND FECHA <= $2
        )`, [subcontrato, fecha]);
        return (resultado.rows.length > 0 ? resultado.rows[0] : false);
    },
}