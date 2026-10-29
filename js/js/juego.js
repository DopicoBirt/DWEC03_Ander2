// 1. Leer el nivel que guardó la bienvenida
const nivel = sessionStorage.getItem("nivel") || "principiante";
const nombresNivel = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado"
};
document.getElementById("textoNivel").textContent = "Nivel: " + nombresNivel[nivel];

// 2. Cuántas parejas hay en cada nivel
let numParejas;
if (nivel === "principiante") {
  numParejas = 4;   // 4x2 = 8 cartas
} else if (nivel === "intermedio") {
  numParejas = 6;   // 4x3 = 12 cartas
} else {
  numParejas = 8;   // 4x4 = 16 cartas
}
document.getElementById("totalParejas").textContent = numParejas;

// 3. Los dibujos de las cartas
const simbolos = ["★", "♥", "♦", "♣", "♠", "●", "▲", "■"];

// 4. Coger los que hacen falta y duplicarlos (cada uno 2 veces = pareja)
const elegidos = simbolos.slice(0, numParejas);
const cartas = elegidos.concat(elegidos);

// 5. Barajar
cartas.sort(() => Math.random() - 0.5);

// console.log(cartas);

let primera = null;
let segunda = null;
let bloqueado = false;
let parejasEncontradas = 0;
let pausado = false;
let intentos = 0;

function voltear(e) {
  const carta = e.currentTarget;
  
  if (pausado || bloqueado || carta === primera || carta.classList.contains("acertada")) return;

  carta.textContent = carta.dataset.simbolo;

  if (primera === null) {
    primera = carta;
    return;
  }

  segunda = carta;
  bloqueado = true;

  intentos++;
document.getElementById("intentos").textContent = intentos;

  if (primera.dataset.simbolo === segunda.dataset.simbolo) {
    primera.classList.add("acertada");
    segunda.classList.add("acertada");
    parejasEncontradas++;
    document.getElementById("parejas").textContent = parejasEncontradas;
        if (parejasEncontradas === numParejas) {
      clearInterval(intervalo);
      setTimeout(function () {
        terminarPartida(true);
      }, 500);
    }

    reiniciarTurno();
  } else {
    setTimeout(function () {
      primera.textContent = "?";
      segunda.textContent = "?";
      reiniciarTurno();
    }, 1000);
  }
}

function reiniciarTurno() {
  primera = null;
  segunda = null;
  bloqueado = false;
}

// 6. Crear cada carta en la página
const tablero = document.getElementById("tablero");

cartas.forEach(function (simbolo) {
  const carta = document.createElement("div");
  carta.classList.add("carta");
  carta.dataset.simbolo = simbolo;
  carta.textContent = "?";
  carta.addEventListener("mousedown", voltear);
    carta.addEventListener("mouseenter", function () {
    carta.classList.add("resaltada");
  });
  carta.addEventListener("mouseleave", function () {
    carta.classList.remove("resaltada");
  });
  carta.addEventListener("transitionend", function (e) {
    if (e.propertyName === "background-color" && carta.classList.contains("acertada")) {
      carta.classList.add("completada");
    }
  });
  
  tablero.appendChild(carta);
});

// 7. Temporizador de 30 segundos
let tiempoRestante = 30;
const spanTiempo = document.getElementById("tiempo");

const intervalo = setInterval(function () {
  if (pausado) return;
  tiempoRestante--;
  spanTiempo.textContent = tiempoRestante;
  document.getElementById("barraRelleno").style.width = (tiempoRestante / 30 * 100) + "%";

  if (tiempoRestante <= 0) {
    clearInterval(intervalo);
    terminarPartida(false);
  }
}, 1000);

function terminarPartida(ganado) {
  sessionStorage.setItem("ganado", ganado);
  sessionStorage.setItem("parejas", parejasEncontradas);
  sessionStorage.setItem("tiempoRestante", tiempoRestante);
  sessionStorage.setItem("intentos", intentos);
  sessionStorage.setItem("totalParejas", numParejas);
  window.location.href = "resultado.html";
}

// 8. Pausa con la tecla P
document.addEventListener("keydown", function (e) {
  if (e.key === "p" || e.key === "P") {
    pausado = !pausado;
    document.getElementById("tablero").classList.toggle("en-pausa");
  }
});

