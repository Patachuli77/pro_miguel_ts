/**
 * @file Contiene el modelo de la aplicaion
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Idb} from "../servicio/idb.js"


export class Modelo{
    constructor(controlador){
       this.controlador= controlador
       this.idb = new Idb()
	}
    /**
     * Metodo que llama al metodo de insertar del indexerdb
     * @param {object} objeto 
     * @param {funcion} callback 
     */
    insertar(objeto, callback){
        console.log(objeto)
        this.idb.insertar(objeto, callback)
    }/**
     * Metodo que llama al metodo listar del indexerdb
     * @param {funcion} callback 
     */
    listar(callback){
        this.idb.listar(callback)
    }
    /**
     * Metodo que llama al metodo buscar del indexerdb
     * @param {string} texto 
     * @param {funcion} callback 
     */
    buscar(texto, callback){
        this.idb.buscar(texto,callback)
    }
    /**
     * Metodo que llama al metodo consultar del indexerdb
     * @param {string} id 
     * @param {funcion} callback 
     */
    consultar(id, callback){
        this.idb.consultar(id,callback)
    }
    /**
     * Metodo que llama al metodo eliminar del indexerdb
     * @param {string} id 
     * @param {funcion} callback 
     */
    eliminar(id, callback){
        this.idb.borrar(id,callback)
    }/**
     * Metodo que llama al metodo guardar del indexerdb
     * @param {string} id 
     * @param {object} ropa 
     * @param {funcion} callback 
     */
    guardar(id,ropa,callback){
        this.idb.guardar(id,ropa,callback)
    }
}