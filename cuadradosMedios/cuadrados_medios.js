function algoritmoCM() {
  const numInput = document.querySelector("#input1");
  const cantidadInput = document.querySelector("#cant1");
  let num = parseFloat(numInput.value) || 0;
  const cantidad = parseInt(cantidadInput.value) || 0;

  const resultados = [];

  for (let i = 0; i < cantidad; i++) {
    const numCuadrado = Math.pow(num, 2);
    const numMedio = extraerCuatroDigitosDelMedio(numCuadrado);
    const r1 = "0." + numMedio;

    resultados.push(r1);
    num = parseInt(numMedio);
  }

  const h3 = document.querySelector("#resultado1");
  h3.textContent = resultados.join(", ");
}

function extraerCuatroDigitosDelMedio(numero) {
  let numeroStr = numero.toString();

  while (numeroStr.length < 4) {
    numeroStr = "0" + numeroStr;
  }

  const longitud = numeroStr.length;
  const inicio = Math.floor((longitud - 4) / 2);

  const digitosMedio = numeroStr.substring(inicio, inicio + 4);

  return digitosMedio;
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

  document.getElementById("resultadoPruebaDeVarianza").textContent = "";
  document.getElementById("resultadoPruebaDeUniformidad").textContent = "";
}

function pruebaDeVarianza(numeros, nivelConfianza, elementoResultadoId) {
  const n = numeros.length;
  if (n === 0) {
    document.getElementById(elementoResultadoId).textContent = "No hay números para probar";
    return;
  }

  const media = numeros.reduce((a, b) => a + b, 0) / n;
  const varianzaMuestral = numeros.reduce((acc, x) => acc + Math.pow(x - media, 2), 0) / n;

  let alfa;
  switch (nivelConfianza) {
    case 90:
      alfa = 0.10;
      break;
    case 95:
      alfa = 0.05;
      break;
    case 99:
      alfa = 0.01;
      break;
    default:
      alfa = 0.05;
  }

  const chiCuadradoInferior = jStat.chisquare.inv(1 - alfa / 2, n - 1);
  const chiCuadradoSuperior = jStat.chisquare.inv(alfa / 2, n - 1);
  const varianzaEsperada = 1 / 12;

  const limiteInferior = ((n - 1) * varianzaEsperada) / chiCuadradoInferior;
  const limiteSuperior = ((n - 1) * varianzaEsperada) / chiCuadradoSuperior;

  const aceptable = varianzaMuestral >= limiteInferior && varianzaMuestral <= limiteSuperior;
  const resultado = aceptable ? "ACEPTABLE" : "NO ACEPTABLE";

  const resultadoHTML = `
    <div class="resultado-prueba">
      <p><strong>Prueba de Varianza (Nivel de confianza ${nivelConfianza}%)</strong></p>
      <p>Varianza muestral (S²): ${varianzaMuestral.toFixed(6)}</p>
      <p>Límite inferior: ${limiteInferior.toFixed(6)}</p>
      <p>Límite superior: ${limiteSuperior.toFixed(6)}</p>
      <p class="${aceptable ? 'aceptable' : 'no-aceptable'}">Resultado: ${resultado}</p>
    </div>
  `;

  document.getElementById(elementoResultadoId).innerHTML = resultadoHTML;

  document.getElementById("resultadoPruebaDeMedias").textContent = "";
  document.getElementById("resultadoPruebaDeUniformidad").textContent = "";
}

const btnAlgoritmoCM = document.querySelector("#btn1");
const btnPruebaDeMedias = document.querySelector("#pruebaDeMedias");
const btnPruebaDeVarianza = document.querySelector("#pruebaDeVarianza");
const btnPruebaDeUniformidad = document.querySelector("#pruebaDeUniformidad");

btnAlgoritmoCM.addEventListener("click", function (e) {
  e.preventDefault();
  algoritmoCM();
});

btnPruebaDeMedias.addEventListener("click", function (e) {
  e.preventDefault();
  const numerosTexto = document.querySelector("#resultado1").textContent;
  if (numerosTexto.trim() === "") {
    alert(
      "Primero debes generar números pseudoaleatorios con el algoritmo de cuadrados medios"
    );
    return;
  }
  const numeros = numerosTexto.split(", ").map((num) => parseFloat(num));
  const nivelConfianza = parseInt(document.querySelector("#confianza").value);
  pruebaDeMedias(numeros, nivelConfianza, "resultadoPruebaDeMedias");
});

btnPruebaDeVarianza.addEventListener("click", function (e) {
  e.preventDefault();
  const numerosTexto = document.querySelector("#resultado1").textContent;
  if (numerosTexto.trim() === "") {
    alert("Primero debes generar números pseudoaleatorios con el algoritmo de cuadrados medios");
    return;
  }
  const numeros = numerosTexto.split(", ").map((num) => parseFloat(num));
  const nivelConfianza = parseInt(document.querySelector("#confianza").value);
  pruebaDeVarianza(numeros, nivelConfianza, "resultadoPruebaDeVarianza");
});


btnPruebaDeUniformidad.addEventListener("click", function (e) {
  e.preventDefault();
  const numerosTexto = document.querySelector("#resultado1").textContent;
  if (numerosTexto.trim() === "") {
    alert(
      "Primero debes generar números pseudoaleatorios con el algoritmo de cuadrados medios"
    );
    return;
  }
  const numeros = numerosTexto.split(", ").map((num) => parseFloat(num));
  const nivelConfianza = parseInt(document.querySelector("#confianza").value);

  document.getElementById("resultadoPruebaDeUniformidad").textContent = "Prueba de uniformidad no implementada aún";
});