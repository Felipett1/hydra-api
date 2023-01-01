const conexion = require("../config/db");

module.exports = {

    async consultar() {
        const resultados = await conexion.query(`select * from contrato`);
        return resultados.rows;
    },
    async consultarPorCliente(cliente) {
        const resultados = await conexion.query("select * from contrato where cliente = $1", [cliente]);
        return resultados.rows;
    },
    async consultarPorId(id) {
        const resultados = await conexion.query("select * from contrato where id = $1", [id]);
        return resultados.rows;
    },
    async crear(id, cliente, fecha_inicio, estado, plan, valor, soporte) {
        const resultados = await conexion.query("insert into contrato (id, cliente, fecha_inicio, estado, plan, valor, soporte) values($1, $2, $3, $4, $5, $6, $7)", [id, cliente, fecha_inicio, estado, plan, valor, soporte]);
        return resultados.rows;
    },
    async modificarValorId(id, valor) {
        const resultados = await conexion.query("update contrato set valor = $2 where id = $1", [id, valor]);
        return resultados.rows;
    },
    async modificarValorCliente(cliente, valor) {
        const resultados = await conexion.query(`update contrato set valor = $2 where cliente = $1` , [cliente, valor]);
        return resultados.rows;
    },
    async modificarEstadoId(id, estado) {
        const resultados = await conexion.query(`update contrato set estado = $2 where id = $1` , [id, estado]);
        return resultados.rows;
    },
    async modificarEstadoCliente(cliente, estado) {
        const resultados = await conexion.query(`update contrato set estado = $2 where cliente = $1` , [cliente, estado]);
        return resultados.rows;
    },
    async eliminar(id) {
        const resultados = await conexion.query(`delete from contrato 
        where id = $1` , [id]);
        return resultados.rows;
    }
}