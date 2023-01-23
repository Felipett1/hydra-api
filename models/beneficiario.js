const conexion = require("../config/db")

module.exports = {

    //Consultar beneficiario por contrato
    async consultar(contrato) {
        const resultado = await conexion.query(`select * from beneficiario where contrato = $1`, 
        [contrato]);
        return resultado.rows;
    },
    //Julian Calderon   10/1/2023
    //Creacion de nuevo beneficiario
    async crear(contrato, nombre, edad, parentesco, adicional, telefono, marquilla) {
        const resultado = await conexion.query(`INSERT INTO beneficiario(
            contrato, nombre, edad, parentesco, adicional, telefono, marquilla)
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,  [contrato, nombre, edad, parentesco, adicional, telefono, marquilla]);
        return resultado.rows;
    },
    //Julian Calderon   10/1/2023
    //Modificacion de beneficiario
    async modificar(secuencia, nombre, edad, parentesco, adicional, telefono, marquilla) {
        const resultado = await conexion.query(`update beneficiario set
        nombre = $2, 
        edad = $3, 
        parentesco = $4, 
        adicional = $5, 
        telefono = $6, 
        marquilla = $7
        where secuencia = $1`,  
        [secuencia, nombre, edad, parentesco, adicional, telefono, marquilla]);
        return resultado.rows;
    },
    //Julian Calderon   11/1/2023
    //Modificacion de marquilla de un beneficiario 
    async modificarMarquilla(secuencia, marquilla) {
        const resultado = await conexion.query(`update beneficiario set 
        marquilla = $2
        where secuencia = $1`,  
        [secuencia, marquilla]);
        return resultado.rows;
    },
    //Julian Calderon   10/1/2023
    //eliminar beneficiario
    async eliminar(secuencia) {
        const resultados = await conexion.query(`delete from beneficiario 
        where secuencia = $1` , [secuencia]);
        return resultados.rows;
    },
    
    async consultarPorSecuencia(secuencia) {
        const resultados = await conexion.query(`select * from beneficiario where secuencia = $1`, [secuencia]);
        return resultados.rows;
    },
} 