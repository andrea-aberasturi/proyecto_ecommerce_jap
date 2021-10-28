//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let button = document.getElementById('submit')

    button.addEventListener('click', function (e) {
        e.preventDefault();

        let name = document.getElementById('name').value;
        let surname = document.getElementById('surname').value;
        let age = document.getElementById('age').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('cel').value;

        let contenedor = {
            name,
            surname,
            age,
            email,
            phone
        }
        localStorage.setItem('form', JSON.stringify(contenedor));
    })



});

