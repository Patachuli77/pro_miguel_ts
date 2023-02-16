/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Vista} from './vista.js'
import {Controlador} from '../controlador/app.js'
export class VistaCons extends Vista{
	public controlador: Controlador;
	public div: HTMLDivElement;
	private btnEditar: HTMLElement;
	private btnVolver: HTMLElement;
	constructor(controlador:Controlador, div:HTMLDivElement){
		super(div)
		this.controlador = controlador
		
		this.btnEditar = this.div.getElementsByTagName('a')[1]
		this.btnEditar.onclick = this.modificar.bind(this)

		this.btnVolver = this.div.getElementsByTagName('a')[0]
		this.btnVolver.onclick = this.volver.bind(this)
	}/**
	 * Metodo que mete los datos del objeto dentro de su sitio en la vista para poder visualizarlos
	 * @param {object} ropa 
	 */
	mostrarDatos(ropa:any){
		let cadena = ''
		if(ropa.estacion[0]==true){
			cadena+='Primavera, '}
		if(ropa.estacion[1]==true){
			cadena+='Verano, '}
		if(ropa.estacion[2]==true){
			cadena+='Otoño, '}
		if(ropa.estacion[3]==true){
			cadena+='Invierno, '}
		cadena = cadena.substring(0, cadena.length - 2)


		let nombre =this.div.getElementsByTagName('h3')[0]
		let talla=this.div.getElementsByTagName('h3')[1]
		let dia=this.div.getElementsByTagName('h3')[2]
		let descripcion=this.div.getElementsByTagName('p')[0]
		let tipo=this.div.getElementsByTagName('h3')[3]
		let estacion=this.div.getElementsByTagName('h3')[4]
		console.log(ropa.estacion[0])
		
		nombre.innerHTML = ropa.nombre
		talla.innerHTML = ropa.talla
		dia.innerHTML = ropa.diaComprado
		descripcion.innerHTML = ropa.descripcion
		tipo.innerHTML= ropa.tipo
		estacion.innerHTML= cadena
	}/**
	 * Metodo para cambiar a la vista de editar
	 */
	modificar(){
		this.controlador.pulsarHeadEdit()
	}/**
	 * Metodo para volver a la vista principal
	 */
	volver(){
		this.controlador.pulsarHeadList()
	}
}
