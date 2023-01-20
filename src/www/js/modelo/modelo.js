import {Idb} from "../servicio/idb.js"
/**
 * Modelo de datos 
 * 
 * 
 * 
 */ 

export class Modelo{
    constructor(controlador){
       this.controlador= controlador
       this.idb = new Idb()
	}
    insertar(objeto, callback){
        console.log(objeto)
        this.idb.insertar(objeto, callback)
    }
    listar(callback){
        this.idb.listar(callback)
    }/*El del buscador*/
    buscar(texto, callback){
        this.idb.buscar(texto,callback)
    }
    /*El de la consulta*/
    consultar(id, callback){
        this.idb.consultar(id,callback)
    }
    eliminar(id, callback){
        this.idb.borrar(id,callback)
    }
    guardar(id,ropa,callback){
        this.idb.guardar(id,ropa,callback)
    }
}