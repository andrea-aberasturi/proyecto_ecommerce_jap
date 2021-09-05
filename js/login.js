//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    //Corroborar que efectivamente los datos de usuario se almacenen
    const form = document.getElementById('form'); //Capturo el formulario
    const usuario = document.getElementById('typeEmailX'); //Capturo el imput email
    //const password = document.getElementById('typePasswordX'); //Capturo el password

    form.addEventListener('submit', function (e) { //Escucha de evento submit
       // e.preventDefault();
        localStorage.setItem('user', usuario.value); //Guardo el nombre de usuario email
        //localStorage.setItem('password', password.value); //Guardo el password
       location.href('home.html')
      // e.stopPropagation();
    });
});