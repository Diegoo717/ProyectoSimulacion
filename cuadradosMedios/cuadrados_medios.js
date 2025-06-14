const btnAlgoritmoCM = document.querySelector("#btn1");
const btnPruebaDeMedias = document.querySelector("#pruebaDeMedias");
const btnPruebaDeVarianza = document.querySelector("#pruebaDeVarianza");
const btnPruebaDeUniformidad = document.querySelector("#pruebaDeUniformidad");

// Botón que activa el algoritmo
btnAlgoritmoCM.addEventListener("click", function (e) {
  e.preventDefault();
  algoritmoCM();
});

// Botones para cada prueba
btnPruebaDeMedias.addEventListener("click", function (e) {
  e.preventDefault();
  // Obtener los números del primer algoritmo
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
  // Obtener los números del primer algoritmo
  const numerosTexto = document.querySelector("#resultado1").textContent;
  if (numerosTexto.trim() === "") {
    alert(
      "Primero debes generar números pseudoaleatorios con el algoritmo de cuadrados medios"
    );
    return;
  }
  const numeros = numerosTexto.split(", ").map((num) => parseFloat(num));
  const nivelConfianza = parseInt(document.querySelector("#confianza").value);
  pruebaDeVarianza(numeros, nivelConfianza, "resultadoPruebaDeVarianza");
});

btnPruebaDeUniformidad.addEventListener("click", function (e) {
  e.preventDefault();
  // Obtener los números del primer algoritmo
  const numerosTexto = document.querySelector("#resultado1").textContent;
  if (numerosTexto.trim() === "") {
    alert(
      "Primero debes generar números pseudoaleatorios con el algoritmo de cuadrados medios"
    );
    return;
  }
  const numeros = numerosTexto.split(", ").map((num) => parseFloat(num));
  const nivelConfianza = parseInt(document.querySelector("#confianza").value);
  pruebaDeUniformidad(numeros, nivelConfianza, "resultadoPruebaDeUniformidad");
});

// Algoritmo de cuadrados medios
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

// Función para aproximar la función inversa de Chi-cuadrado
function chiSquareInverse(probability, degreesOfFreedom) {
  // Aproximación usando la transformación de Wilson-Hilferty
  const h = 2 / (9 * degreesOfFreedom);
  const c = 1 - h;
  const z = normalInverse(probability);
  
  const x = degreesOfFreedom * Math.pow(c + z * Math.sqrt(h), 3);
  return Math.max(0, x);
}

// Función para aproximar la función inversa normal estándar
function normalInverse(p) {
  // Aproximación de Beasley-Springer-Moro
  const a = [0, -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [0, -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [0, -7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [0, 7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

  let q, t, u;

  if (p < 0 || p > 1) {
    return NaN;
  } else if (p === 0) {
    return -Infinity;
  } else if (p === 1) {
    return Infinity;
  } else if (p < 1e-20) {
    return -8.2;
  } else if (p > 1 - 1e-20) {
    return 8.2;
  }

  if (p < 0.02425) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) /
           ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1);
  } else if (p < 0.97575) {
    q = p - 0.5;
    t = q * q;
    return (((((a[1] * t + a[2]) * t + a[3]) * t + a[4]) * t + a[5]) * t + a[6]) * q /
           (((((b[1] * t + b[2]) * t + b[3]) * t + b[4]) * t + b[5]) * t + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[1] * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) * q + c[6]) /
            ((((d[1] * q + d[2]) * q + d[3]) * q + d[4]) * q + 1);
  }
}

// Implementación de las pruebas

// Prueba de medias
function pruebaDeMedias(numeros, nivelConfianza, elementoResultado) {
  const n = numeros.length;
  const media = numeros.reduce((sum, num) => sum + num, 0) / n;
  const mediaEsperada = 0.5; // Para números uniformes entre 0 y 1

  // Calcular varianza muestral
  const varianza =
    numeros.reduce((sum, num) => sum + Math.pow(num - media, 2), 0) / (n - 1);
  const desviacionEstandar = Math.sqrt(varianza);

  // Estadístico de prueba (t-student para muestras pequeñas)
  const estadisticoT =
    (media - mediaEsperada) / (desviacionEstandar / Math.sqrt(n));

  // Valores críticos aproximados para diferentes niveles de confianza
  let valorCritico;
  switch (nivelConfianza) {
    case 90:
      valorCritico = 1.645;
      break;
    case 95:
      valorCritico = 1.96;
      break;
    case 99:
      valorCritico = 2.576;
      break;
    default:
      valorCritico = 1.96;
  }

  const esAceptable = Math.abs(estadisticoT) <= valorCritico;

  let resultado = `Prueba de Medias (${nivelConfianza}% confianza):\n`;
  resultado += `Media calculada: ${media.toFixed(6)}\n`;
  resultado += `Media esperada: ${mediaEsperada}\n`;
  resultado += `Estadístico t: ${estadisticoT.toFixed(4)}\n`;
  resultado += `Valor crítico: ±${valorCritico}\n`;
  resultado += `Resultado: ${esAceptable ? "ACEPTABLE" : "NO ACEPTABLE"}`;

  document.querySelector(`#${elementoResultado}`).textContent = resultado;
}

// Prueba de varianza CORREGIDA según fórmulas de Excel
function pruebaDeVarianza(numeros, nivelConfianza, elementoResultado) {
  const n = numeros.length;
  const media = numeros.reduce((sum, num) => sum + num, 0) / n;

  // Varianza muestral
  const varianzaMuestral =
    numeros.reduce((sum, num) => sum + Math.pow(num - media, 2), 0) / (n - 1);
  
  const varianzaEsperada = 1 / 12; // Para distribución uniforme entre 0 y 1
  const gl = n - 1; // grados de libertad

  // Estadístico Chi-cuadrado
  const chiCuadrado = (gl * varianzaMuestral) / varianzaEsperada;

  // Calcular límites usando las fórmulas exactas de Excel
  const alpha = (100 - nivelConfianza) / 100;
  
  // CHISQ.INV(0.975, gl) para límite superior y CHISQ.INV(0.025, gl) para límite inferior
  const chiSuperior = chiSquareInverse(1 - alpha/2, gl);
  const chiInferior = chiSquareInverse(alpha/2, gl);
  
  // Límites para la varianza (no para chi-cuadrado)
  // Fórmula: chi / (12 * (n-1))
  const limiteSuperior = chiSuperior / (12 * gl);
  const limiteInferior = chiInferior / (12 * gl);

  const esAceptable = varianzaMuestral >= limiteInferior && varianzaMuestral <= limiteSuperior;

  let resultado = `Prueba de Varianza (${nivelConfianza}% confianza):\n`;
  resultado += `n = ${n}\n`;
  resultado += `Grados de libertad = ${gl}\n`;
  resultado += `Varianza calculada: ${varianzaMuestral.toFixed(9)}\n`;
  resultado += `Varianza esperada (1/12): ${varianzaEsperada.toFixed(6)}\n`;
  resultado += `Chi-cuadrado: ${chiCuadrado.toFixed(8)}\n`;
  resultado += `Chi-cuadrado superior (tabla): ${chiSuperior.toFixed(8)}\n`;
  resultado += `Chi-cuadrado inferior (tabla): ${chiInferior.toFixed(8)}\n`;
  resultado += `Límite superior varianza: ${limiteSuperior.toFixed(10)}\n`;
  resultado += `Límite inferior varianza: ${limiteInferior.toFixed(12)}\n`;
  resultado += `Resultado: ${esAceptable ? "ACEPTABLE" : "NO ACEPTABLE"}\n`;
  resultado += `\nH0: σ² = 1/12 (varianza de distribución uniforme)\n`;
  resultado += `H1: σ² ≠ 1/12`;

  document.querySelector(`#${elementoResultado}`).textContent = resultado;
}

// Prueba de uniformidad (Kolmogorov-Smirnov)
function pruebaDeUniformidad(numeros, nivelConfianza, elementoResultado) {
  const n = numeros.length;

  // Ordenar los números
  const numerosOrdenados = [...numeros].sort((a, b) => a - b);

  // Calcular estadístico D de Kolmogorov-Smirnov
  let dMax = 0;

  for (let i = 0; i < n; i++) {
    const xi = numerosOrdenados[i];
    const fn = (i + 1) / n; // Función de distribución empírica
    const f0 = xi; // Función de distribución teórica uniforme (0,1)

    const d1 = Math.abs(fn - f0);
    const d2 = Math.abs(i / n - f0);

    dMax = Math.max(dMax, d1, d2);
  }

  // Valores críticos aproximados para Kolmogorov-Smirnov
  let valorCritico;
  switch (nivelConfianza) {
    case 90:
      valorCritico = 1.22 / Math.sqrt(n);
      break;
    case 95:
      valorCritico = 1.36 / Math.sqrt(n);
      break;
    case 99:
      valorCritico = 1.63 / Math.sqrt(n);
      break;
    default:
      valorCritico = 1.36 / Math.sqrt(n);
  }

  const esAceptable = dMax <= valorCritico;

  let resultado = `Prueba de Uniformidad K-S (${nivelConfianza}% confianza):\n`;
  resultado += `Estadístico D: ${dMax.toFixed(6)}\n`;
  resultado += `Valor crítico: ${valorCritico.toFixed(6)}\n`;
  resultado += `Tamaño de muestra: ${n}\n`;
  resultado += `Resultado: ${
    esAceptable ? "ACEPTABLE (Uniforme)" : "NO ACEPTABLE (No uniforme)"
  }`;

  document.querySelector(`#${elementoResultado}`).textContent = resultado;
}