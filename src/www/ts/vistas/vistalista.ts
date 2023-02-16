/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
import {Vista} from './vista.js'
import {Controlador} from '../controlador/app.js'
export class VistaList extends Vista{
	public controlador: Controlador;
	public div: HTMLDivElement;

	private inicio: HTMLDivElement;
	private listado: HTMLDivElement;
	private logo: HTMLImageElement;

	private btnListar:HTMLButtonElement;
	//private cajas:HTMLCollectionOf<Element>;

	constructor(controlador:Controlador, div:HTMLDivElement){
		super(div)
		this.controlador = controlador
		this.inicio=this.div.getElementsByTagName('div')[0]
		this.listado=this.div.getElementsByTagName('div')[1]
		this.logo= document.getElementsByTagName('img')[0]

		this.listado.style.display = 'none'

		this.btnListar = this.div.getElementsByTagName('button')[0]

		this.btnListar.onclick = this.listar.bind(this)
		this.logo.onclick = this.listar.bind(this)
	}/**
	 * Metodo que elimina la fachada de carga inicial y cambia a la vista normal
	 */
	listar(){
		this.listado.style.display = 'flex'
		this.inicio.style.display = 'none'
		this.controlador.listar()
	}
	/**
	 * Metodo que genera la estructura de la lista y la mete en la vista
	 * @param {array} lista 
	 */
	generarLista(lista:any){
		console.log(lista)
		this.listado.innerHTML = ""
		lista.forEach(element => {
			let p = document.createElement('p')
			p.innerHTML= element["id"]
			p.classList.add('oculto')
			

			let	divCaja = document.createElement('div')
			divCaja.classList.add('cajaRopa')
			let img = document.createElement('img')
			img.setAttribute("src",element["imagenSrc"])
			let h3 = document.createElement('h3')
			h3.innerHTML= element["nombre"]
			divCaja.appendChild(img)
			divCaja.appendChild(h3)
			divCaja.appendChild(p)
				
			this.listado.appendChild(divCaja)

			let id = p.innerHTML
			divCaja.onclick= this.pulsarCaja.bind(this, id)
		});

		//this.acciones()
	}/**
	 * Metodo que añade el on click a cada elemento genereado dinamicamente
	 */
	/*acciones(){
		this.cajas= this.div.getElementsByClassName('cajaRopa')
		for(let caja of this.cajas){
			let id= caja.lastChild.innerHTML
			caja.onclick=this.pulsarCaja.bind(this, id)
	   }
	}/**
	 * Metodo que indica al controlador que se ha pulsado una caja
	 * @param {string} id 
	 */	
	pulsarCaja(id:number){
		this.controlador.pulsarRopa(id)
	}
}
