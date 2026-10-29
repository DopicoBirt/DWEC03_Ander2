// 1. Leer los datos de la partida
const ganado = sessionStorage.getItem("ganado") === "true";
const parejas = sessionStorage.getItem("parejas");
const totalParejas = sessionStorage.getItem("totalParejas");
const intentos = sessionStorage.getItem("intentos");
const tiempoRestante = sessionStorage.getItem("tiempoRestante");
const tiempoUsado = 30 - Number(tiempoRestante);

// 2. Título y frase según ganes o pierdas
if (ganado) {
  document.getElementById("titulo").textContent = "¡Has ganado!";
  document.getElementById("resumen").textContent = "Has encontrado las " + totalParejas + " parejas";
} else {
  document.getElementById("icono").textContent = "⏰";
  document.getElementById("titulo").textContent = "¡Se acabó el tiempo!";
  document.getElementById("resumen").textContent = "Has encontrado " + parejas + " de " + totalParejas + " parejas";
}

// 3. Rellenar las tres cajitas
document.getElementById("datoTiempo").textContent = tiempoUsado + " s";
document.getElementById("datoIntentos").textContent = intentos;
document.getElementById("datoParejas").textContent = parejas + " / " + totalParejas;

// 4. Botones
document.getElementById("btnJugar").addEventListener("click", function () {
  window.location.href = "bienvenida.html";
});

document.getElementById("btnSalir").addEventListener("click", function () {
  sessionStorage.clear();
  localStorage.removeItem("usuarioActual");
  window.location.href = "../index.html";
});