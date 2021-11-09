//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let datos = JSON.parse(localStorage.getItem('form'));//Recupero lo que guarde en LocalStorage
    console.log(datos);
    if (datos != null) {
        document.getElementById('name').value = datos.name;
        document.getElementById('surname').value = datos.surname;
        document.getElementById('age').value = datos.age;
        document.getElementById('email').value = datos.email;
        document.getElementById('cel').value = datos.phone;
        document.getElementById('file').value = datos.file;
    }


let button = document.getElementById('submit')//Capturo el boton

button.addEventListener('click', function (e) { //Escucha de evento
    e.preventDefault();

    let contenedor = {};//Inicializo para luego guardar los datos
    //Guardo los datos dentro de .popiedad
    contenedor.name = document.getElementById('name').value;
    contenedor.surname = document.getElementById('surname').value;
    contenedor.age = document.getElementById('age').value;
    contenedor.email = document.getElementById('email').value;
    contenedor.phone = document.getElementById('cel').value;
    contenedor.file = document.getElementById('file').value;


    localStorage.setItem('form', JSON.stringify(contenedor));//Las almaceno en memoria local

})

});

