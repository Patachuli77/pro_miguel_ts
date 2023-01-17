import { Idb } from "../controlador/idb.js"
/**
 * Modelo de datos 
 * 
 * 
 * 
 */ 

export class Modelo{
    constructor(controlador){
       this.controlador= controlador
       this.ibn = new Idb()
	}
    insertar(objeto, callback){
        console.log(objeto)
        this.idb.insertar(objeto, callback)
    }
}