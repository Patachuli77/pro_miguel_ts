/**
 * MOdelo de la ropa
 * 
 */ 
export class Ropa{
    constructor(nombre, talla, diaComprado, descripcion, enUso, tipo, estacion){
        this.nombre = nombre
        this.talla = talla
        this.diaComprado = diaComprado
        this.descripcion = descripcion
        this.enUso = enUso//al dar de alta se daria en false 
        this.tipo= tipo //calzado parte de arriba... el select
        this.estacion = estacion//invierno verano otoño primavera el checkbox
	}
}