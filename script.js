

const boton_sorteo = document.getElementById("boton_sorteo");


// Un bloque define a un conjunto de cosas a rifar
class bloque {
    constructor(id, nombre_imagen){
        this.id = id;
        this.img = nombre_imagen;
        this.paisesComites = []; // Opcional: puede quedar vacío
    }
    getID (){
        return this.id
    }

}

// handler a cargo de la lógica
class handler {
    constructor() {
        this.instituciones = ['01. Universidad de Guadalajara (UdeG)',
                            '02. Instituto Tecnológico y de Estudios Superiores de Monterrey campus Guadalajara (TEC)', 
                            '03. Instituto de Educación Superior de Occidente (ITESO)', 
                            '04. Universidad Autónoma de Guadalajara (UAG)', 
                            '05. Universidad del Valle de Atemajac (UNIVA)', 
                            '06. Universidad Panamericana (UP)', 
                            '07. Universidad Politécnica de la Zona Metropolitana de Guadalajara', 
                            '08. Universidad Tecnológica de Jalisco',
                            '09. Universidad Tecnológica de la Zona Metropolitana de Guadalajara',
                            '10. Instituto Tecnológico José Mario Molina Pasquel y Henríquez.'];
        this.bloques = [];
        this.etapa = 0; // 0 = "previo al sorteo, 1 = sorteo de instituciones, 2 sorteo de bloques"
        this.bloques_sorteados = 0;

    }

    // Dado un array, revuelve sus contenidos
    revolver(array) {
        let indice_actual = array.length,  indice_aleatorio;
        while (indice_actual != 0) {
            // Elegir un elemento
            indice_aleatorio = Math.floor(Math.random() * indice_actual);
            indice_actual--;

            // E intercambiarlo por el actual
            [array[indice_actual], array[indice_aleatorio]] = [
                array[indice_aleatorio], array[indice_actual]
            ];
        }

        return array;
    }

    // Revuelve instituciones y bloques para repartir
    sorteo() {
        console.log("La etapa es: "+  this.etapa);
        switch (this.etapa) {
            case 0:
                // Imprimir instituciones en orden
                this.instituciones.forEach(institucion => {
                    gmHandler.crearFila(institucion);
                });
                // Transicionar a siguiente etapa
                boton_sorteo.innerHTML = "Sorteo de turnos";
                this.etapa++;
                break;
            case 1:
                // Revolver instituciones e imprimir
                this.instituciones = this.revolver(this.instituciones);
                this.borrarFilas();
                this.instituciones.forEach(institucion => {
                    gmHandler.crearFila(institucion);
                });
                //Transicionar a siguiente etapa (y rifar bloques)
                boton_sorteo.innerHTML = "Rifar bloque";
                this.bloques = this.revolver(this.bloques);
                this.etapa++;
                break;
            case 2:
                // Mostrar uno por uno los resultados hasta que se acaben
                this.borrarFilas();
                    this.bloques_sorteados++;
                    
                    // Imprimir completo los sorteados
                    for (let i = 0; i < this.bloques_sorteados; i++) {
                        this.crearFila(
                            this.instituciones[i],
                            this.bloques[i].id,
                            this.bloques[i].img
                        );
                    }
                    // Imprimir solo la institución de los no sorteados
                    for (let i = this.bloques_sorteados; i < this.instituciones.length; i++) {
                        this.crearFila(
                            this.instituciones[i]
                        );
                    }
                    // Transición hacia el fin del sorteo
                    if (this.bloques_sorteados == this.instituciones.length){
                        boton_sorteo.innerHTML = "Fin del sorteo";
                        this.bloques_sorteados++;;
                        
                    }
                    break;
            default:
                boton_sorteo.innerHTML = "Fin del sorteo";
                
        }
    }

    // Si las diapositivas se guardan como "imgk.PNG" para k=1,2,... esta función crea bloque
    // para cada k con su imagen respectiva en PNG
    crearBloques() {
        for (let index = 1; index < this.instituciones.length + 1; index++) {
            this.bloques.push(new bloque(index, "img" + index + ".PNG"));
        }
    }

    crearFila(institucion, bloque, img_filename) {
    // Preparar elementos
        let tabla = document.getElementById("tabla-sorteo")
        let fila = document.createElement("tr");
        let dato1 = document.createElement("td");
        dato1.innerHTML = institucion;
        let dato2 = document.createElement('td');

        // En caso de que se pase más de un argumento
        if (bloque != undefined || img_filename != undefined){
            let link = document.createElement('a');
            link.href = "./img/" + img_filename;
            link.target = "_blank";
            link.innerHTML = bloque;
            dato2.appendChild(link)
        }

        // Agregar elementos al DOM
        fila.appendChild(dato1);
        fila.appendChild(dato2);
        tabla.appendChild(fila);
    }

    borrarFilas (){
        let tabla = document.getElementById("tabla-sorteo");
        while (tabla.firstChild) {
            tabla.removeChild(tabla.firstChild);
        }
    }


}

// Al cargar página web
let gmHandler = new handler();
gmHandler.crearBloques();

//gmHandler.crearFila("HARVARD", 1, "img1.PNG");