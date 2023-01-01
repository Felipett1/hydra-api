const conexion = require("../config/db");

module.exports = {

    async consultar(inicio, fin) {
        const resultados = await conexion.query('select * from pago where fecha > $1  and fecha < $2', [inicio, fin]);
        return resultados.rows;
    },
    async consultarContrato(contrato, inicio, fin) {
        const resultados = await conexion.query("select * from pago where contrato = $1 and (fecha > $2 and fecha < $3)", [contrato, inicio, fin]);
        return resultados.rows;
    },
    async consultarCliente(cliente, inicio, fin) {
        const resultados = await conexion.query("Select p.secuencia, p.contrato, p.fecha, p.periodo, p.valor from pago p, contrato c where p.contrato = c.id and c.cliente = $1 and (fecha > $2  and fecha < $3)", [cliente, inicio, fin]);
        return resultados.rows;
    },
}