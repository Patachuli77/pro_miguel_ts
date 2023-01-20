import {Vista} from './vista.js'
export class VistaBusq extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		
		this.btnListar = this.div.getElementsByTagName('button')[0]
		this.btnListar.onclick = this.buscar.bind(this)
		
	}
	buscar(){

		this.texto= this.div.getElementsByTagName('input')[0]
		
		this.controlador.buscar(this.texto.value)
		this.limpiar()
	}
	limpiar(){
		this.texto.value=''
	}

}