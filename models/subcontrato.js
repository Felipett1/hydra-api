const conexion = require("../config/db");


module.exports = {
    async consultar() {
        const resultados = await conexion.query(`select * from subcontrato`);
        return resultados.rows;
    },
    // Julian Calderon 2023/02/26 Sustitucion de la tabla contrato a subcontrato
    async consultarPorCliente(cliente) {
        const resultados = await conexion.query('select * from subcontrato where cliente = $1 ORDER BY estado DESC', [cliente]);
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
        return (resultados.rows.length > 0 ? resultados.rows : false);
    },
    async consultarPorIdActivo(id, cliente) {
        const resultados = await conexion.query(`select * from subcontrato where id = $1 and cliente = $2 and estado = true`, [id, cliente]);
        return (resultados.rows.length > 0 ? resultados.rows : false);
    },

    async consultaReporteGeneral() {
        const resultados = await conexion.query(
            `SELECT 
                sc.id as "# Subcontrato",
                c.documento as "Documento",
                c.nombre_completo as "Nombre completo",
                sc.valor_total as "Valor",
                COALESCE(servicios_abiertos, 0) as "Servicios Abiertos",
                COALESCE(servicios_cerrados, 0) as "Servicios Cerrados",
                COALESCE(cuotas_pagas, 0) as "Cuotas pagas",
                sc.cuotas as "Cuotas totales"
            FROM 
                subcontrato sc
            JOIN 
                cliente c ON sc.cliente = c.documento
            LEFT JOIN 
                (SELECT 
                    subcontrato, 
                    SUM(CASE WHEN cerrado = false THEN 1 ELSE 0 END) AS servicios_abiertos,
                    SUM(CASE WHEN cerrado = true THEN 1 ELSE 0 END) AS servicios_cerrados
                FROM 
                    servicio 
                GROUP BY 
                    subcontrato) s ON sc.id = s.subcontrato
            LEFT JOIN 
                (SELECT 
                    subcontrato, 
                    COUNT(periodo) AS cuotas_pagas
                FROM 
                    pago 
                GROUP BY 
                    subcontrato) p ON sc.id = p.subcontrato
            ORDER BY 
                sc.id;`);
        return (resultados.rows.length > 0 ? resultados.rows : false);
    }

}