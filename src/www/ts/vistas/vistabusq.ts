/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Vista} from './vista.js'
export class VistaBusq extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		
		this.btnListar = this.div.getElementsByTagName('button')[0]
		this.btnListar.onclick = this.buscar.bind(this)
		
	}
	/**
	 * Metodo que llama al controlador para buscar 
	 */
	buscar(){

		this.texto= this.div.getElementsByTagName('input')[0]
		
		this.controlador.buscar(this.texto.value)
		this.limpiar()
	}
	/**
	 * Metodo que limpia el buscador despues de la busqueda
	 */
	limpiar(){
		this.texto.value=''
	}

}