const conexion = require("../config/db")

module.exports = {
    async cargar(pendiente, porcentaje, pagado, descuento) {
        const resultado = await conexion.query(`INSERT INTO pago_anticipado(
            pendiente, porcentaje, pagado, descuento)
            VALUES ($1, $2, $3, $4) returning secuencia`, [pendiente, porcentaje, pagado, descuento]);
        return resultado.rows;
    },

    async actualizarSubContrato(estado,id){
        const resultado = await conexion.query(`update subcontrato set anticipado = $1
            where id = $2`, [estado,id]);
        return resultado.rows;
    }
} 