export class VistaHead{
	constructor(controlador, head){
		this.controlador = controlador
		this.head = head
		
		this.aListar = this.head.getElementsByTagName('a')[0]
		this.h1Alta = this.head.getElementsByTagName('h1')[0]

		this.btnBuscar = this.head.getElementsByTagName('button')[0]
		this.h1Edit = this.head.getElementsByTagName('h1')[2]
        this.h1Consulta = this.head.getElementsByTagName('h1')[4]
		
		this.aListar.onclick = this.pulsarLista.bind(this)
		this.btnBuscar.onclick = this.pulsarBuscar.bind(this)
		//this.h1Edit.onclick = this.pulsarEdit.bind(this)
		this.h1Alta.onclick = this.pulsarAlta.bind(this)
       // this.h1Consulta.onclick = this.pulsarConsulta.bind(this)
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