const conexion = require("../config/db")

module.exports = {

    async autenticar(usuario, clave) {
        const resultados = await conexion.query(`select autenticar($1, $2)`,  [usuario, clave]);
        return resultados.rows[0].autenticar;
    },
}