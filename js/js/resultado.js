// 1. Leer los datos de la partida
const ganado = sessionStorage.getItem("ganado") === "true";
const parejas = sessionStorage.getItem("parejas");
const tiempoRestante = sessionStorage.getItem("tiempoRestante");
const tiempoUsado = 30 - Number(tiempoRestante);

// 2. Mostrar el resultado
document.getElementById("titulo").textContent = ganado ? "¡Has ganado! 🎉" : "Has perdido 😢";
document.getElementById("resumen").textContent =
  "Parejas encontradas: " + parejas + " · Tiempo empleado: " + tiempoUsado + " s";

// 3. Botones
document.getElementById("btnJugar").addEventListener("click", function () {
  window.location.href = "bienvenida.html";
});

document.getElementById("btnSalir").addEventListener("click", function () {
  sessionStorage.clear();
  localStorage.removeItem("usuarioActual");
  window.location.href = "../index.html";
});