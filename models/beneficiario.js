const conexion = require("../config/db")

module.exports = {

    async crear(contrato, nombre, edad, parentesco, adicional) {
        const resultado = await conexion.query(`INSERT INTO beneficiario(
            contrato, nombre, edad, parentesco, adicional)
            VALUES ($1, $2, $3, $4, $5);`,  [contrato, nombre, edad, parentesco, adicional]);
        return resultado.rows[0];
    },
} 