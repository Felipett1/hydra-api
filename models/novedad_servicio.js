const conexion = require("../config/db")

module.exports = {

    async consultar(id) {
        const resultado = await conexion.query(`select novedad, fecha, detalle 
        from novedad_servicio
        where servicio = $1
        order by fecha asc;`, [id]);
        return resultado.rows;
    },
    async crear(servicio, novedad, detalle) {
        const resultado = await conexion.query(`INSERT INTO public.novedad_servicio(servicio, novedad, detalle) 
        VALUES ($1, $2, $3);`, [servicio, novedad, detalle]);
        return resultado.rowCount;
    },
    async modificar(secuencia, detalle) {
        const resultado = await conexion.query(`UPDATE public.novedad_servicio 
        SET detalle= $2 
        WHERE secuencia=$1;`, [secuencia, detalle]);
        return resultado.rowCount;
    },
    async eliminar(secuencia) {
        const resultado = await conexion.query(`DELETE FROM public.novedad_servicio  
        WHERE secuencia=$1;`, [secuencia]);
        return resultado.rowCount;
    }
} 