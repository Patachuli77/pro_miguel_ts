import {Vista} from './vista.js'
import {Ropa} from '../modelo/ropa.js'
export class VistaEdit extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		
		this.nombre =this.div.getElementsByTagName('input')[1]
		this.talla=this.div.getElementsByTagName('input')[2]
		this.dia=this.div.getElementsByTagName('input')[3]
		this.descripcion=this.div.getElementsByTagName('textarea')[0]
		this.tipo = this.div.getElementsByTagName("select")[0]
		this.op1=this.div.getElementsByTagName('option')[0]
		this.op2=this.div.getElementsByTagName('option')[1]
		this.op3=this.div.getElementsByTagName('option')[2]
		this.op4=this.div.getElementsByTagName('option')[3]

		this.pri=this.div.getElementsByTagName('input')[4]
		this.ver=this.div.getElementsByTagName('input')[5]
		this.oto=this.div.getElementsByTagName('input')[6]
		this.inv=this.div.getElementsByTagName('input')[7]

		this.lbNombre = this.div.getElementsByTagName("label")[1]
		this.lbTalla = this.div.getElementsByTagName("label")[2]
		this.lbDia = this.div.getElementsByTagName("label")[3]
		this.lbDescripcion = this.div.getElementsByTagName("label")[4]
		this.lbEstacion = this.div.getElementsByTagName("label")[6]

		this.h3Error1 = this.div.getElementsByTagName("h3")[0]
		this.h3Error2 = this.div.getElementsByTagName("h3")[1]

		this.btnBorrar = this.div.getElementsByTagName('a')[1]
		this.btnBorrar.onclick = this.borrar.bind(this)
		
		this.btnEditar = this.div.getElementsByTagName('a')[2]
		this.btnEditar.onclick = this.guardar.bind(this)

		this.btnVolver = this.div.getElementsByTagName('a')[0]
		this.btnVolver.onclick = this.volver.bind(this)
		
		
		this.id = ''
	}
	mostrarDatos(ropa){
		
		this.limpiar()
		this.id = ropa.id
		
		if(this.op1.value==ropa.tipo)
			this.op1.selected = true
		if(this.op2.value==ropa.tipo)
			this.op2.selected = true
		if(this.op3.value==ropa.tipo)
			this.op3.selected = true
		if(this.op4.value==ropa.tipo)
			this.op4.selected = true
		
		this.pri.checked = ropa.estacion[0]
		this.ver.checked = ropa.estacion[1]		
		this.oto.checked = ropa.estacion[2]		
		this.inv.checked = ropa.estacion[3]
		
	
		

		
		/*this.estacion=this.div.getElementsByTagName('h3')[4]
		console.log(ropa.estacion[0])*/
		
		this.nombre.value = ropa.nombre
		this.talla.value = ropa.talla
		this.dia.value = ropa.diaComprado
		this.descripcion.value = ropa.descripcion
		
	}
	limpiar(){
		this.op1.selected = false
		this.op2.selected = false
		this.op3.selected = false
		this.op4.selected = false
		this.pri.checked =false
		this.ver.checked = false	
		this.oto.checked = false		
		this.inv.checked = false

		/*this.estacion=this.div.getElementsByTagName('h3')[4]
		console.log(ropa.estacion[0])*/
		
		this.nombre.value = ''
		this.talla.value = ''
		this.dia.value = ''
		this.descripcion.value = ''
	}
	borrar(){
		this.controlador.borrado(this.id)
	}
	guardar(){
		let nombre = this.nombre.value
		let talla = this.talla.value
		let dia = this.dia.value //Año mes dia
		let descripcion = this.descripcion.value
		let tipo = this.tipo.value
		let valArray = true
		
		let array = []
		array.push(this.pri.checked,this.ver.checked,this.oto.checked,this.inv.checked)
		console.log(array[0],array[1],array[2],array[3])
		if(array[0]==false && array[1]==false && array[2]==false&& array[3]==false){
			valArray= false
		}
		
		if (nombre=='' || talla==''||talla<0 || dia=='' || descripcion=='' || valArray==false){
			if (nombre==''){
				this.h3Error1.style.display='block'
				this.lbNombre.style.color='red'
			} 
			if (talla==''){
				this.h3Error1.style.display='block'
				this.lbTalla.style.color='red'
			} 
			if (dia==''){
				this.h3Error1.style.display='block'
				this.lbDia.style.color='red'
			} 
			if (descripcion==''){
				this.h3Error1.style.display='block'
				this.lbDescripcion.style.color='red'
			} 
			if (valArray==false){
				this.h3Error1.style.display='block'
				this.lbEstacion.style.color='red'
			} 
			if (talla<0){
				this.h3Error2.style.display='block'
				this.lbTalla.style.color='red'
			} 	
		}else{

			let objeto = new Ropa(nombre,talla,dia,descripcion,tipo,array)
			this.controlador.guardar(this.id,objeto)
			this.limpiar()
		}

	
		
		

		
	}
	volver(){
		this.quitarErrores()
		this.controlador.pulsarHeadCons()
	}
	quitarErrores(){
		this.h3Error2.style.display='none'
		this.h3Error1.style.display='none'
		this.lbNombre.style.color='white'
		this.lbTalla.style.color='white'
		this.lbDia.style.color='white'
		this.lbDescripcion.style.color='white'
		this.lbEstacion.style.color='white'
	}
}