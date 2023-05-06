const conexion = require("../config/db");

module.exports = {

    async consultar(inicio, fin) {
        const resultados = await conexion.query('select * from pago where fecha > $1 and fecha < $2', [inicio, fin]);
        return resultados.rows;
    },
    async consultarSubContrato(subcontrato, inicio, fin) {
        const resultados = await conexion.query("select * from pago where subcontrato = $1 and (fecha > $2 and fecha < $3)", [subcontrato, inicio, fin]);
        return resultados.rows;
    },
    async consultarCliente(cliente, inicio, fin) {
        const resultados = await conexion.query("Select p.* from pago p, subcontrato s where p.subcontrato = s.id and c.cliente = $1 and (fecha > $2  and fecha < $3)", [cliente, inicio, fin]);
        return resultados.rows;
    },
    async cargar(subcontrato, fecha, periodo, valor, anticipado) {
        const resultados = await conexion.query(`insert into pago (subcontrato, fecha, periodo, valor, anticipado)
         values ($1, $2, $3, $4, $5)` , [subcontrato, fecha, periodo, valor, anticipado]);
        return resultados.rows;
    },
    async modificarPago(valor, secuencia) {
        const resultados = await conexion.query(`update pago 
        set valor  = $1
        where secuencia = $2` , [valor, secuencia]);
        return resultados.rows;
    },
    // Julian Calderon, 13/01/2022, se realiza la consulta del subcontrato a nivel global
    async consultarSubContratoGlobal(subcontrato) {
        const resultados = await conexion.query(`select count (*) as periodos, sum(valor) as recaudado from pago where subcontrato = $1`, [subcontrato]);
        return resultados.rows[0];
    },
    //
    async consultarSubContratoDetalle(subcontrato) {
        const resultados = await conexion.query(`select * from pago where subcontrato = $1`, [subcontrato]);
        return (resultados.rows.length > 0 ? resultados.rows : false);
    }
}