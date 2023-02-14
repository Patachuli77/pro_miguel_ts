/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Vista} from './vista.js'
import {Ropa} from '../modelo/ropa.js'
import {Controlador} from '../controlador/app.js'
export class VistaAlta extends Vista{
	public div: HTMLDivElement;
	public controlador: Controlador;

	private btnCancelar: HTMLElement;
	private btnAceptarVolver: HTMLElement;
	private btnAceptarForm: HTMLElement;

	private formImg : HTMLElement;
	private formNombre: HTMLInputElement;
	private formTalla : HTMLInputElement;
	private formDia : HTMLInputElement;
	private formDescripcion : HTMLTextAreaElement;
	private formTipo : HTMLSelectElement;
	private op1: HTMLOptionElement;
	private op2: HTMLOptionElement;
	private op3: HTMLOptionElement;
	private op4: HTMLOptionElement;

	private pri : HTMLInputElement;
	private ver : HTMLInputElement;
	private oto : HTMLInputElement;
	private inv : HTMLInputElement;

	private lbNombre : HTMLElement;
	private lbTalla : HTMLElement;
	private lbDia : HTMLElement;
	private lbDescripcion : HTMLElement;
	private lbEstacion : HTMLElement;

	private h3Error1 : HTMLElement;
	private h3Error2 : HTMLElement;



	constructor(controlador: Controlador, div: HTMLDivElement){
		super(div)
		this.controlador = controlador
		
		this.btnCancelar = this.div.getElementsByTagName('button')[0]
		this.btnAceptarVolver = this.div.getElementsByTagName('button')[1]
		this.btnAceptarForm = this.div.getElementsByTagName('button')[2]

		
		this.formImg = this.div.getElementsByTagName("input")[0]
		this.formNombre= this.div.getElementsByTagName("input")[1]
		this.formTalla = this.div.getElementsByTagName("input")[2]
		this.formDia = this.div.getElementsByTagName("input")[3]
		this.formDescripcion = this.div.getElementsByTagName("textArea")[0]
		this.formTipo = this.div.getElementsByTagName("select")[0]
		this.op1=this.div.getElementsByTagName('option')[0]
		this.op2=this.div.getElementsByTagName('option')[1]
		this.op3=this.div.getElementsByTagName('option')[2]
		this.op4=this.div.getElementsByTagName('option')[3]

		this.pri = this.div.getElementsByTagName("input")[4]
		this.ver = this.div.getElementsByTagName("input")[5]
		this.oto = this.div.getElementsByTagName("input")[6]
		this.inv = this.div.getElementsByTagName("input")[7]

		this.lbNombre = this.div.getElementsByTagName("label")[1]
		this.lbTalla = this.div.getElementsByTagName("label")[2]
		this.lbDia = this.div.getElementsByTagName("label")[3]
		this.lbDescripcion = this.div.getElementsByTagName("label")[4]
		this.lbEstacion = this.div.getElementsByTagName("label")[6]

		this.h3Error1 = this.div.getElementsByTagName("h3")[0]
		this.h3Error2 = this.div.getElementsByTagName("h3")[1]




		this.btnAceptarForm.onclick = this.validar.bind(this,1)
		this.btnAceptarVolver.onclick = this.validar.bind(this,0)
		this.btnCancelar.onclick = this.volver.bind(this)
	}/**
	 * Metodo que valida los datos y los envia o no al alta dependiendo del resultado
	 * @param {int} num depende de por donde se llegue al metodo el resultado varia
	 */
	validar(num){

		let imagenSrc= "../../src/www/assets/imagenes/camiseta1.jpg"//IGNORAR POR EL MOMENTO
		let nombre = this.formNombre.value
		let talla = this.formTalla.value
		let dia = this.formDia.value //Año mes dia
		let descripcion = this.formDescripcion.value
		let tipo = this.formTipo.value
		let valArray = true
		
		let array:boolean[] = []
		array.push(this.pri.checked,this.ver.checked,this.oto.checked,this.inv.checked)
		console.log(array[0],array[1],array[2],array[3])
		if(array[0]==false && array[1]==false && array[2]==false&& array[3]==false){
			valArray= false
		}
		
		if (nombre=='' || talla==''||parseInt(talla)<0 || dia=='' || descripcion=='' || valArray==false){
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
			if (parseInt(talla)<0){
				this.h3Error2.style.display='block'
				this.lbTalla.style.color='red'
			} 	
		}else{

			let objeto = new Ropa(imagenSrc,nombre,talla,dia,descripcion,tipo,array)
			this.controlador.insertar(objeto)
			this.limpiar()
			if(num==0){
				
				this.volver()
			}

		}
		
		
	}
	/**
	 * Metodo que vuelve a la vista principal sin realizar cambios
	 */
	volver(){
		this.limpiar()
		this.controlador.listar()
		this.controlador.pulsarHeadList()
	}
	/**
	 * Metodo que limpia el formulario cada vez que se inicializa
	 */
	limpiar(){
		this.op1.selected = false
		this.op2.selected = false
		this.op3.selected = false
		this.op4.selected = false
		this.pri.checked =false
		this.ver.checked = false	
		this.oto.checked = false		
		this.inv.checked = false


		
		this.formNombre.value = ''
		this.formTalla.value = ''
		this.formDia.value = ''
		this.formDescripcion.value = ''

		this.h3Error2.style.display='none'
		this.h3Error1.style.display='none'
		this.lbNombre.style.color='white'
		this.lbTalla.style.color='white'
		this.lbDia.style.color='white'
		this.lbDescripcion.style.color='white'
		this.lbEstacion.style.color='white'
	}
}