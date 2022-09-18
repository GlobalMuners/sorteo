
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
        this.instituciones = ['Universidad de Guadalajara (UdeG)',
                            'Instituto Tecnológico y de Estudios Superiores de Monterrey campus Guadalajara (TEC)', 
                            'Instituto de Educación Superior de Occidente (ITESO)', 
                            'Universidad Autónoma de Guadalajara (UAG)', 
                            'Universidad del Valle de Atemajac (UNIVA)', 
                            'Universidad Panamericana (UP)', 
                            'Universidad Politécnica de la Zona Metropolitana de Guadalajara', 
                            'Universidad Tecnológica de Jalisco',
                            'Universidad Tecnológica de la Zona Metropolitana de Guadalajara',
                            'Instituto Tecnológico José Mario Molina Pasquel y Henríquez.'];
        this.bloques = [];
        for (let index = 1; index < this.instituciones.length + 1; index++) {
            this.bloques.push(new bloque(index));
        }
    }

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

    iniciarRifa() {
        this.instituciones = this.revolver(this.instituciones)
        this.bloques = this.revolver(this.bloques);
        for (let i = 0; i < this.instituciones.length; i++) {
            console.log("Institución: " + this.instituciones[i]);
            console.log("Sacó: " + this.bloques[i].getId())
        }
    }

    
}