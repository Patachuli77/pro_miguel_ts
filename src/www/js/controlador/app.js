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


		
		
		this.vistaHead = new VistaHead(this,this.head)
		this.mainList = new VistaList(this, this.mainList)
		this.mainEdit = new VistaEdit(this, this.mainEdit)
		this.mainAlta = new VistaAlta(this,this.mainAlta)
        this.mainCons = new VistaCons(this, this.mainCons)
		
		
		


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
	}
	/**
		Atención a la pulsación del enlace a la edicion
	**/
	pulsarHeadEdit(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(true)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(false)
	}
	/**
		Atención a la pulsación del enlace a el alta
	**/
	pulsarHeadAlta(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(true)
        this.mainCons.mostrar(false)
	}
    /**
		Atención a la pulsación del enlace a la consulta
	**/
	pulsarHeadCons(){
		this.mainList.mostrar(false)
		this.mainEdit.mostrar(false)
		this.mainAlta.mostrar(false)
        this.mainCons.mostrar(true)
	}
	insertar(objeto){
		this.modelo.insertar(objeto, this.insertarOK.bind(this))	
	}
	insertarOK(){
		console.log('La inserción ha ido bien')
	}

	listar(){
		this.modelo.listar(this.listarOK.bind(this))	
	}
	listarOK(lista){
		this.mainList.generarLista(lista)
	}
}

const app = new Controlador()