export class VistaHead{
	constructor(controlador, head){
		this.controlador = controlador
		this.head = head
		
		this.aListar = this.head.getElementsByTagName('a')[0]
		this.h1Alta = this.head.getElementsByTagName('div')[1]

		this.btnBuscar = this.head.getElementsByTagName('div')[0]
		
		
		this.aListar.onclick = this.pulsarLista.bind(this)
		this.btnBuscar.onclick = this.pulsarBuscar.bind(this)
		
		this.h1Alta.onclick = this.pulsarAlta.bind(this)
      
	}
	pulsarLista(){
		this.controlador.pulsarHeadList()
		
	}
	pulsarEdit(){
		this.controlador.pulsarHeadEdit()
		
	}
	pulsarAlta(){
		this.controlador.pulsarHeadAlta()
		
	}
    pulsarConsulta(){
		this.controlador.pulsarHeadCons()
		
	}
	pulsarBuscar(){
		this.controlador.pulsarBuscar()
	}
}