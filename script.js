

class bloque {
    constructor(id){
        this.paisesComites = []
        this.identificadorBloque = id;
    }
    getId (){
        return this.identificadorBloque
    }
}

class handler {
    constructor(){
        this.instituciones = ['','b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.bloques = [];
        for (let index = 1; index < this.instituciones.length + 1; index++) {
            this.bloques.push(new bloque(index));
        }
    }



    revolver(array) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
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