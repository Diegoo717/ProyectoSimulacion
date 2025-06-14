function algoritmoProductosMedios() {
  const semilla1 = parseInt(document.getElementById("input2").value) || 0;
  const semilla2 = parseInt(document.getElementById("input3").value) || 0;
  const cantidad = parseInt(document.getElementById("ri2").value) || 0;

  if (semilla1 === 0 || semilla2 === 0 || cantidad === 0) {
    alert("Por favor ingrese valores válidos para ambas semillas y la cantidad de números a generar");
    return;
  }

  let x0 = semilla1;
  let x1 = semilla2;
  const resultados = [];

  for (let i = 0; i < cantidad; i++) {
    const producto = x0 * x1;
    const productoStr = producto.toString();

    const digitosMedio = extraerDigitosMedio(productoStr, x0.toString().length);

    const ri = parseFloat("0." + digitosMedio);
    resultados.push(ri);

    x0 = x1;
    x1 = parseInt(digitosMedio);
  }

  document.getElementById("resultado2").value = resultados.join("\n");
}

function extraerDigitosMedio(numeroStr, longitudSemilla) {
  while (numeroStr.length < longitudSemilla * 2) {
    numeroStr = "0" + numeroStr;
  }

  const inicio = Math.floor((numeroStr.length - longitudSemilla) / 2);
  return numeroStr.substring(inicio, inicio + longitudSemilla);
}

function pruebaDeMedias(numeros, nivelConfianza, elementoResultadoId) {
  const n = numeros.length;
  if (n === 0) {
    document.getElementById(elementoResultadoId).textContent = "No hay números para probar";
    return;
  }

  const promedio = numeros.reduce((sum, num) => sum + num, 0) / n;

  let z;
  switch (nivelConfianza) {
    case 90:
      z = 1.65;
      break;
    case 95:
      z = 1.96;
      break;
    case 99:
      z = 2.58;
      break;
    default:
      z = 1.96; 
  }

  const termino = z * (1 / Math.sqrt(12 * n));
  const limiteInferior = 0.5 - termino;
  const limiteSuperior = 0.5 + termino;

  const aceptable = promedio >= limiteInferior && promedio <= limiteSuperior;
  const resultado = aceptable ? "ACEPTABLE" : "NO ACEPTABLE";

  const resultadoHTML = `
    <div class="resultado-prueba">
      <p><strong>Prueba de Medias (Nivel de confianza ${nivelConfianza}%)</strong></p>
      <p>Promedio de los números (μ): ${promedio.toFixed(6)}</p>
      <p>Límite inferior: ${limiteInferior.toFixed(6)}</p>
      <p>Límite superior: ${limiteSuperior.toFixed(6)}</p>
      <p class="${aceptable ? 'aceptable' : 'no-aceptable'}">Resultado: ${resultado}</p>
    </div>
  `;

  document.getElementById(elementoResultadoId).innerHTML = resultadoHTML;

  document.getElementById("resultadoPruebaDeVarianza2").textContent = "";
  document.getElementById("resultadoPruebaDeUniformidad2").textContent = "";
}

document.getElementById("btn2").addEventListener("click", function(e) {
  e.preventDefault();
  algoritmoProductosMedios();
});

document.getElementById("pruebaDeMedias2").addEventListener("click", function(e) {
  e.preventDefault();
  const numerosTexto = document.getElementById("resultado2").value;
  if (numerosTexto.trim() === "") {
    alert("Primero debes generar números pseudoaleatorios con el algoritmo de productos medios");
    return;
  }
  const numeros = numerosTexto.split("\n").map(num => parseFloat(num));
  const nivelConfianza = parseInt(document.getElementById("confianza2").value);
  pruebaDeMedias(numeros, nivelConfianza, "resultadoPruebaDeMedias2");
});

document.getElementById("pruebaDeVarianza2").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("resultadoPruebaDeVarianza2").textContent = "Prueba de varianza no implementada aún";
});

document.getElementById("pruebaDeUniformidad2").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("resultadoPruebaDeUniformidad2").textContent = "Prueba de uniformidad no implementada aún";
});