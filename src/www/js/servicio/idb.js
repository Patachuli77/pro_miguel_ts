/**
 * Controlador de idb
 * 
 */

export class Idb{
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
		const tabla = this.conexion.createObjectStore('tabla1', {keyPath :'id'})
	}
	insertar(objeto, callback){
		const transaccion = this.conexion.transaction(['tabla1'], 'readwrite')
		transaccion.onerror = evento => {throw 'Error al insertar'}
		const tabla = transaccion.objectStore('tabla1')
		const peticion = tabla.add(objeto)
  		peticion.onsuccess = callback
	}
	listar(callback){
		const objectStore =this.conexion.transaction('tabla1', 'readonly').objectStore('tabla1')
			const peticion = objectStore.getAll()
			peticion.onsuccess=function(){
				let lista= peticion.result
				this.listado=lista
				callback(this.listado)
			}
	}
	buscar(texto, callback){

		const objectStore = this.conexion.transaction("tabla1","readonly").objectStore("tabla1");
		this.resultados = []

		const cursor1 = objectStore.openCursor()
		cursor1.onsuccess = (evento) => {
			const cursor = evento.target.result;
			if (cursor) {
				let ropa = cursor.value
				if (ropa.nombre == texto){
					this.resultados.push(ropa)
                }
				    cursor.continue()
			} 
            else {
				console.log(this.resultados)
				callback(this.resultados)
			}
		}  


	}
}

