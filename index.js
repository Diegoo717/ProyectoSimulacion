const btnAlgoritmoCM = document.querySelector("#btn1")
const btnAlgoritmoPM = document.querySelector("#btn2")
const btnAlgoritmoMC = document.querySelector("#btn3")

    const btnPruebaDeMedias = document.querySelector("pruebaDeMedias")
    const btnPruebaDeVarianza = document.querySelector("pruebaDeVarianza")
    const btnPruebaDeUniformidad = document.querySelector("pruebaDeUniformidad")

    const btnPruebaDeMedias2 = document.querySelector("pruebaDeMedias2")
    const btnPruebaDeVarianza2 = document.querySelector("pruebaDeVarianza2")
    const btnPruebaDeUniformidad2 = document.querySelector("pruebaDeUniformidad2")

    const btnPruebaDeMedias3 = document.querySelector("pruebaDeMedias3")
    const btnPruebaDeVarianza3 = document.querySelector("pruebaDeVarianza3")
    const btnPruebaDeUniformidad3 = document.querySelector("pruebaDeUniformidad3")

// Botones que activan los algoritmos

btnAlgoritmoCM.addEventListener("click", function(e) {
    e.preventDefault(); 
    algoritmoCM();
});

btnAlgoritmoPM.addEventListener("click", function(e) {
    e.preventDefault(); 
    algoritmoPM();
});

btnAlgoritmoMC.addEventListener("click", function(e) {
    e.preventDefault(); 
    algoritmoMC();
});

// Botones para cada prueba 

btnPruebaDeMedias.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeMedias();
})

btnPruebaDeVarianza.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeVarianza();
})

btnPruebaDeUniformidad.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeUniformidad();
})

btnPruebaDeMedias2.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeMedias();
})

btnPruebaDeVarianza2.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeVarianza();
})

btnPruebaDeUniformidad2.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeUniformidad();
})

btnPruebaDeMedias3.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeMedias();
})

btnPruebaDeVarianza3.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeVarianza();
})

btnPruebaDeUniformidad3.addEventListener("click", function(e){
    e.preventDefault();
    pruebaDeUniformidad();
})

//Primer algoritmo

function algoritmoCM() {
    const numInput = document.querySelector("#input1");
    const cantidadInput = document.querySelector("#cant1");
    let num = parseFloat(numInput.value) || 0; 
    const cantidad = parseInt(cantidadInput.value) || 0;

    const resultados = [];

    for (let i = 0; i < cantidad; i++) {
        const numCuadrado = Math.pow(num, 2);
        const numMedio = extraerCuatroDigitosDelMedio(numCuadrado);
        const r1 = '0.' + numMedio;

        resultados.push(r1);
        num = parseInt(numMedio); 
    }

    const h3 = document.querySelector("#resultado1");
    h3.textContent = resultados.join(", "); 
}

function extraerCuatroDigitosDelMedio(numero) {
    let numeroStr = numero.toString();

    while (numeroStr.length < 4) {
        numeroStr = '0' + numeroStr;
    }

    const longitud = numeroStr.length;
    const inicio = Math.floor((longitud - 4) / 2);

    const digitosMedio = numeroStr.substr(inicio, 4);
    
    return digitosMedio;
}

//Segundo algoritmo

function algoritmoPM() {

    const numInp1 = parseInt(document.querySelector("#input2").value);
    const numInp2 = parseInt(document.querySelector("#input3").value);
    const ri = parseInt(document.querySelector("#ri2").value);
    const textarea = document.querySelector("#resultado2");

    const resultados = [];

    let semilla1 = numInp1;
    let semilla2 = numInp2;

    let textoSalida = "Iteración | Y (Producto) | X (4 medios) | Ri\n";
    textoSalida += "-----------------------------------------------\n";

    for (let i = 0; i < ri; i++) {
        const producto = semilla1 * semilla2;
        const digitosMedios = extraerCuatroDigitosDelMedio(producto);
        const r = '0.' + digitosMedios;
        resultados.push(r);

        const iteracionStr = (i + 1).toString().padEnd(9);
        const productoStr = producto.toString().padEnd(13);
        const xStr = digitosMedios.toString().padEnd(13);
        const rStr = r.padEnd(6);

        textoSalida += `${iteracionStr} | ${productoStr} | ${xStr} | ${rStr}\n`;

        semilla1 = semilla2;

        semilla2 = parseInt(digitosMedios);
    }

    textarea.value = textoSalida;

}

//Tercer algoritmo


function algoritmoMC() {
    const semillaInput = document.querySelector("#input4").value.trim();
    const constanteInput = document.querySelector("#input5").value.trim();
    const cantidadInput = document.querySelector("#ri3").value.trim();
    const resultadoTextarea = document.querySelector("#resultado3");

    const semilla = parseInt(semillaInput);
    const constante = parseInt(constanteInput);
    const cantidad = parseInt(cantidadInput);

    if (isNaN(semilla) || isNaN(constante) || isNaN(cantidad)) {
        resultadoTextarea.value = "Por favor, ingrese todos los valores correctamente.";
        return;
    }

    let x = semilla;
    let resultado = "Iteración | Y (producto) | X (4 medios) | Ri\n";
    resultado += "-----------------------------------------------\n";

    for (let i = 0; i < cantidad; i++) {
        const producto = x * constante;
        const productoStr = producto.toString().padStart(8, '0');

        // Extraer los 4 dígitos centrales
        const inicio = Math.floor((productoStr.length - 4) / 2);
        const cuatroMedios = productoStr.substr(inicio, 4);

        const ri = `0.${cuatroMedios}`;

        resultado += `${(i + 1).toString().padEnd(9)} | ${productoStr.padEnd(13)} | ${cuatroMedios.padEnd(13)} | ${ri}\n`;

        x = parseInt(cuatroMedios);
    }

    resultadoTextarea.value = resultado;
}

// Prueba de medias

function pruebaDeMedias(){

}

// Prueba de varianza

function pruebaDeVarianza(){
    
}

// Prueba de uniformidad

function pruebaDeUniformidad(){
    
}