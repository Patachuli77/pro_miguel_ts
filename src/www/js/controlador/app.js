/**
	@file Contiene el controlador principal de la aplicación
	@author	Jorge Ortega <jorge77.ortega@gmail.com>
**/
import {Modelo} from '../modelo/modelo.js'

import {VistaList} from '../vistas/vistalista.js'
import {VistaAlta} from '../vistas/vistaalta.js'
import{VistaEdit} from '../vistas/vistaedit.js'
import {VistaHead} from '../vistas/vistahead.js'
import { VistaCons } from '../vistas/vistacons.js'
import{VistaBusq} from '../vistas/vistabusq.js'
/**
 * Controlador de la aplicación
 */
class Controlador{
	/**
		Constructor de la clase
		Llama al método iniciar al cargarse la página
	**/
	constructor(){
		window.onload = this.iniciar.bind(this)
	}
	/**
		Inicia la aplicación
		Crea el modelo y las vistas.
	**/
	iniciar(){
		this.modelo = new Modelo()
		
		this.head = document.getElementsByTagName('header')[0]
		this.mainList = document.getElementById('listado')
		this.mainEdit = document.getElementById('edicion')
		this.mainAlta = document.getElementById('alta')
        this.mainCons = document.getElementById('consulta')
		this.mainBusq = document.getElementById('busqueda')


		
		
		this.vistaHead = new VistaHead(this,this.head)
		this.mainList = new VistaList(this, this.mainList)
		this.mainEdit = new VistaEdit(this, this.mainEdit)
		this.mainAlta = new VistaAlta(this,this.mainAlta)
        this.mainCons = new VistaCons(this, this.mainCons)
		this.mainBusq = new VistaBusq(this, this.mainBusq)
		
		
		this.mainList.mostrar(true)
	}	
	/**
		Atención a la pulsación del enlace al listado
	**/
	pulsarHeadList(){
		this.mainList.mostrar(true)
		
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(false)
		this.mainBusq.mostrar(false)
	}
	/**
		Atención a la pulsación del enlace a la edicion
	**/
	pulsarHeadEdit(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(true)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(false)
		this.mainBusq.mostrar(false)
	}
	/**
		Atención a la pulsación del enlace a el alta
	**/
	pulsarHeadAlta(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(true)
        this.mainCons.mostrar(false)
		this.mainBusq.mostrar(false)
	}
    /**
		Atención a la pulsación del enlace a la consulta
	**/
	pulsarHeadCons(){
		
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(true)
		this.mainBusq.mostrar(false)
		
	}
	/**
		Atención a la pulsación del enlace a la consulta
	**/
	pulsarBuscar(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(false)
		this.mainBusq.mostrar(true)
	}
	/*INSERCION*/
	insertar(objeto){
		this.modelo.insertar(objeto, this.insertarOK.bind(this))	
	}
	insertarOK(){
		console.log('La inserción ha ido bien')
	}

	/*LISTADO*/
	listar(){
		this.modelo.listar(this.listarOK.bind(this))	
	}
	listarOK(lista){
		this.mainList.generarLista(lista)
	}
	pulsarRopa(id){
		this.modelo.consultar(id,this.consultaPrenda.bind(this))
	}
	consultaPrenda(ropa){
		this.mainEdit.mostrarDatos(ropa)
		this.mainCons.mostrarDatos(ropa)
		this.pulsarHeadCons()
	}
	/*BUSCAR*/
	buscar(texto){
		this.modelo.buscar(texto,this.listarOK.bind(this))	
		this.pulsarHeadList()
	}
	/*BORRAR*/
	borrado(id){
		this.modelo.eliminar(id,this.listar.bind(this))
		this.pulsarHeadList()
	}
	/*Guardar*/
	guardar(id,ropa){
		this.modelo.guardar(id,ropa,this.listar.bind(this))
		this.pulsarHeadList()
	}
}

const app = new Controlador()