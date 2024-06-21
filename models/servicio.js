const conexion = require("../config/db")

module.exports = {

    async consultarSubContratoCerrado(id) {
        const resultado = await conexion.query(`select a.documento, a.nombre_completo, sc.estado, sc.celular, sc.telefono, s.secuencia, ts.nombre as tipo, s.detalle_final, s.contacto, s.cerrado    
        from servicio s, subcontrato sc, cliente a, tipo_servicio ts where s.subcontrato = sc.id and sc.cliente = a.documento and s.tipo_servicio = ts.id and sc.id = $1 and s.cerrado = true`, [id]);
        return resultado.rows;
    },
    //Consultar servicios activos de un subcontrato
    async consultarSubContratoActivo(id) {
        const resultado = await conexion.query(`select a.documento, a.nombre_completo, sc.estado, sc.celular, sc.telefono, s.secuencia, ts.nombre as tipo, ts.correo as correo, s.contacto, s.cerrado    
        from servicio s, subcontrato sc, cliente a, tipo_servicio ts where s.subcontrato = sc.id and sc.cliente = a.documento and s.tipo_servicio = ts.id and sc.id = $1  and s.cerrado = false`, [id]);
        return resultado.rows;
    },
    async consultarSubContratoGeneral(id) {
        const resultado = await conexion.query(`select a.documento, a.nombre_completo, sc.estado, sc.celular, sc.telefono, s.secuencia, ts.nombre as tipo, ts.correo as correo, s.contacto, s.cerrado    
        from servicio s, subcontrato sc, cliente a, tipo_servicio ts where s.subcontrato = sc.id and sc.cliente = a.documento and s.tipo_servicio = ts.id and sc.id = $1`, [id]);
        return resultado.rows;
    },
    async consultarDocumento(documento) {
        const resultado = await conexion.query(`select sc.id, a.documento, a.nombre_completo, sc.estado, sc.celular, sc.telefono, s.secuencia, s.tipo_servicio, s.contacto, s.cerrado
        from servicio s, subcontrato sc, cliente a where s.subcontrato = sc.id and sc.cliente = a.documento and a.documento = $1`, [documento]);
        return resultado.rows;
    },

    async crear(subcontrato, tipo_servicio, contacto) {
        const resultado = await conexion.query(`INSERT INTO servicio(subcontrato, tipo_servicio, contacto)
        VALUES ($1, $2, $3) RETURNING secuencia`, [subcontrato, tipo_servicio, contacto]);
        return resultado.rows;
    },

    async cerrarServicio(secuencia) {
        const resultados = await conexion.query(`update servicio set cerrado = true
        where secuencia = $1`, [secuencia]);
        return resultados.rowCount;
    },
    async consultarServicioTiempo(fechaInicio, fechaFin) {
        const resultado = await conexion.query(
            `SELECT s.secuencia as "ID", s.subcontrato as "Subcontrato",
            sc.cliente as "Documento",
            ts.nombre as "Servicio",
            ns.novedad,
            to_char(ns.fecha,'DD/MM/YYYY') as "fecha", 
            ns.detalle
            FROM servicio s, tipo_servicio ts, subcontrato sc, novedad_servicio ns
            WHERE s.tipo_servicio = ts.id 
            AND s.subcontrato = sc.id
            AND ns.servicio = s.secuencia
            AND ns.novedad IN ('Creación', 'Cierre')
            AND s.secuencia IN (select DISTINCT(servicio) 
                                from novedad_servicio
                                where
                                novedad IN ('Creación', 'Cierre')
                                and (fecha between $1 AND $2))
            order by 1 asc, 5 desc`
            , [fechaInicio, fechaFin]);
        return resultado.rows;
    }
} 