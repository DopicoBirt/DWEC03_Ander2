// 1. Leer quién ha hecho login
const datos = localStorage.getItem("usuarioActual");
if (!datos) {
  window.location.href = "../index.html";
}
const usuario = JSON.parse(datos);

// 2. Saludar
document.getElementById("saludo").textContent = "¡Hola, " + usuario.nombre + "!";

// 3. Botón Empezar
const btnInicio = document.getElementById("btnInicio");
btnInicio.addEventListener("click", function () {
  const nivel = document.getElementById("selectNivel").value;
  sessionStorage.setItem("nivel", nivel);
  window.location.href = "juego.html";
});