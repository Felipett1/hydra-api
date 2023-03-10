const conexion = require("../config/db")

module.exports = {

    async consultarContrato(id) {
        const resultado = await conexion.query(`select a.documento, a.nombre_completo, c.estado, a.celular, a.telefono, s.secuencia, s.fecha_inicial, s.tipo_servicio, s.detalle_inicial
        from servicio s, contrato c, cliente a where s.contrato = c.id and c.cliente = a.documento and c.id = $1`,  [id]);
        return resultado.rows;
    },
    async consultarDocumento(documento) {
        const resultado = await conexion.query(`select c.id, a.documento, a.nombre_completo, c.estado, a.celular, a.telefono, s.secuencia, s.fecha_inicial, s.tipo_servicio, s.detalle_inicial
        from servicio s, contrato c, cliente a where s.contrato = c.id and c.cliente = a.documento and a.documento = $1`,  [documento]);
        return resultado.rows;
    },

    async crear(contrato, tipo_servicio, fecha_inicial, detalle_inicial) {
        const resultado = await conexion.query(`INSERT INTO servicio(contrato, tipo_servicio, fecha_inicial, detalle_inicial)
        VALUES ($1, $2, $3, $4)`,  [contrato, tipo_servicio, fecha_inicial, detalle_inicial]);
        return resultado.rows;
        //console.log(resultado)
    },
} 




