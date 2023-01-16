import {Vista} from './vista.js'
export class VistaAlta extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		

		this.btnAceptarForm = this.div.getElementsByTagName('button')[2]

		
		this.formImg = this.div.getElementsByTagName("input")[0]
		this.formNombre= this.div.getElementsByTagName("input")[0]
		this.formTalla = this.div.getElementsByTagName("input")[0]
		this.formDia = this.div.getElementsByTagName("input")[0]
		this.formDescripcion = this.div.getElementsByTagName("input")[0]





		this.btnAceptarForm.onclick = this.validar
	}
	validar(){
		console.log("bien")

		
	}
}