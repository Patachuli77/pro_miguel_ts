import {Vista} from './vista.js'
export class VistaList extends Vista{
	constructor(controlador, div){
		super(div)
		this.controlador = controlador
		this.inicio=this.div.getElementsByTagName('div')[0]
		this.listado=this.div.getElementsByTagName('div')[1]

		this.listado.style.display = 'none'

		this.btnListar = this.div.getElementsByTagName('button')[0]

		this.btnListar.onclick = this.listar.bind(this)
	}
	listar(){
		this.listado.style.display = 'flex'
		this.inicio.style.display = 'none'
		this.controlador.listar()
	}
	generarLista(lista){
		this.listado.innerHTML = ""
		lista.forEach(element => {
			let p = document.createElement('p')
			p.innerHTML= element["id"]
			p.classList.add('oculto')

			let	divCaja = document.createElement('div')
			divCaja.classList.add('cajaRopa')
			let img = document.createElement('img')
			let h3 = document.createElement('h3')
			h3.innerHTML= element["nombre"]
			divCaja.appendChild(img)
			divCaja.appendChild(h3)
			divCaja.appendChild(p)
				
			this.listado.appendChild(divCaja)

		});

		this.acciones()
		/*<a href="datos.html">
             <div class="cajaRopa">
                <img src="../../src/www/assets/imagenes/camiseta1.jpg">
                <h3>Camiseta Blanca</h3>
             </div>
            </a>this.div.onclick = this.controlador.pulsarRopa(element["id"])
		*/
	}
	acciones(){
		this.cajas= this.div.getElementsByClassName('cajaRopa')
		for(let caja of this.cajas){
			let id=caja.lastChild.innerHTML
			caja.onclick=this.pulsarCaja.bind(this, id)
	   }
	}		
	pulsarCaja(id){
		this.controlador.pulsarRopa(id)
	}
}
