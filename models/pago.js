const conexion = require("../config/db")

module.exports = {

    async cargar(contrato, fecha, periodo, valor) {
        const resultados = await conexion.query(`insert into pago (contrato, fecha, periodo, valor)
         values ($1, $2, $3, $4)` , [contrato, fecha, periodo, valor]);
        return resultados.rows;
    }
}