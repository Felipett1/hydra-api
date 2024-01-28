const conexion = require("../config/db")

module.exports = {

    async autenticar(usuario, clave) {
        const resultados = await conexion.query(`select autenticar($1, $2)`, [usuario, clave]);
        return resultados.rows[0].autenticar;
    },
    async modificarClave(clave, id) {
        const resultados = await conexion.query(`update usuario 
        set clave  = $1
        where id = $2` , [clave, id]);
        return resultados.rowCount;
    },

    async consulta(usuario) {
        const resultados = await conexion.query(`select usuario, rol from usuario where usuario = $1`, [usuario]);
        return resultados.rows[0];
    },

    async consultaGeneral() {
        const resultados = await conexion.query(`select * from usuario`);
        return resultados.rows;
    },
} 