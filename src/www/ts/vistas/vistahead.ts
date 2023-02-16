/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Controlador} from '../controlador/app.js'
export class VistaHead{
	public controlador: Controlador;
	public head: HTMLHeadElement;
	public aListar: HTMLElement;
	public h1Alta: HTMLDivElement;
	public btnBuscar: HTMLDivElement;

	constructor(controlador:Controlador, head:HTMLHeadElement){
		this.controlador = controlador
		this.head = head
		
		this.aListar = this.head.getElementsByTagName('a')[0]
		this.h1Alta = this.head.getElementsByTagName('div')[1]

		this.btnBuscar = this.head.getElementsByTagName('div')[0]
		
		
		this.aListar.onclick = this.pulsarLista.bind(this)
		this.btnBuscar.onclick = this.pulsarBuscar.bind(this)
		
		this.h1Alta.onclick = this.pulsarAlta.bind(this)
      
	}/**
	 * Metodo que llama al controlador para cambiar la vista a listar
	 */
	pulsarLista(){
		this.controlador.pulsarHeadList()
		
	}/**
	 * Metodo que llama al controlador para cambiar la vista al alta
	 */
	pulsarAlta(){
		this.controlador.pulsarHeadAlta()
		
	}
	/**
	 * Metodo que llama al controlador para cambiar la vista a buscar
	 * 
	 */
	pulsarBuscar(){
		this.controlador.pulsarBuscar()
	}
}