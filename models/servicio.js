const conexion = require("../config/db")

module.exports = {

    async consultarSubContrato(id) {
        const resultado = await conexion.query(`select a.documento, a.nombre_completo, sc.estado, sc.celular, sc.telefono, s.secuencia, s.fecha_inicial, ts.nombre as tipo, s.detalle_inicial, s.fecha_final, s.detalle_final, s.contacto    
        from servicio s, subcontrato sc, cliente a, tipo_servicio ts where s.subcontrato = sc.id and sc.cliente = a.documento and s.tipo_servicio = ts.id and sc.id = $1`, [id]);
        return resultado.rows;
    },
    //Consultar servicios activos de un subcontrato
    async consultarSubContratoActivo(id) {
        const resultado = await conexion.query(`select a.documento, a.nombre_completo, sc.estado, sc.celular, sc.telefono, s.secuencia, s.fecha_inicial, ts.nombre as tipo, ts.correo as correo, s.detalle_inicial, s.fecha_final, s.detalle_final, s.contacto    
        from servicio s, subcontrato sc, cliente a, tipo_servicio ts where s.subcontrato = sc.id and sc.cliente = a.documento and s.tipo_servicio = ts.id and sc.id = $1 and s.fecha_final is null`, [id]);
        return resultado.rows;
    },
    async consultarDocumento(documento) {
        const resultado = await conexion.query(`select sc.id, a.documento, a.nombre_completo, sc.estado, sc.celular, sc.telefono, s.secuencia, s.fecha_inicial, s.tipo_servicio, s.detalle_inicial, s.contacto
        from servicio s, subcontrato sc, cliente a where s.subcontrato = sc.id and sc.cliente = a.documento and a.documento = $1`, [documento]);
        return resultado.rows;
    },

    async crear(subcontrato, tipo_servicio, fecha_inicial, detalle_inicial, contacto) {
        const resultado = await conexion.query(`INSERT INTO servicio(subcontrato, tipo_servicio, fecha_inicial, detalle_inicial, contacto)
        VALUES ($1, $2, $3, $4, $5)`, [subcontrato, tipo_servicio, fecha_inicial, detalle_inicial, contacto]);
        return resultado.rowCount;
        //console.log(resultado)
    },

    //Consulta para el reporte de servicios en un periodo de tiempo
    async consultarServicio(inicio, fin) {
        const resultados = await conexion.query("select s.*, t.nombre from servicio s, tipo_servicio t where s.tipo_servicio = t.id AND (s.fecha_inicial >= $1 and s.fecha_inicial <= $2)", [inicio, fin]);
        return resultados.rows;
    },

    async cerrarServicio(fecha_final, detalle_final, secuencia) {
        //console.log("Verificacion de resultados")
        const resultados = await conexion.query(`update servicio set fecha_final = $1 ,detalle_final = $2
        where secuencia  = $3
        `, [fecha_final, detalle_final, secuencia]);
        //console.log(resultados.rowCount)
        return resultados.rowCount;
    },
    async consultarServicioTiempo(fechaInicio, fechaFin) {
        const resultado = await conexion.query(
            `SELECT s.subcontrato as "Subcontrato", ts.nombre as "Servicio",
            to_char(s.fecha_inicial,'DD/MM/YYYY') as "Fecha inicial", s.detalle_inicial as "Detalle inicial",
            to_char(s.fecha_final,'DD/MM/YYYY') as "Fecha final", s.detalle_final as "Detalle final"
            FROM servicio s, tipo_servicio ts
            WHERE s.tipo_servicio = ts.id
            AND (fecha_inicial between $1 AND $2
            OR fecha_final between $1 AND $2)`
            , [fechaInicio, fechaFin]);
        return resultado.rows;
    }
} 