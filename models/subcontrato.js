const conexion = require("../config/db");


module.exports = {
    async consultar() {
        const resultados = await conexion.query(`select * from subcontrato`);
        return resultados.rows;
    },
    // Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
    async consultarPorCliente(cliente) {
        const resultados = await conexion.query('select * from subcontrato where cliente = $1', [cliente]);
        return resultados.rows;
    },
    async consultarPorId(id) {
        const resultados = await conexion.query(`select * from subcontrato where id = $1`, [id]);
        return (resultados.rows.length > 0 ? resultados.rows[0] : false);
    },

    async crear(cliente, subcontrato) {
        const { id, fecha_inicio, estado, plan, valor, soporte,
            cuotas, codigo, correo, direccion, ciudad, grado, celular, telefono,
            dependencia, observaciones, valor_total, adicional, mascota, anticipado } = subcontrato
        const { documento } = cliente
        const resultados = await conexion.query(`insert into subcontrato (id, cliente, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado) 
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`,
            [id, documento, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado])
        return resultados.rowCount;
    },

    async modificarValorId(id, valor) {
        const resultados = await conexion.query("update subcontrato set valor = $2 where id = $1", [id, valor]);
        return resultados.rows;
    },
    async modificarValorCliente(cliente, valor) {
        const resultados = await conexion.query(`update subcontrato set valor = $2 where cliente = $1`, [cliente, valor]);
        return resultados.rows;
    },
    async modificarEstadoId(id, estado) {
        const resultados = await conexion.query(`update subcontrato set estado = $2 where id = $1`, [id, estado]);
        return resultados.rows;
    },
    // Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
    async modificar(subcontrato) {
        const { id, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad,
            grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado } = subcontrato
        const resultados = await conexion.query(`UPDATE subcontrato 
        SET 
        fecha_inicio = $2,
        estado       = $3,
        plan         = $4,
        valor        = $5,
        soporte      = $6,
        cuotas       = $7,
        codigo       = $8,
        correo       = $9,
        direccion    = $10,
        ciudad       = $11,
        grado        = $12,
        celular      = $13,
        telefono     = $14,
        dependencia  = $15,
        observaciones= $16,
        valor_total  = $17,
        adicional    = $18,
        mascota      = $19,
        anticipado   = $20
        WHERE id = $1`, [id, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad,
            grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado])
        return resultados.rowCount;
    },
    // Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
    async modificarEstadoCliente(cliente, estado) {
        const resultados = await conexion.query(`update subcontrato set estado = $2 where cliente = $1`, [cliente, estado]);
        return resultados.rows;
    },
    async consultarPorClienteActivo(cliente) {
        const resultados = await conexion.query("select * from subcontrato where cliente = $1 and  estado = true", [cliente]);
        return (resultados.rows.length > 0 ? resultados.rows[0] : false);
    },
}