module.exports = {
    //CONSTANTES GENERALES
    COD_EXITOSO: 0,
    MSG_EXITOSO: 'Transacción exitosa',
    COD_ERROR: 100,
    MSG_ERROR: 'No es posible procesar la transacción',
    DTL_SIN_RESULTADOS: 'La consulta no arrojo resultados',
    DTL_CON_RESULTADOS: 'Consulta realizada correctamente',
    DTL_CREAR_EXITOSO: 'Registro guardado correctamente',
    DTL_ACTUALIZAR_EXITOSO: 'Registro actualizado correctamente',
    DTL_ELIMINAR_EXITOSO: 'Registro eliminado correctamente',
    COD_500: 500,
    DTL_AUTENTICACION_EXITOSO: 'Autenticación exitosa',
    DTL_AUTENTICACION_FALLIDO: 'Usuario o contraseña invalida',

    //OBJETOS COMUNES
    estado: (codigo, mensaje, detalle) => ({ codigo, mensaje, detalle }),

    /*
    Autor: Felipe Triviño
    Fecha: 05/10/222
    Detalle: FUNCION QUE VALIDA SI LA CONSULTA GENERA RESULTADOS O NO 
    Y DE IGUAL FORMA MUESTRA UN MENSAJE DE RESPUESTA ACORDE A EL RESULTADO OBTENIDO.
    */
    respuestaConsulta(resultados) {
        if (resultados && resultados.length > 0) {
            var estado = this.estado(this.COD_EXITOSO, this.MSG_EXITOSO, this.DTL_CON_RESULTADOS)
            var respuesta = {
                estado,
                resultados
            }
            return respuesta
        } else {
            return this.estado(this.COD_EXITOSO, this.MSG_EXITOSO, this.DTL_SIN_RESULTADOS)
        }
    },

    /*
    Autor: Felipe Triviño
    Fecha: 05/10/222
    Detalle: FUNCION QUE GENERA EL MENSAJE GENERICO DE ERROR CUANDO EXISE UNA EXCEPCIÓN.
    */
    respuestaExcepcion(error) {
        return this.estado(this.COD_ERROR, this.MSG_ERROR, error)
    },

    /*
    Autor: Felipe Triviño
    Fecha: 05/10/222
    Detalle: FUNCION QUE GENERA EL MENSAJE GENERICO DE CREACIÓN.
    */
    respuestaCreacion() {
        return this.estado(this.COD_EXITOSO, this.MSG_EXITOSO, this.DTL_CREAR_EXITOSO)
    },

    /*
    Autor: Felipe Triviño
    Fecha: 05/10/222
    Detalle: FUNCION QUE GENERA EL MENSAJE GENERICO DE MODIFICACIÓN.
    */
    respuestaModificacion() {
        return this.estado(this.COD_EXITOSO, this.MSG_EXITOSO, this.DTL_ACTUALIZAR_EXITOSO)
    },

    /*
    Autor: Felipe Triviño
    Fecha: 05/10/222
    Detalle: FUNCION QUE GENERA EL MENSAJE GENERICO DE ELIMINAR.
    */
    respuestaEliminar() {
        return this.estado(this.COD_EXITOSO, this.MSG_EXITOSO, this.DTL_ELIMINAR_EXITOSO)
    }
}