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
	consultar(id, callback){

		const objectStore = this.conexion.transaction("tabla1","readonly").objectStore("tabla1");
		this.result 
		const cursor1 = objectStore.openCursor()
		cursor1.onsuccess = (evento) => {
			const cursor = evento.target.result;
			if (cursor) {
				let ropa = cursor.value
				if (ropa.id == id){
					this.result=ropa
                }
				    cursor.continue()
			} 
            else {
				callback(this.result)
			}
		}  
    }
	borrar(id, callback){
		const datos = this.conexion.transaction('tabla1','readwrite')		
		let request = datos.objectStore("tabla1").delete(id);
        request.onsuccess=(event) => {
            
            callback()
        }

	}
	guardar(id,ropa,callback){
		const objectStore =this.conexion.transaction ('tabla1', 'readwrite').objectStore('tabla1')
        const peticion = objectStore.get(parseInt(id))
        
        peticion.onerror=(event) =>{
            console.log('Falló la lectura')
        }
        peticion.onsuccess=(event) =>{
            const data = event.target.result
            console.log('Leído', data)
           
            data.nombre=ropa.nombre
            data.talla=ropa.talla
            data.diaComprado=ropa.diaComprado
            data.descripcion=ropa.descripcion
            data.tipo=ropa.tipo
            data.estacion=ropa.estacion
            

            const peticion2 = objectStore.put(data)
            this.listar()
            peticion2.onerror =(event) =>{
                console.log('No se pudo actualizar')
                
                callback()
            }
            peticion2.onsuccess =(event) => {
                console.log('Se actualizó')
                callback()
            }
        }
	}
}

