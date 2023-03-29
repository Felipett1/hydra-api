const conexion = require("../config/db")

module.exports = {

    //Consultar beneficiario por contrato
    //Julian Calderon   2023/02/26 Modificacion de contrato por subcontrato
    async consultar(subcontrato) {
        const resultado = await conexion.query(`select * from beneficiario where subcontrato = $1`,
            [subcontrato]);
        console.log(subcontrato)
        return resultado.rows;
    },
    //Julian Calderon   2023/01/10 Creacion de nuevo beneficiario
    //Julian Calderon   2023/02/26 Modificacion de contrato por subcontrato y actualizacion de tabla
    async crear(subcontrato, beneficiario) {
        const { nombre, edad, parentesco, adicional, contacto, emoji, estado } = beneficiario
        const { id } = subcontrato
        const resultado = await conexion.query(`INSERT INTO beneficiario(
            subcontrato, nombre, edad, parentesco, adicional, contacto, emoji, estado)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [id, nombre, edad, parentesco, adicional, contacto, emoji, estado])
        return resultado.rowCount;
    },
    //Julian Calderon   2023/01/10 Creacion funcion modificacion de beneficiario
    async modificar(beneficiario) {
        const { secuencia, nombre, edad, parentesco, adicional, contacto, emoji, estado } = beneficiario
        const resultado = await conexion.query(`update beneficiario set
        nombre = $2, 
        edad = $3, 
        parentesco = $4, 
        adicional = $5, 
        contacto = $6, 
        emoji = $7,
        estado = $8
        where secuencia = $1`, [secuencia, nombre, edad, parentesco, adicional, contacto, emoji, estado]);
        return resultado.rows;
    },
    //Julian Calderon   2023/01/10 Creacion modificacion de marquilla de un beneficiario 
    //Julian Calderon   2023/02/26 Reemplaza de marquilla por emoji
    async modificarEmoji(secuencia, emoji) {
        const resultado = await conexion.query(`update beneficiario set 
        emoji = $2
        where secuencia = $1`,
            [secuencia, emoji]);
        return resultado.rows;
    },
    //Julian Calderon   2023/01/10 Creacion eliminar beneficiario
    async cambiarEstado(secuencia, estado) {
        const resultados = await conexion.query(`update from beneficiario set estado = $2 
        where secuencia = $1` , [secuencia, estado]);
        return resultados.rows;
    },

    async consultarPorSecuencia(secuencia) {
        const resultados = await conexion.query(`select * from beneficiario where secuencia = $1`, [secuencia]);
        return resultados.rows;
    },
} 