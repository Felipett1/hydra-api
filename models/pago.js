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
    async cargar(subcontrato, fecha, periodo, valor, anticipado, mes) {
        const resultados = await conexion.query(`insert into pago (subcontrato, fecha, periodo, valor, anticipado,mes)
         values ($1, $2, $3, $4, $5,$6)` , [subcontrato, fecha, periodo, valor, anticipado, mes]);
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
    },
    async consultarPagoTiempo(fechaInicio, fechaFin) {
        const resultado = await conexion.query(
            `SELECT to_char(p.fecha,'DD/MM/YYYY') as "Fecha", c.documento as "Documento",
            c.nombre_completo as "Nombre", p.subcontrato as "Subcontrato", 
            p.periodo as "Periodo", p.valor as "Total"
            FROM pago p, subcontrato s, cliente c
            WHERE p.subcontrato = s.id
            AND s.cliente = c.documento
            AND fecha between $1 AND $2
            order by documento, periodo asc`
            , [fechaInicio, fechaFin]);
        return resultado.rows;
    },
    async consultarPagoConAnticipado (subcontrato){
        const resultados = await conexion.query(`select * from pago where subcontrato = $1 and anticipado is not null`, [subcontrato]);
        return resultados.rows[0];

    }
}