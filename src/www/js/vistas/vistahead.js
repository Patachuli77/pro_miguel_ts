export class VistaHead{
	constructor(controlador, head){
		this.controlador = controlador
		this.head = head
		
		this.h1Lista = this.head.getElementsByTagName('h1')[1]
		this.h1Edit = this.head.getElementsByTagName('h1')[2]
		this.h1Alta = this.head.getElementsByTagName('h1')[3]
        this.h1Consulta = this.head.getElementsByTagName('h1')[4]
		
		this.h1Lista.onclick = this.pulsarLista.bind(this)
		this.h1Edit.onclick = this.pulsarEdit.bind(this)
		this.h1Alta.onclick = this.pulsarAlta.bind(this)
        this.h1Consulta.onclick = this.pulsarConsulta.bind(this)
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
}