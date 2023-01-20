import {Vista} from './vista.js'
export class VistaCons extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		
		this.btnEditar = this.div.getElementsByTagName('a')[1]
		this.btnEditar.onclick = this.modificar.bind(this)
	}
	mostrarDatos(ropa){
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
	}
	modificar(){
		this.controlador.pulsarHeadEdit()
	}
}
