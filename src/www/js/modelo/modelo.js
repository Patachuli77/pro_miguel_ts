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
        console.log(callback)
        this.idb.insertar(objeto, callback)
    }
    listar(callback){
        this.idb.listar(callback)
    }
}