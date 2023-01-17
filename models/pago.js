const conexion = require("../config/db");
const { modificarPago } = require("../controllers/pago");

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
    async cargar(contrato, fecha, periodo, valor) {
        const resultados = await conexion.query(`insert into pago (contrato, fecha, periodo, valor)
         values ($1, $2, $3, $4)` , [contrato, fecha, periodo, valor]);
        return resultados.rows;
    },
    async modificarPago(valor,secuencia) {
        const resultados = await conexion.query(`update pago 
        set valor  = $1
        where secuencia = $2` , [valor,secuencia]);
        return resultados.rows;
    },
}