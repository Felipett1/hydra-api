const conexion = require("../config/db");


module.exports = {
    async consultar() {
        const resultados = await conexion.query(`select * from subcontrato`);
        return resultados.rows;
    },

    async consultarPorId(id) {    //CAST($1 AS TEXT) se puede usar si se requiere validar en pgadmin por el tipo
        const resultados = await conexion.query(`select * from subcontrato where id = $1`, [id]);
        return resultados.rows;
    },
     
    async crear(id, cliente, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado) {
        const resultados = await conexion.query(`insert into subcontrato (id, cliente, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado) 
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`, 
        [id, cliente, fecha_inicio, estado, plan, valor, soporte, cuotas, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones, valor_total, adicional, mascota, anticipado]);
        return resultados.rows;
    },

}