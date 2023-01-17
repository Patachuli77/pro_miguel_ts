import {Vista} from './vista.js'
import {Ropa} from '../modelo/ropa.js'
export class VistaAlta extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		

		this.btnAceptarForm = this.div.getElementsByTagName('button')[2]

		
		//this.formImg = this.div.getElementsByTagName("input")[0]
		this.formNombre= this.div.getElementsByTagName("input")[1].value
		this.formTalla = this.div.getElementsByTagName("input")[2].value
		this.formDia = this.div.getElementsByTagName("input")[3].value
		//this.formDescripcion = this.div.getElementsByTagName("textArea")[4]





		this.btnAceptarForm.onclick = this.validar.bind(this)
	}
	validar(){
		let nombre = "primero"
		let talla = '3'
		let dia = "12/1/2023"

		let objeto = new Ropa(nombre,talla,dia)
		this.controlador.insertar(objeto)
	}
}