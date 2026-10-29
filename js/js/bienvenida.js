// 1. Comprobar que hay usuario; si no, volver al login
const datosUsuario = localStorage.getItem("usuarioActual");
if (!datosUsuario) {
  window.location.href = "../index.html";
}
const usuario = JSON.parse(datosUsuario);

// 2. Saludo en la cabecera
document.getElementById("saludo").textContent = "Hola, " + usuario.nombre;

// 3. Al pulsar Jugar, guardar el nivel marcado e ir al juego
document.getElementById("btnInicio").addEventListener("click", function () {
  const marcado = document.querySelector('input[name="nivel"]:checked');
  sessionStorage.setItem("nivel", marcado.value);
  window.location.href = "juego.html";
});