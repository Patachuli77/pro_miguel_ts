'use strict'	//Activo el modo estricto

class Controlador{
	constructor(){
		this.modelo = new Modelo(this)
		window.onload = this.iniciar.bind(this)
	}
	iniciar(){
		this.vista = new Vista(this, document.getElementById('divVista'))
	}
	insertar(objeto){
		this.modelo.insertar(objeto, this.insertarOK.bind(this))
	}
	insertarOK(){
		console.log('La inserción ha ido bien')
	}
}

class Vista{
	constructor(controlador, base){
		this.controlador = controlador
		this.base = base
		this.btn1 = base.getElementsByTagName('button')[0]

		this.btn1.onclick = this.pulsar1.bind(this)
	}
	pulsar1(){
		//Leer y validar los datos del formulario
		let nombre = 'Triqui'
		//Construyo el objeto
		let objeto = new Monstruo(nombre)
		this.controlador.insertar(objeto)
	}

}

class Modelo{
	constructor(controlador){
		this.controlador = controlador
		this.idb = new Idb()
	}
	insertar(objeto, callback){
		this.idb.insertar(objeto, callback)
	}
}

class Monstruo{
	constructor(nombre){
		this.nombre = nombre
	}
}

class Idb{
	constructor(){
		const peticion = indexedDB.open('bd1', 2)
		peticion.onerror = evento => {throw 'Error al conectar indexedDB'}
		peticion.onupgradeneeded = evento => {
			this.conexion = evento.target.result
			this.crear()
        	}
		peticion.onsuccess = evento => {this.conexion = evento.target.result}
	}
	crear(){
		const tabla = this.conexion.createObjectStore('tabla1', {autoIncrement: true})
	}
	insertar(objeto, callback){
		const transaccion = this.conexion.transaction(['tabla1'], 'readwrite')
		transaccion.onerror = evento => {throw 'Error al insertar'}
		const tabla = transaccion.objectStore('tabla1')
		const peticion = tabla.add(objeto)
  		peticion.onsuccess = callback
	}
}

new Controlador()