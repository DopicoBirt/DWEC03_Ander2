const jsonUsuarios = `[   
   {
      "id":1,
      "nombre" : "Iker",
      "apellido" : "Arana",
      "usuario":"iarana",
      "contraseña":"1234Abcd"
   },
   {
      "id":2,
      "nombre" : "Ander",
      "apellido" : "Goikoetxea",
      "usuario":"agoikoetxea",
      "contraseña":"5678Efgh"
   },

   {
      "id":3,
      "nombre" : "Jokin",
      "apellido" : "Olano",
      "usuario":"jolano",
      "contraseña":"9012Ijkl"
   }
]`;

const listaUsuarios = JSON.parse(jsonUsuarios);
console.log(listaUsuarios);
localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));


const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  const mensajeError = document.getElementById("mensajeError");
  mensajeError.textContent = "";

  // 1. Comprobar el formato de la contraseña
  const patron = /^[a-zA-Z0-9]+$/;
  if (!patron.test(contrasena)) {
    mensajeError.textContent = "La contraseña solo puede tener letras y números";
    return;
  }

  // 2. Buscar el usuario en la lista
  const encontrado = listaUsuarios.find(
    (u) => u.usuario === usuario && u.contraseña === contrasena
  );

  if (encontrado) {
    localStorage.setItem("usuarioActual", JSON.stringify(encontrado));
    window.location.href = "HTML/bienvenida.html";
  } else {
    mensajeError.textContent = "Usuario o contraseña incorrectos";
  }
  

});
