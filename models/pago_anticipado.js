const conexion = require("../config/db")

module.exports = {
    async crear(pendiente, pendiente, pagado, descuento) {
        const resultado = await conexion.query(`INSERT INTO pago_anticipado(
            pendiente, pendiente, pagado, descuento)
            VALUES ($1, $2, $3, $4)`, [pendiente, pendiente, pagado, descuento]);
        return resultado.rows;
    }
} 