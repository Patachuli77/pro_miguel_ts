/**
 * @file Contiene el controlador del idb
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */

export class Idb{
	public conexion: IDBDatabase;
	//public evento: any;
	public resultados: Array<any>;
	public result: object;
	public listado:Array<any>;
	constructor(){


		const peticion = indexedDB.open('bd1', 2)
		peticion.onerror = evento => {throw 'Error al conectar indexedDB'}
		peticion.onupgradeneeded = (evento:any) => {
			this.conexion = evento.target.result
			this.crear()
        	}
		peticion.onsuccess = (evento:any) => {this.conexion = evento.target.result}
	}/**
	 * Metodo que crea la tabla
	 */
	crear(){
		const tabla = this.conexion.createObjectStore('tabla1', {keyPath :'id'})
	}/**
	 * Metodo que inserta un objeto en el indexer
	 * @param {object} objeto 
	 * @param {funcion} callback 
	 */
	insertar(objeto, callback){
		const transaccion = this.conexion.transaction(['tabla1'], 'readwrite')
		transaccion.onerror = evento => {throw 'Error al insertar'}
		const tabla = transaccion.objectStore('tabla1')
		const peticion = tabla.add(objeto)
  		peticion.onsuccess = callback
	}/**
	 * Metodo que devuelve una lista de los objetos del indexer
	 * @param {fubncion} callback 
	 */
	listar(callback){
		const objectStore =this.conexion.transaction('tabla1', 'readonly').objectStore('tabla1')
			const peticion = objectStore.getAll()
			peticion.onsuccess=function(){
				let lista= peticion.result
				let listado=lista
				callback(listado)
			}
	}/**
	 * Metodo que devuelve una lista con los resultados de la busqueda de texto
	 * @param {string} texto 
	 * @param {funcion} callback 
	 */
	buscar(texto, callback){

		const objectStore = this.conexion.transaction("tabla1","readonly").objectStore("tabla1");
		this.resultados = []

		const cursor1 = objectStore.openCursor()
		cursor1.onsuccess = (evento:any) => {
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


	}/**
	 * Metodo que saca un objeto a partir de su id
	 * @param {string} id 
	 * @param {funcion} callback 
	 */
	consultar(id, callback){

		const objectStore = this.conexion.transaction("tabla1","readonly").objectStore("tabla1");
		this.result 
		const cursor1 = objectStore.openCursor()
		cursor1.onsuccess = (evento:any) => {
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
    }/**
	 * Metodo que borra un objeto a partir de su id
	 * @param {string} id 
	 * @param {funcion} callback 
	 */
	borrar(id, callback){
		const datos = this.conexion.transaction('tabla1','readwrite')		
		let request = datos.objectStore("tabla1").delete(id);
        request.onsuccess=(event) => {
            
            callback()
        }

	}
	/**
	 * Metodo que guarda los cambios a un objeto a traves de su id
	 * @param {string} id 
	 * @param {object} ropa 
	 * @param {funcion} callback 
	 */
	guardar(id,ropa,callback){
		const objectStore =this.conexion.transaction ('tabla1', 'readwrite').objectStore('tabla1')
        const peticion = objectStore.get(parseInt(id))
        
        peticion.onerror=(event) =>{
            console.log('Falló la lectura')
        }
        peticion.onsuccess=(event:any) =>{
            const data = event.target.result
            console.log('Leído', data)
           
            data.nombre=ropa.nombre
            data.talla=ropa.talla
            data.diaComprado=ropa.diaComprado
            data.descripcion=ropa.descripcion
            data.tipo=ropa.tipo
            data.estacion=ropa.estacion
            

            const peticion2 = objectStore.put(data)
            //this.listar()
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

