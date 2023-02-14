/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
export class Vista{
    public div: HTMLDivElement;
	
	constructor(div:HTMLDivElement){
		this.div = div 
	}/**
	 * Metodo que muestra o no las vistas
	 * @param {boolean} ver 
	 */
	mostrar(ver:boolean){
		if(ver)
			this.div.style.display = 'flex'
		else
			this.div.style.display = 'none'
	}
}