//Función para mostrar imagenes en forma de galeria
function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productGallery").innerHTML = htmlContentToAppend;//Indico donde coloco las imagenes
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultado) { // para mostrar autos
        if (resultado.status === 'ok') {
            arraysCars = resultado.data;
            mostrarCars(arraysCars);
            // console.log(arraysCars);

            //Para desplegar contenido en HTML
            let productsDescription = document.getElementById('productsDescription');
            let productsname = document.getElementById('productsName');
            let product = document.getElementById('count');

            product.innerHTML = arraysCars.soldCount;
            productsname.innerHTML = arraysCars.name;
            productsDescription.innerHTML = arraysCars.description;

            showImagesGallery(arraysCars.images); //Imagenes en forma de galeria
        }
    });
});

// Obtengo el Json de Comentarios
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (coment) {
    if (coment.status === 'ok') {
        comentarios = coment.data;
        //console.log(comentarios);
        voirComment(comentarios);//Utilizo la función que cree para mostrar el json
    }
})
//Creo una función para recorrerlo
var arraysComent = [];
function voirComment(array) {
    let voir = '';
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        voir += `
          <hr class'my-3'>
             <div class="d-flex w-100 justify-content-between">
                <p> ${comment.description} </p></hr>
                <p> ${stars(comment.score)} </p>
             </div>
                 <p class="text-end"> ${comment.user}  &emsp;  ${comment.dateTime} </p>
          `
        document.getElementById('comentarios').innerHTML = voir;
    }
}

function stars(star) {
    let score = parseInt(star);
    let agregar = '';
    for (let index = 1; index <= score; index++) {
         agregar = `
         <span id="1estrella" style="cursor:pointer" class="fa fa-star checked"></span>
         `
    }
    for (let i = score+1; i <=5; i++) {
         agregar = `
         <span id="4estrella" style="cursor: pointer" class="fa fa-star"></span>
         `
    }
    return agregar;
}

//Capturo el comentario e inserto en html

let newcomment = document.getElementById('newComentario');
let insertar = document.getElementById('comentarios');
let usuario = localStorage.getItem('user');
let hora = new Date();
var day = hora.getDate();
var year = hora.getFullYear();
var month = hora.getMonth();
var heur = hora.getHours();
var minuit = hora.getUTCMinutes();


function commentrio() {
    let capturar = newcomment.value;
    insertar.innerHTML += `<hr class="my-3">${capturar}<br><br/>
                            ${usuario} &emsp; ${year}-${month}-${day} ${heur}:${minuit}`

}


var arraysCars = [];
function mostrarCars(array) {
    let htmlContenido = '';
    for (let index = 0; index < array.length; index++) {
        let category = array[index];
        htmlContenido += `<div class="list-group-item list-group-item-action">
           <div class="row">
               <div class="col-3">
                   <img src="` + category.imgSrc + `" alt="" ` + category.description + ` class="img-thumbnail">
               </div>
               <div class="col">
                   <div class="d-flex w-100 justify-content-between">
                       <h4 class="mb-1">`+ category.name + `</h4>
                       <small class="text-muted">` + category.productCount + ` artículos</small>
                   </div>
                   <p class="descript">`+ category.description + `</p>
               </div>
           </div>
       </div>
      `
        document.getElementById("prod-container").innerHTML = htmlContenido;

    }
}

  // var getJSONData = async function(url){
  //     var result = {};
  //     try {
  //     const response = await fetch("https://japdevdep.github.io/ecommerce-api/product/all.json") //hacerlo generico url solo
  //       ;
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw Error(response.statusText);
  //     }
  //     const response_1 = undefined;
  //     result.status = 'ok';
  //     result.data = response_1;
  //     return result;
  //   } catch (error) {
  //     result.status = 'error';
  //     result.data = error;
  //     return result;
  //   }
  // }