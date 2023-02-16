/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */

import {Modelo} from '../modelo/modelo.js'

import {VistaList} from '../vistas/vistalista.js'
import {VistaAlta} from '../vistas/vistaalta.js'
import{VistaEdit} from '../vistas/vistaedit.js'
import {VistaHead} from '../vistas/vistahead.js'
import { VistaCons } from '../vistas/vistacons.js'
import{VistaBusq} from '../vistas/vistabusq.js'

export class Controlador{
	public modelo: Modelo;
	private head: HTMLHeadElement;
	

	private vistaHead: VistaHead;
	private mainList: VistaList;
	private mainEdit: VistaEdit;
	private mainAlta: VistaAlta;
	private mainCons: VistaCons;
	private mainBusq: VistaBusq;
	/**
	 * Constructor de la clase
	 */
	constructor(){
		window.onload = this.iniciar.bind(this)
	}
	/**
	 * Inicializa la aplicaion
	 */
	iniciar(){
		this.modelo = new Modelo(this)
		
		this.head = document.getElementsByTagName('header')[0]
	
		this.vistaHead = new VistaHead(this,this.head)
		this.mainList = new VistaList(this, <HTMLDivElement>document.getElementById('listado'))
		this.mainEdit = new VistaEdit(this, <HTMLDivElement>document.getElementById('edicion'))
		this.mainAlta = new VistaAlta(this, <HTMLDivElement>document.getElementById('alta'))
        this.mainCons = new VistaCons(this, <HTMLDivElement>document.getElementById('consulta'))
		this.mainBusq = new VistaBusq(this, <HTMLDivElement>document.getElementById('busqueda'))
		
		
		this.mainList.mostrar(true)
	}	
	/**
	 * Metodo que muestra la vista de listar
	 */
	pulsarHeadList(){
		this.mainList.mostrar(true)
		
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(false)
		this.mainBusq.mostrar(false)
	}
	/**
	 * Metodo que muesta la vista de la edicion
	 */
	pulsarHeadEdit(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(true)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(false)
		this.mainBusq.mostrar(false)
	}
	/**
	 * Metodo que muestra la vista del alta
	 */
	pulsarHeadAlta(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(true)
        this.mainCons.mostrar(false)
		this.mainBusq.mostrar(false)
	}
    /**
	 * Metodo que muestra la vista de la consulta de datos
	 */
	pulsarHeadCons(){
		
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(true)
		this.mainBusq.mostrar(false)
		
	}
	/**
	 * Metodo que muestra la vista de buscar
	 */
	pulsarBuscar(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(false)
		this.mainBusq.mostrar(true)
	}
	/**
	 * Metodo que llama al modelo para insertar datos en el indexed
	 * @param {Object} objeto 
	 */
	insertar(objeto){
		this.modelo.insertar(objeto, this.insertarOK.bind(this))	
	}
	/**
	 * Callback del metodo insertar
	 */
	insertarOK(){
		console.log('La inserción ha ido bien')
	}

	/**
	 * Metodo que llama al modelo para listar
	 */
	listar(){
		this.modelo.listar(this.listarOK.bind(this))	
	}
	/**
	 * Callback del metodo listar, llama a la vista para visualizar la lista de objetos
	 * @param {array} lista 
	 */
	listarOK(lista){
		this.mainList.generarLista(lista)
	}
	/**
	 * Metodo que llama al modelo para consultar los datos de un articulo
	 * @param {string} id 
	 */
	pulsarRopa(id){
		this.modelo.consultar(id,this.consultaPrenda.bind(this))
	}/**
	 * Metodo que visualiza los datos de la consulta en la vista editar y en la vista consulta
	 * @param {Object} ropa 
	 */
	consultaPrenda(ropa){
		this.mainEdit.mostrarDatos(ropa)
		this.mainCons.mostrarDatos(ropa)
		this.pulsarHeadCons()
	}
	/**
	 * Metodo que llama al modelo para buscar por el nombre a un objeto
	 * @param {string} texto 
	 */
	buscar(texto){
		this.modelo.buscar(texto,this.listarOK.bind(this))	
		this.pulsarHeadList()
	}
	/**
	 * Metodo que llama al modelo para eliminar un objeto
	 * @param {string} id 
	 */
	borrado(id){
		this.modelo.eliminar(id,this.listar.bind(this))
		this.pulsarHeadList()
	}
	/**
	 * Metodo que llama al modelo para guardar un cambio a un objeto
	 * @param {string} id 
	 * @param {object} ropa 
	 */
	guardar(id,ropa){
		this.modelo.guardar(id,ropa,this.listar.bind(this))
		this.pulsarHeadList()
	}
}

const app = new Controlador()