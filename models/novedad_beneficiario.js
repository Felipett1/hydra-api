const conexion = require("../config/db");

module.exports = {
    async consultarUltimaNovedad(subcontrato, fecha) {
        const resultado = await conexion.query(
            `SELECT NB.beneficiario, NB.fecha, NB.accion, b.parentesco
            FROM NOVEDAD_BENEFICIARIO NB, BENEFICIARIO B, SUBCONTRATO S
            WHERE NB.beneficiario = b.secuencia 
            AND b.subcontrato = s.id
            AND s.id = $1
            AND nb.secuencia = (
                    SELECT secuencia
                FROM NOVEDAD_BENEFICIARIO
                WHERE beneficiario = NB.beneficiario
                AND fecha = (
                    SELECT MAX(FECHA)
                    FROM NOVEDAD_BENEFICIARIO
                    WHERE beneficiario = NB.beneficiario
                    AND fecha <= $2
                )
            )
            AND accion = true`, [subcontrato, fecha]);
        return (resultado.rows.length > 0 ? resultado.rows : false);
    },
}