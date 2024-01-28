const conexion = require("../config/db")

module.exports = {

    async crear(cliente) {
        const resultado = await conexion.query(`INSERT INTO cliente(
            documento, nombre_completo)
            VALUES ($1, $2)`, [cliente.documento, cliente.nombre_completo]);
        return resultado.rowCount;

    },
    async modificar(cliente) {
        const resultado = await conexion.query(`UPDATE cliente 
        SET nombre_completo = $2 WHERE documento = $1`, [cliente.documento, cliente.nombre_completo]);
        return resultado.rowCount;

    },
    async consultarPorDocumento(documento) {
        const resultados = await conexion.query(`select * from cliente where documento = $1`, [documento]);
        return resultados.rows;
    },
}
