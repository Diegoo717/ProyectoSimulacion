function algoritmoMultiplicadorConstante() {
  const semilla = parseInt(document.getElementById("input4").value) || 0;
  const constante = parseInt(document.getElementById("input5").value) || 0;
  const cantidad = parseInt(document.getElementById("ri3").value) || 0;

  if (semilla === 0 || constante === 0 || cantidad === 0) {
    alert("Por favor ingrese valores válidos para la semilla, constante y cantidad de números a generar");
    return;
  }

  let xn = semilla;
  const resultados = [];
  const digitosSemilla = semilla.toString().length;

  for (let i = 0; i < cantidad; i++) {
    const producto = constante * xn;
    const productoStr = producto.toString();

    const digitosMedio = extraerDigitosMedio(productoStr, digitosSemilla);

    const ri = parseFloat("0." + digitosMedio);
    resultados.push(ri);

    xn = parseInt(digitosMedio);
  }

  document.getElementById("resultado3").value = resultados.join("\n");
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

  document.getElementById("resultadoPruebaDeVarianza3").textContent = "";
  document.getElementById("resultadoPruebaDeUniformidad3").textContent = "";
}

function pruebaDeVarianza(numeros, nivelConfianza, elementoResultadoId) {
  const n = numeros.length;
  if (n === 0) {
    document.getElementById(elementoResultadoId).textContent = "No hay números para probar";
    return;
  }

  // 1. Cálculo de la varianza muestral
  const media = numeros.reduce((sum, num) => sum + num, 0) / n;
  const varianza = numeros.reduce((sum, num) => sum + Math.pow(num - media, 2), 0) / (n - 1);

  // 2. Varianza teórica de U[0,1]
  const varianzaEsperada = 1 / 12;

  // 3. Cálculo del estadístico chi-cuadrada
  const chiCuadrada = ((n - 1) * varianza) / varianzaEsperada;

  // 4. Valores críticos para el nivel de confianza
  let alpha;
  switch (nivelConfianza) {
    case 90: alpha = 0.10; break;
    case 95: alpha = 0.05; break;
    case 99: alpha = 0.01; break;
    default: alpha = 0.05;
  }

  const chiCuadradaInferior = jStat.chisquare.inv(alpha / 2, n - 1);
  const chiCuadradaSuperior = jStat.chisquare.inv(1 - alpha / 2, n - 1);

  // 5. Evaluación del resultado
  const aceptable = chiCuadrada >= chiCuadradaInferior && chiCuadrada <= chiCuadradaSuperior;
  const resultado = aceptable ? "ACEPTABLE" : "NO ACEPTABLE";

  const resultadoHTML = `
    <div class="resultado-prueba">
      <p><strong>Prueba de Varianza (Nivel de confianza ${nivelConfianza}%)</strong></p>
      <p>Varianza muestral (S²): ${varianza.toFixed(6)}</p>
      <p>Chi-cuadrada calculada: ${chiCuadrada.toFixed(6)}</p>
      <p>Límite inferior: ${chiCuadradaInferior.toFixed(6)}</p>
      <p>Límite superior: ${chiCuadradaSuperior.toFixed(6)}</p>
      <p class="${aceptable ? 'aceptable' : 'no-aceptable'}">Resultado: ${resultado}</p>
    </div>
  `;

  document.getElementById(elementoResultadoId).innerHTML = resultadoHTML;

  document.getElementById("resultadoPruebaDeMedias3").textContent = "";
  document.getElementById("resultadoPruebaDeUniformidad3").textContent = "";
}


document.getElementById("btn3").addEventListener("click", function(e) {
  e.preventDefault();
  algoritmoMultiplicadorConstante();
});

document.getElementById("pruebaDeMedias3").addEventListener("click", function(e) {
  e.preventDefault();
  const numerosTexto = document.getElementById("resultado3").value;
  if (numerosTexto.trim() === "") {
    alert("Primero debes generar números pseudoaleatorios con el algoritmo de multiplicador constante");
    return;
  }
  const numeros = numerosTexto.split("\n").map(num => parseFloat(num));
  const nivelConfianza = parseInt(document.getElementById("confianza3").value);
  pruebaDeMedias(numeros, nivelConfianza, "resultadoPruebaDeMedias3");
});

document.getElementById("pruebaDeVarianza3").addEventListener("click", function(e) {
  e.preventDefault();
  const numerosTexto = document.getElementById("resultado3").value;
  if (numerosTexto.trim() === "") {
    alert("Primero debes generar números pseudoaleatorios con el algoritmo de multiplicador constante");
    return;
  }
  const numeros = numerosTexto.split("\n").map(num => parseFloat(num));
  const nivelConfianza = parseInt(document.getElementById("confianza3").value);
  pruebaDeVarianza(numeros, nivelConfianza, "resultadoPruebaDeVarianza3");
});


document.getElementById("pruebaDeUniformidad3").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("resultadoPruebaDeUniformidad3").textContent = "Prueba de uniformidad no implementada aún";
});