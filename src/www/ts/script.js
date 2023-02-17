var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @file Contiene el controlador del idb
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
define("servicio/idb", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Idb = void 0;
    var Idb = /** @class */ (function () {
        function Idb() {
            var _this = this;
            var peticion = indexedDB.open('bd1', 2);
            peticion.onerror = function (evento) { throw 'Error al conectar indexedDB'; };
            peticion.onupgradeneeded = function (evento) {
                _this.conexion = evento.target.result;
                _this.crear();
            };
            peticion.onsuccess = function (evento) { _this.conexion = evento.target.result; };
        } /**
         * Metodo que crea la tabla
         */
        Idb.prototype.crear = function () {
            var tabla = this.conexion.createObjectStore('tabla1', { keyPath: 'id' });
        }; /**
         * Metodo que inserta un objeto en el indexer
         * @param {object} objeto
         * @param {funcion} callback
         */
        Idb.prototype.insertar = function (objeto, callback) {
            var transaccion = this.conexion.transaction(['tabla1'], 'readwrite');
            transaccion.onerror = function (evento) { throw 'Error al insertar'; };
            var tabla = transaccion.objectStore('tabla1');
            var peticion = tabla.add(objeto);
            peticion.onsuccess = callback;
        }; /**
         * Metodo que devuelve una lista de los objetos del indexer
         * @param {fubncion} callback
         */
        Idb.prototype.listar = function (callback) {
            var objectStore = this.conexion.transaction('tabla1', 'readonly').objectStore('tabla1');
            var peticion = objectStore.getAll();
            peticion.onsuccess = function () {
                var lista = peticion.result;
                var listado = lista;
                callback(listado);
            };
        }; /**
         * Metodo que devuelve una lista con los resultados de la busqueda de texto
         * @param {string} texto
         * @param {funcion} callback
         */
        Idb.prototype.buscar = function (texto, callback) {
            var _this = this;
            var objectStore = this.conexion.transaction("tabla1", "readonly").objectStore("tabla1");
            this.resultados = [];
            var cursor1 = objectStore.openCursor();
            cursor1.onsuccess = function (evento) {
                var cursor = evento.target.result;
                if (cursor) {
                    var ropa = cursor.value;
                    if (ropa.nombre == texto) {
                        _this.resultados.push(ropa);
                    }
                    cursor["continue"]();
                }
                else {
                    console.log(_this.resultados);
                    callback(_this.resultados);
                }
            };
        }; /**
         * Metodo que saca un objeto a partir de su id
         * @param {string} id
         * @param {funcion} callback
         */
        Idb.prototype.consultar = function (id, callback) {
            var _this = this;
            var objectStore = this.conexion.transaction("tabla1", "readonly").objectStore("tabla1");
            this.result;
            var cursor1 = objectStore.openCursor();
            cursor1.onsuccess = function (evento) {
                var cursor = evento.target.result;
                if (cursor) {
                    var ropa = cursor.value;
                    if (ropa.id == id) {
                        _this.result = ropa;
                    }
                    cursor["continue"]();
                }
                else {
                    callback(_this.result);
                }
            };
        }; /**
         * Metodo que borra un objeto a partir de su id
         * @param {string} id
         * @param {funcion} callback
         */
        Idb.prototype.borrar = function (id, callback) {
            var datos = this.conexion.transaction('tabla1', 'readwrite');
            var request = datos.objectStore("tabla1")["delete"](id);
            request.onsuccess = function (event) {
                callback();
            };
        };
        /**
         * Metodo que guarda los cambios a un objeto a traves de su id
         * @param {string} id
         * @param {object} ropa
         * @param {funcion} callback
         */
        Idb.prototype.guardar = function (id, ropa, callback) {
            var objectStore = this.conexion.transaction('tabla1', 'readwrite').objectStore('tabla1');
            var peticion = objectStore.get(parseInt(id));
            peticion.onerror = function (event) {
                console.log('Falló la lectura');
            };
            peticion.onsuccess = function (event) {
                var data = event.target.result;
                console.log('Leído', data);
                data.nombre = ropa.nombre;
                data.talla = ropa.talla;
                data.diaComprado = ropa.diaComprado;
                data.descripcion = ropa.descripcion;
                data.tipo = ropa.tipo;
                data.estacion = ropa.estacion;
                var peticion2 = objectStore.put(data);
                //this.listar()
                peticion2.onerror = function (event) {
                    console.log('No se pudo actualizar');
                    callback();
                };
                peticion2.onsuccess = function (event) {
                    console.log('Se actualizó');
                    callback();
                };
            };
        };
        return Idb;
    }());
    exports.Idb = Idb;
});
define("modelo/modelo", ["require", "exports", "servicio/idb"], function (require, exports, idb_js_1) {
    "use strict";
    exports.__esModule = true;
    exports.Modelo = void 0;
    var Modelo = /** @class */ (function () {
        function Modelo(controlador) {
            this.controlador = controlador;
            this.idb = new idb_js_1.Idb();
        }
        /**
         * Metodo que llama al metodo de insertar del indexerdb
         * @param {object} objeto
         * @param {funcion} callback
         */
        Modelo.prototype.insertar = function (objeto, callback) {
            console.log(objeto);
            this.idb.insertar(objeto, callback);
        }; /**
         * Metodo que llama al metodo listar del indexerdb
         * @param {funcion} callback
         */
        Modelo.prototype.listar = function (callback) {
            this.idb.listar(callback);
        };
        /**
         * Metodo que llama al metodo buscar del indexerdb
         * @param {string} texto
         * @param {funcion} callback
         */
        Modelo.prototype.buscar = function (texto, callback) {
            this.idb.buscar(texto, callback);
        };
        /**
         * Metodo que llama al metodo consultar del indexerdb
         * @param {string} id
         * @param {funcion} callback
         */
        Modelo.prototype.consultar = function (id, callback) {
            this.idb.consultar(id, callback);
        };
        /**
         * Metodo que llama al metodo eliminar del indexerdb
         * @param {string} id
         * @param {funcion} callback
         */
        Modelo.prototype.eliminar = function (id, callback) {
            this.idb.borrar(id, callback);
        }; /**
         * Metodo que llama al metodo guardar del indexerdb
         * @param {string} id
         * @param {object} ropa
         * @param {funcion} callback
         */
        Modelo.prototype.guardar = function (id, ropa, callback) {
            this.idb.guardar(id, ropa, callback);
        };
        return Modelo;
    }());
    exports.Modelo = Modelo;
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
define("vistas/vistalista", ["require", "exports", "vistas/vista"], function (require, exports, vista_js_1) {
    "use strict";
    exports.__esModule = true;
    exports.VistaList = void 0;
    var VistaList = /** @class */ (function (_super) {
        __extends(VistaList, _super);
        //private cajas:HTMLCollectionOf<Element>;
        function VistaList(controlador, div) {
            var _this = _super.call(this, div) || this;
            _this.controlador = controlador;
            _this.inicio = _this.div.getElementsByTagName('div')[0];
            _this.listado = _this.div.getElementsByTagName('div')[1];
            _this.logo = document.getElementsByTagName('img')[0];
            _this.listado.style.display = 'none';
            _this.btnListar = _this.div.getElementsByTagName('button')[0];
            _this.btnListar.onclick = _this.listar.bind(_this);
            _this.logo.onclick = _this.listar.bind(_this);
            return _this;
        } /**
         * Metodo que elimina la fachada de carga inicial y cambia a la vista normal
         */
        VistaList.prototype.listar = function () {
            this.listado.style.display = 'flex';
            this.inicio.style.display = 'none';
            this.controlador.listar();
        };
        /**
         * Metodo que genera la estructura de la lista y la mete en la vista
         * @param {array} lista
         */
        VistaList.prototype.generarLista = function (lista) {
            var _this = this;
            console.log(lista);
            this.listado.innerHTML = "";
            lista.forEach(function (element) {
                var p = document.createElement('p');
                p.innerHTML = element["id"];
                p.classList.add('oculto');
                var divCaja = document.createElement('div');
                divCaja.classList.add('cajaRopa');
                var img = document.createElement('img');
                img.setAttribute("src", element["imagenSrc"]);
                var h3 = document.createElement('h3');
                h3.innerHTML = element["nombre"];
                divCaja.appendChild(img);
                divCaja.appendChild(h3);
                divCaja.appendChild(p);
                _this.listado.appendChild(divCaja);
                var id = p.innerHTML;
                divCaja.onclick = _this.pulsarCaja.bind(_this, id);
            });
            //this.acciones()
        }; /**
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
        VistaList.prototype.pulsarCaja = function (id) {
            this.controlador.pulsarRopa(id);
        };
        return VistaList;
    }(vista_js_1.Vista));
    exports.VistaList = VistaList;
});
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
define("vistas/vistaalta", ["require", "exports", "vistas/vista", "modelo/ropa"], function (require, exports, vista_js_2, ropa_js_1) {
    "use strict";
    exports.__esModule = true;
    exports.VistaAlta = void 0;
    var VistaAlta = /** @class */ (function (_super) {
        __extends(VistaAlta, _super);
        function VistaAlta(controlador, div) {
            var _this = _super.call(this, div) || this;
            _this.controlador = controlador;
            _this.btnCancelar = _this.div.getElementsByTagName('button')[0];
            _this.btnAceptarVolver = _this.div.getElementsByTagName('button')[1];
            _this.btnAceptarForm = _this.div.getElementsByTagName('button')[2];
            _this.formImg = _this.div.getElementsByTagName("input")[0];
            _this.formNombre = _this.div.getElementsByTagName("input")[1];
            _this.formTalla = _this.div.getElementsByTagName("input")[2];
            _this.formDia = _this.div.getElementsByTagName("input")[3];
            _this.formDescripcion = _this.div.getElementsByTagName("textArea")[0]; /*<>*/
            _this.formTipo = _this.div.getElementsByTagName("select")[0];
            _this.op1 = _this.div.getElementsByTagName('option')[0];
            _this.op2 = _this.div.getElementsByTagName('option')[1];
            _this.op3 = _this.div.getElementsByTagName('option')[2];
            _this.op4 = _this.div.getElementsByTagName('option')[3];
            _this.pri = _this.div.getElementsByTagName("input")[4];
            _this.ver = _this.div.getElementsByTagName("input")[5];
            _this.oto = _this.div.getElementsByTagName("input")[6];
            _this.inv = _this.div.getElementsByTagName("input")[7];
            _this.lbNombre = _this.div.getElementsByTagName("label")[1];
            _this.lbTalla = _this.div.getElementsByTagName("label")[2];
            _this.lbDia = _this.div.getElementsByTagName("label")[3];
            _this.lbDescripcion = _this.div.getElementsByTagName("label")[4];
            _this.lbEstacion = _this.div.getElementsByTagName("label")[6];
            _this.h3Error1 = _this.div.getElementsByTagName("h3")[0];
            _this.h3Error2 = _this.div.getElementsByTagName("h3")[1];
            _this.btnAceptarForm.onclick = _this.validar.bind(_this, 1);
            _this.btnAceptarVolver.onclick = _this.validar.bind(_this, 0);
            _this.btnCancelar.onclick = _this.volver.bind(_this);
            return _this;
        } /**
         * Metodo que valida los datos y los envia o no al alta dependiendo del resultado
         * @param {int} num depende de por donde se llegue al metodo el resultado varia
         */
        VistaAlta.prototype.validar = function (num) {
            var imagenSrc = "../../src/www/assets/imagenes/camiseta1.jpg"; //IGNORAR POR EL MOMENTO
            var nombre = this.formNombre.value;
            var talla = this.formTalla.value;
            var dia = this.formDia.value; //Año mes dia
            var descripcion = this.formDescripcion.value;
            var tipo = this.formTipo.value;
            var valArray = true;
            var array = [];
            array.push(this.pri.checked, this.ver.checked, this.oto.checked, this.inv.checked);
            console.log(array[0], array[1], array[2], array[3]);
            if (array[0] == false && array[1] == false && array[2] == false && array[3] == false) {
                valArray = false;
            }
            if (nombre == '' || talla == '' || parseInt(talla) < 0 || dia == '' || descripcion == '' || valArray == false) {
                if (nombre == '') {
                    this.h3Error1.style.display = 'block';
                    this.lbNombre.style.color = 'red';
                }
                if (talla == '') {
                    this.h3Error1.style.display = 'block';
                    this.lbTalla.style.color = 'red';
                }
                if (dia == '') {
                    this.h3Error1.style.display = 'block';
                    this.lbDia.style.color = 'red';
                }
                if (descripcion == '') {
                    this.h3Error1.style.display = 'block';
                    this.lbDescripcion.style.color = 'red';
                }
                if (valArray == false) {
                    this.h3Error1.style.display = 'block';
                    this.lbEstacion.style.color = 'red';
                }
                if (parseInt(talla) < 0) {
                    this.h3Error2.style.display = 'block';
                    this.lbTalla.style.color = 'red';
                }
            }
            else {
                var objeto = new ropa_js_1.Ropa(imagenSrc, nombre, talla, dia, descripcion, tipo, array);
                this.controlador.insertar(objeto);
                this.limpiar();
                if (num == 0) {
                    this.volver();
                }
            }
        };
        /**
         * Metodo que vuelve a la vista principal sin realizar cambios
         */
        VistaAlta.prototype.volver = function () {
            this.limpiar();
            this.controlador.listar();
            this.controlador.pulsarHeadList();
        };
        /**
         * Metodo que limpia el formulario cada vez que se inicializa
         */
        VistaAlta.prototype.limpiar = function () {
            this.op1.selected = false;
            this.op2.selected = false;
            this.op3.selected = false;
            this.op4.selected = false;
            this.pri.checked = false;
            this.ver.checked = false;
            this.oto.checked = false;
            this.inv.checked = false;
            this.formNombre.value = '';
            this.formTalla.value = '';
            this.formDia.value = '';
            this.formDescripcion.value = '';
            this.h3Error2.style.display = 'none';
            this.h3Error1.style.display = 'none';
            this.lbNombre.style.color = 'white';
            this.lbTalla.style.color = 'white';
            this.lbDia.style.color = 'white';
            this.lbDescripcion.style.color = 'white';
            this.lbEstacion.style.color = 'white';
        };
        return VistaAlta;
    }(vista_js_2.Vista));
    exports.VistaAlta = VistaAlta;
});
define("vistas/vistaedit", ["require", "exports", "vistas/vista", "modelo/ropa"], function (require, exports, vista_js_3, ropa_js_2) {
    "use strict";
    exports.__esModule = true;
    exports.VistaEdit = void 0;
    var VistaEdit = /** @class */ (function (_super) {
        __extends(VistaEdit, _super);
        function VistaEdit(controlador, div) {
            var _this = _super.call(this, div) || this;
            _this.controlador = controlador;
            _this.nombre = _this.div.getElementsByTagName('input')[1];
            _this.talla = _this.div.getElementsByTagName('input')[2];
            _this.dia = _this.div.getElementsByTagName('input')[3];
            _this.descripcion = _this.div.getElementsByTagName('textarea')[0];
            _this.tipo = _this.div.getElementsByTagName("select")[0];
            _this.op1 = _this.div.getElementsByTagName('option')[0];
            _this.op2 = _this.div.getElementsByTagName('option')[1];
            _this.op3 = _this.div.getElementsByTagName('option')[2];
            _this.op4 = _this.div.getElementsByTagName('option')[3];
            _this.pri = _this.div.getElementsByTagName('input')[4];
            _this.ver = _this.div.getElementsByTagName('input')[5];
            _this.oto = _this.div.getElementsByTagName('input')[6];
            _this.inv = _this.div.getElementsByTagName('input')[7];
            _this.lbNombre = _this.div.getElementsByTagName("label")[1];
            _this.lbTalla = _this.div.getElementsByTagName("label")[2];
            _this.lbDia = _this.div.getElementsByTagName("label")[3];
            _this.lbDescripcion = _this.div.getElementsByTagName("label")[4];
            _this.lbEstacion = _this.div.getElementsByTagName("label")[6];
            _this.h3Error1 = _this.div.getElementsByTagName("h3")[0];
            _this.h3Error2 = _this.div.getElementsByTagName("h3")[1];
            _this.btnBorrar = _this.div.getElementsByTagName('a')[1];
            _this.btnBorrar.onclick = _this.borrar.bind(_this);
            _this.btnEditar = _this.div.getElementsByTagName('a')[2];
            _this.btnEditar.onclick = _this.guardar.bind(_this);
            _this.btnVolver = _this.div.getElementsByTagName('a')[0];
            _this.btnVolver.onclick = _this.volver.bind(_this);
            _this.id = '';
            return _this;
        } /**
         * Metodo que muestra los datos del objeto en la vista de edicion
         * @param {object} ropa
         */
        VistaEdit.prototype.mostrarDatos = function (ropa) {
            this.limpiar();
            this.id = ropa.id;
            if (this.op1.value == ropa.tipo)
                this.op1.selected = true;
            if (this.op2.value == ropa.tipo)
                this.op2.selected = true;
            if (this.op3.value == ropa.tipo)
                this.op3.selected = true;
            if (this.op4.value == ropa.tipo)
                this.op4.selected = true;
            this.pri.checked = ropa.estacion[0];
            this.ver.checked = ropa.estacion[1];
            this.oto.checked = ropa.estacion[2];
            this.inv.checked = ropa.estacion[3];
            this.nombre.value = ropa.nombre;
            this.talla.value = ropa.talla;
            this.dia.value = ropa.diaComprado;
            this.descripcion.value = ropa.descripcion;
        };
        /**
         * Metodo que limpia el formulario despues de su uso por si acacso
         */
        VistaEdit.prototype.limpiar = function () {
            this.op1.selected = false;
            this.op2.selected = false;
            this.op3.selected = false;
            this.op4.selected = false;
            this.pri.checked = false;
            this.ver.checked = false;
            this.oto.checked = false;
            this.inv.checked = false;
            this.nombre.value = '';
            this.talla.value = '';
            this.dia.value = '';
            this.descripcion.value = '';
        }; /**
         * MEtodo que llama al controlador para borrar
         */
        VistaEdit.prototype.borrar = function () {
            this.controlador.borrado(this.id);
        };
        /**
         * Metodo que valida los datos del formulario y decide si enviarlos o no dependindo del resultado
         */
        VistaEdit.prototype.guardar = function () {
            var imagenSrc = "../../src/www/assets/imagenes/camiseta1.jpg"; //IGNORAR POR EL MOMENTO
            var nombre = this.nombre.value;
            var talla = this.talla.value;
            var dia = this.dia.value; //Año mes dia
            var descripcion = this.descripcion.value;
            var tipo = this.tipo.value;
            var valArray = true;
            var array = [];
            array.push(this.pri.checked, this.ver.checked, this.oto.checked, this.inv.checked);
            console.log(array[0], array[1], array[2], array[3]);
            if (array[0] == false && array[1] == false && array[2] == false && array[3] == false) {
                valArray = false;
            }
            if (nombre == '' || talla == '' || parseInt(talla) < 0 || dia == '' || descripcion == '' || valArray == false) {
                if (nombre == '') {
                    this.h3Error1.style.display = 'block';
                    this.lbNombre.style.color = 'red';
                }
                if (talla == '') {
                    this.h3Error1.style.display = 'block';
                    this.lbTalla.style.color = 'red';
                }
                if (dia == '') {
                    this.h3Error1.style.display = 'block';
                    this.lbDia.style.color = 'red';
                }
                if (descripcion == '') {
                    this.h3Error1.style.display = 'block';
                    this.lbDescripcion.style.color = 'red';
                }
                if (valArray == false) {
                    this.h3Error1.style.display = 'block';
                    this.lbEstacion.style.color = 'red';
                }
                if (parseInt(talla) < 0) {
                    this.h3Error2.style.display = 'block';
                    this.lbTalla.style.color = 'red';
                }
            }
            else {
                var objeto = new ropa_js_2.Ropa(imagenSrc, nombre, talla, dia, descripcion, tipo, array);
                this.controlador.guardar(this.id, objeto);
                this.limpiar();
            }
        }; /**
         * Metodo para volver a la vista anterior
         */
        VistaEdit.prototype.volver = function () {
            this.quitarErrores();
            this.controlador.pulsarHeadCons();
        };
        /**
         * Metodo para quitar los avisos por datos incorrectos
         */
        VistaEdit.prototype.quitarErrores = function () {
            this.h3Error2.style.display = 'none';
            this.h3Error1.style.display = 'none';
            this.lbNombre.style.color = 'white';
            this.lbTalla.style.color = 'white';
            this.lbDia.style.color = 'white';
            this.lbDescripcion.style.color = 'white';
            this.lbEstacion.style.color = 'white';
        };
        return VistaEdit;
    }(vista_js_3.Vista));
    exports.VistaEdit = VistaEdit;
});
define("vistas/vistahead", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.VistaHead = void 0;
    var VistaHead = /** @class */ (function () {
        function VistaHead(controlador, head) {
            this.controlador = controlador;
            this.head = head;
            this.aListar = this.head.getElementsByTagName('a')[0];
            this.h1Alta = this.head.getElementsByTagName('div')[1];
            this.btnBuscar = this.head.getElementsByTagName('div')[0];
            this.aListar.onclick = this.pulsarLista.bind(this);
            this.btnBuscar.onclick = this.pulsarBuscar.bind(this);
            this.h1Alta.onclick = this.pulsarAlta.bind(this);
        } /**
         * Metodo que llama al controlador para cambiar la vista a listar
         */
        VistaHead.prototype.pulsarLista = function () {
            this.controlador.pulsarHeadList();
        }; /**
         * Metodo que llama al controlador para cambiar la vista al alta
         */
        VistaHead.prototype.pulsarAlta = function () {
            this.controlador.pulsarHeadAlta();
        };
        /**
         * Metodo que llama al controlador para cambiar la vista a buscar
         *
         */
        VistaHead.prototype.pulsarBuscar = function () {
            this.controlador.pulsarBuscar();
        };
        return VistaHead;
    }());
    exports.VistaHead = VistaHead;
});
define("vistas/vistacons", ["require", "exports", "vistas/vista"], function (require, exports, vista_js_4) {
    "use strict";
    exports.__esModule = true;
    exports.VistaCons = void 0;
    var VistaCons = /** @class */ (function (_super) {
        __extends(VistaCons, _super);
        function VistaCons(controlador, div) {
            var _this = _super.call(this, div) || this;
            _this.controlador = controlador;
            _this.btnEditar = _this.div.getElementsByTagName('a')[1];
            _this.btnEditar.onclick = _this.modificar.bind(_this);
            _this.btnVolver = _this.div.getElementsByTagName('a')[0];
            _this.btnVolver.onclick = _this.volver.bind(_this);
            return _this;
        } /**
         * Metodo que mete los datos del objeto dentro de su sitio en la vista para poder visualizarlos
         * @param {object} ropa
         */
        VistaCons.prototype.mostrarDatos = function (ropa) {
            var cadena = '';
            if (ropa.estacion[0] == true) {
                cadena += 'Primavera, ';
            }
            if (ropa.estacion[1] == true) {
                cadena += 'Verano, ';
            }
            if (ropa.estacion[2] == true) {
                cadena += 'Otoño, ';
            }
            if (ropa.estacion[3] == true) {
                cadena += 'Invierno, ';
            }
            cadena = cadena.substring(0, cadena.length - 2);
            var nombre = this.div.getElementsByTagName('h3')[0];
            var talla = this.div.getElementsByTagName('h3')[1];
            var dia = this.div.getElementsByTagName('h3')[2];
            var descripcion = this.div.getElementsByTagName('p')[0];
            var tipo = this.div.getElementsByTagName('h3')[3];
            var estacion = this.div.getElementsByTagName('h3')[4];
            console.log(ropa.estacion[0]);
            nombre.innerHTML = ropa.nombre;
            talla.innerHTML = ropa.talla;
            dia.innerHTML = ropa.diaComprado;
            descripcion.innerHTML = ropa.descripcion;
            tipo.innerHTML = ropa.tipo;
            estacion.innerHTML = cadena;
        }; /**
         * Metodo para cambiar a la vista de editar
         */
        VistaCons.prototype.modificar = function () {
            this.controlador.pulsarHeadEdit();
        }; /**
         * Metodo para volver a la vista principal
         */
        VistaCons.prototype.volver = function () {
            this.controlador.pulsarHeadList();
        };
        return VistaCons;
    }(vista_js_4.Vista));
    exports.VistaCons = VistaCons;
});
define("vistas/vistabusq", ["require", "exports", "vistas/vista"], function (require, exports, vista_js_5) {
    "use strict";
    exports.__esModule = true;
    exports.VistaBusq = void 0;
    var VistaBusq = /** @class */ (function (_super) {
        __extends(VistaBusq, _super);
        function VistaBusq(controlador, div) {
            var _this = _super.call(this, div) || this;
            _this.controlador = controlador;
            _this.btnListar = _this.div.getElementsByTagName('button')[0];
            _this.btnListar.onclick = _this.buscar.bind(_this);
            return _this;
        }
        /**
         * Metodo que llama al controlador para buscar
         */
        VistaBusq.prototype.buscar = function () {
            this.texto = this.div.getElementsByTagName('input')[0];
            this.controlador.buscar(this.texto.value);
            this.limpiar();
        };
        /**
         * Metodo que limpia el buscador despues de la busqueda
         */
        VistaBusq.prototype.limpiar = function () {
            this.texto.value = '';
        };
        return VistaBusq;
    }(vista_js_5.Vista));
    exports.VistaBusq = VistaBusq;
});
/**
 * @file Contiene el controlador principal de la aplicación
 * @author	Jorge Ortega <jorge77.ortega@gmail.com>
 */
define("controlador/app", ["require", "exports", "modelo/modelo", "vistas/vistalista", "vistas/vistaalta", "vistas/vistaedit", "vistas/vistahead", "vistas/vistacons", "vistas/vistabusq"], function (require, exports, modelo_js_1, vistalista_js_1, vistaalta_js_1, vistaedit_js_1, vistahead_js_1, vistacons_js_1, vistabusq_js_1) {
    "use strict";
    exports.__esModule = true;
    exports.Controlador = void 0;
    var Controlador = /** @class */ (function () {
        /**
         * Constructor de la clase
         */
        function Controlador() {
            window.onload = this.iniciar.bind(this);
        }
        /**
         * Inicializa la aplicaion
         */
        Controlador.prototype.iniciar = function () {
            this.modelo = new modelo_js_1.Modelo(this);
            this.head = document.getElementsByTagName('header')[0];
            this.vistaHead = new vistahead_js_1.VistaHead(this, this.head);
            this.mainList = new vistalista_js_1.VistaList(this, document.getElementById('listado'));
            this.mainEdit = new vistaedit_js_1.VistaEdit(this, document.getElementById('edicion'));
            this.mainAlta = new vistaalta_js_1.VistaAlta(this, document.getElementById('alta'));
            this.mainCons = new vistacons_js_1.VistaCons(this, document.getElementById('consulta'));
            this.mainBusq = new vistabusq_js_1.VistaBusq(this, document.getElementById('busqueda'));
            this.mainList.mostrar(true);
        };
        /**
         * Metodo que muestra la vista de listar
         */
        Controlador.prototype.pulsarHeadList = function () {
            this.mainList.mostrar(true);
            this.mainEdit.mostrar(false);
            this.mainAlta.mostrar(false);
            this.mainCons.mostrar(false);
            this.mainBusq.mostrar(false);
        };
        /**
         * Metodo que muesta la vista de la edicion
         */
        Controlador.prototype.pulsarHeadEdit = function () {
            this.mainList.mostrar(false);
            this.mainEdit.mostrar(true);
            this.mainAlta.mostrar(false);
            this.mainCons.mostrar(false);
            this.mainBusq.mostrar(false);
        };
        /**
         * Metodo que muestra la vista del alta
         */
        Controlador.prototype.pulsarHeadAlta = function () {
            this.mainList.mostrar(false);
            this.mainEdit.mostrar(false);
            this.mainAlta.mostrar(true);
            this.mainCons.mostrar(false);
            this.mainBusq.mostrar(false);
        };
        /**
         * Metodo que muestra la vista de la consulta de datos
         */
        Controlador.prototype.pulsarHeadCons = function () {
            this.mainList.mostrar(false);
            this.mainEdit.mostrar(false);
            this.mainAlta.mostrar(false);
            this.mainCons.mostrar(true);
            this.mainBusq.mostrar(false);
        };
        /**
         * Metodo que muestra la vista de buscar
         */
        Controlador.prototype.pulsarBuscar = function () {
            this.mainList.mostrar(false);
            this.mainEdit.mostrar(false);
            this.mainAlta.mostrar(false);
            this.mainCons.mostrar(false);
            this.mainBusq.mostrar(true);
        };
        /**
         * Metodo que llama al modelo para insertar datos en el indexed
         * @param {Object} objeto
         */
        Controlador.prototype.insertar = function (objeto) {
            this.modelo.insertar(objeto, this.insertarOK.bind(this));
        };
        /**
         * Callback del metodo insertar
         */
        Controlador.prototype.insertarOK = function () {
            console.log('La inserción ha ido bien');
        };
        /**
         * Metodo que llama al modelo para listar
         */
        Controlador.prototype.listar = function () {
            this.modelo.listar(this.listarOK.bind(this));
        };
        /**
         * Callback del metodo listar, llama a la vista para visualizar la lista de objetos
         * @param {array} lista
         */
        Controlador.prototype.listarOK = function (lista) {
            this.mainList.generarLista(lista);
        };
        /**
         * Metodo que llama al modelo para consultar los datos de un articulo
         * @param {string} id
         */
        Controlador.prototype.pulsarRopa = function (id) {
            this.modelo.consultar(id, this.consultaPrenda.bind(this));
        }; /**
         * Metodo que visualiza los datos de la consulta en la vista editar y en la vista consulta
         * @param {Object} ropa
         */
        Controlador.prototype.consultaPrenda = function (ropa) {
            this.mainEdit.mostrarDatos(ropa);
            this.mainCons.mostrarDatos(ropa);
            this.pulsarHeadCons();
        };
        /**
         * Metodo que llama al modelo para buscar por el nombre a un objeto
         * @param {string} texto
         */
        Controlador.prototype.buscar = function (texto) {
            this.modelo.buscar(texto, this.listarOK.bind(this));
            this.pulsarHeadList();
        };
        /**
         * Metodo que llama al modelo para eliminar un objeto
         * @param {string} id
         */
        Controlador.prototype.borrado = function (id) {
            this.modelo.eliminar(id, this.listar.bind(this));
            this.pulsarHeadList();
        };
        /**
         * Metodo que llama al modelo para guardar un cambio a un objeto
         * @param {string} id
         * @param {object} ropa
         */
        Controlador.prototype.guardar = function (id, ropa) {
            this.modelo.guardar(id, ropa, this.listar.bind(this));
            this.pulsarHeadList();
        };
        return Controlador;
    }());
    exports.Controlador = Controlador;
    var app = new Controlador();
});
