/**
 * @file Contiene el objeto principal de la aplicaion
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
export class Ropa{
    /**
     * Objeto principal de la aplicaicion
     * @param {string} imagenSrc 
     * @param {string} nombre 
     * @param {string} talla 
     * @param {string} diaComprado 
     * @param {string} descripcion 
     * @param {string} tipo 
     * @param {array} estacion 
     */
    constructor(imagenSrc,nombre, talla, diaComprado, descripcion, tipo, estacion){
        this.id=Date.now()
        this.imagenSrc=imagenSrc
        this.nombre = nombre
        this.talla = talla
        this.diaComprado = diaComprado
        this.descripcion = descripcion
        //this.enUso = enUso//al dar de alta se daria en false 
        this.tipo= tipo //calzado parte de arriba... el select
        this.estacion = estacion//invierno verano otoño primavera el checkbox
	}
}