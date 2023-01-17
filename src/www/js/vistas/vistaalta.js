import {Vista} from './vista.js'
import {Ropa} from '../modelo/ropa.js'
export class VistaAlta extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		

		this.btnAceptarForm = this.div.getElementsByTagName('button')[2]

		
		//this.formImg = this.div.getElementsByTagName("input")[0]
		this.formNombre= this.div.getElementsByTagName("input")[1]
		this.formTalla = this.div.getElementsByTagName("input")[2]
		this.formDia = this.div.getElementsByTagName("input")[3]
		this.formDescripcion = this.div.getElementsByTagName("textArea")[0]
		this.formTipo = this.div.getElementsByTagName("select")[0]
		this.pri = this.div.getElementsByTagName("input")[4]
		this.ver = this.div.getElementsByTagName("input")[5]
		this.oto = this.div.getElementsByTagName("input")[6]
		this.inv = this.div.getElementsByTagName("input")[7]




		this.btnAceptarForm.onclick = this.validar.bind(this)
	}
	validar(){
		let nombre = this.formNombre.value
		let talla = this.formTalla.value
		let dia = this.formDia.value //Año mes dia
		let descripcion = this.formDescripcion.value
		let tipo = this.formTipo.value
		
		
		let prim = this.pri.value
		console.log(prim)

		
		/*let objeto = new Ropa(nombre,talla,dia)
		this.controlador.insertar(objeto)*/
	}
}