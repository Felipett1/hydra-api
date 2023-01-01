const conexion = require("../config/db")

module.exports = {

    async consultarPorId(id) {
        const resultado = await conexion.query(`select * from contrato where id = $1`,  [id]);
        return resultado.rows;
    },

    async crearNuevo(id, cliente, fecha_inicio, estado, plan, valor, soporte) {
        const resultado = await conexion.query(`INSERT INTO contrato(id, cliente, fecha_inicio, estado, plan, valor, soporte)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,  [id, cliente, fecha_inicio, estado, plan, valor, soporte]);
        return resultado.rows;
    }
} 

