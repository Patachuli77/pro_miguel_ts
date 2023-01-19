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
		
		lista.forEach(element => {
			
			let a = document.createElement('a')
			let	div = document.createElement('div')
			div.classList.add('cajaRopa')
			let img = document.createElement('img')
			let h3 = document.createElement('h3')
			h3.innerHTML= element["nombre"]
			div.appendChild(img)
			div.appendChild(h3)
			a.appendChild(div)

			this.listado.appendChild(a)
			console.log(element)

		});

		/*<a href="datos.html">
             <div class="cajaRopa">
                <img src="../../src/www/assets/imagenes/camiseta1.jpg">
                <h3>Camiseta Blanca</h3>
             </div>
            </a>
			*/




	}
}