const conexion = require("../config/db")

module.exports = {

    async consultar(id) {
        const resultado = await conexion.query(`select novedad, fecha, detalle, usuario 
        from novedad_servicio
        where servicio = $1
        order by fecha asc;`, [id]);
        return resultado.rows;
    },
    async crear(servicio, novedad, detalle, usuario) {
        const resultado = await conexion.query(`INSERT INTO public.novedad_servicio(servicio, novedad, detalle, usuario) 
        VALUES ($1, $2, $3, $4);`, [servicio, novedad, detalle, usuario]);
        return resultado.rowCount;
    },
    async modificar(secuencia, detalle, usuario) {
        const resultado = await conexion.query(`UPDATE public.novedad_servicio 
        SET detalle= $2, usuario = $3 
        WHERE secuencia=$1;`, [secuencia, detalle, usuario]);
        return resultado.rowCount;
    },
    async eliminar(secuencia) {
        const resultado = await conexion.query(`DELETE FROM public.novedad_servicio  
        WHERE secuencia=$1;`, [secuencia]);
        return resultado.rowCount;
    }
} 