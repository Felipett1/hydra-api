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
	DTL_EXITOSO: 'Operación realizada correctamente',
	COD_500: 500,
	DTL_AUTENTICACION_EXITOSO: 'Autenticación exitosa',
	DTL_AUTENTICACION_FALLIDO: 'Usuario o contraseña invalida',
	DTL_ERROR_CREACION_SUBCONTRATO: 'No es posible realizar la creación del subcontrato',
	DTL_ERROR_CREACION_SERVICIO: 'No es posible realizar la creación del servicio',
	DTL_ERROR_CIERRE_SERVICIO: 'No es posible realizar el cierre del servicio',
	//CONSTANTES ARCHIVO SALIDA CARGUE MASIVO
	APLICADO: 'APLICADO',
	APLICADO_PARCIALMENTE: 'APLICADO PARCIALMENTE',
	NO_APLICADO: 'NO APLICADO',
	SEPERADOR: '\n',
	TITULOS: 'ESTADO;DETALLE;DOCUMENTO;SUBCONTRATO;MES;AÑO;VALOR',
	SIN_REGISTROS: 'Archivo vacio sin registros',
	//CONSTANTES DE CORREO
	DE: 'info@coboy.com.co',
	ASUNTO_PR: '¡Se ha creado un nuevo pre registro!',
	ASUNTO_CS: '¡Se ha creado un nuevo servicio!',
	ASUNTO_ANS: '¡Recordatorio atención de servicio!',
	ASUNTO_SS: '¡Se ha creado una solicitud de servicio!',
	ASUNTO_RC: '¡Recordatorio renovación de subcontrato!',
	ASUNTO_RP: 'Solicitud de recuperación de contraseña',
	//Correo destino notificación de pre registro
	//PARA_PR: 'contacto@gottwesen.co',
	PARA_PR: 'felipe.trivino@coboy.com.co',
	PARA_RP: 'felipe.trivino@coboy.com.co',
	PARA_SS: 'felipe.trivino@coboy.com.co',
	//OBJETOS COMUNES
	estado: (codigo, mensaje, detalle) => ({ codigo, mensaje, detalle }),
	pagoGenerico: (periodo, valor, mes, estado, valorMes, mesN, anio) => ({ periodo, valor, mes, estado, valorMes, mesN, anio }),
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
		return this.estado(this.COD_ERROR, this.MSG_ERROR, error + "")
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
	},

	/*
	Autor: Felipe Triviño
	Fecha: 20/10/222
	Detalle: FUNCION QUE GENERA EL MENSAJE GENERICO DE RESPUESTA.
	*/
	respuestaGenerica() {
		return this.estado(this.COD_EXITOSO, this.MSG_EXITOSO, this.DTL_EXITOSO)
	},

	/*
	Autor: Felipe Triviño
	Fecha: 20/10/222
	Detalle: FUNCION QUE GENERA EL MENSAJE GENERICO DE RESPUESTA.
	*/
	respuestaExitosaElemento(resultado) {
		var estado = this.estado(this.COD_EXITOSO, this.MSG_EXITOSO, this.DTL_EXITOSO)
		var respuesta = {
			estado,
			resultado
		}
		return respuesta
	},

	obtenerMesAnio(fecha) {
		let mes = fecha.getMonth() + 1
		let anio = fecha.getFullYear()
		switch (mes) {
			case 1:
				return 'ENERO/' + anio
			case 2:
				return 'FEBRERO/' + anio
			case 3:
				return 'MARZO/' + anio
			case 4:
				return 'ABRIL/' + anio
			case 5:
				return 'MAYO/' + anio
			case 6:
				return 'JUNIO/' + anio
			case 7:
				return 'JULIO/' + anio
			case 8:
				return 'AGOSTO/' + anio
			case 9:
				return 'SEPTIEMBRE/' + anio
			case 10:
				return 'OCTUBRE/' + anio
			case 11:
				return 'NOVIEMBRE/' + anio
			case 12:
				return 'DICIEMBRE/' + anio
			default:
				return 'ERROR'
		}
	},

	agregarMes(fecha, diaSubContrato) {
		try {
			fecha = new Date(fecha)
			dia = fecha.getDate()
			mes = fecha.getMonth() + 1
			if (dia != diaSubContrato) {
				fecha.setDate(diaSubContrato)
				dia = diaSubContrato
			}
			if (dia <= 28) {
				//console.log('********')
				//console.log(fecha)
				fecha.setMonth(fecha.getMonth() + 1)
				//console.log(fecha.getMonth())
				//console.log(fecha)
			} else {
				fecha.setMonth(fecha.getMonth() + 1)
				dia = fecha.getDate()
				if (dia < 5) {
					if (mes != 2) {
						fecha.setDate(0)
					} else {
						fecha.setDate(0)
						fecha.setDate(diaSubContrato)
					}
				}
			}
			return fecha
		} catch (error) {
			console.log(error)
		}
	}
}