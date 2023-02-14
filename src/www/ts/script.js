define("modelo/ropa", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Ropa = void 0;
    /**
     * @file Contiene el objeto principal de la aplicaion
     * @author	Jorge Ortega <jorge77.ortega@gmail.com>
     */
    var Ropa = /** @class */ (function () {
        function Ropa(imagenSrc, nombre, talla, diaComprado, descripcion, tipo, estacion) {
            this.id = Date.now();
            this.imagenSrc = imagenSrc;
            this.nombre = nombre;
            this.talla = talla;
            this.diaComprado = diaComprado;
            this.descripcion = descripcion;
            //this.enUso = enUso//al dar de alta se daria en false 
            this.tipo = tipo; //calzado parte de arriba... el select
            this.estacion = estacion; //invierno verano otoño primavera el checkbox
        }
        return Ropa;
    }());
    exports.Ropa = Ropa;
});
define("vistas/vista", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Vista = void 0;
    /**
     * @file Contiene el controlador principal de la aplicación
     * @author	Jorge Ortega <jorge77.ortega@gmail.com>
     */
    var Vista = /** @class */ (function () {
        function Vista(div) {
            this.div = div;
        } /**
         * Metodo que muestra o no las vistas
         * @param {boolean} ver
         */
        Vista.prototype.mostrar = function (ver) {
            if (ver)
                this.div.style.display = 'flex';
            else
                this.div.style.display = 'none';
        };
        return Vista;
    }());
    exports.Vista = Vista;
});
