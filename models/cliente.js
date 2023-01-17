const conexion = require("../config/db")

module.exports = {

    async crear(documento, nombre_completo, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones) {
        const resultado = await conexion.query(`INSERT INTO cliente(
            documento, nombre_completo, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`,  [documento, nombre_completo, codigo, correo, direccion, ciudad, grado, celular, telefono, dependencia, observaciones]);
        return resultado.rows[0];
        
    },
    }
