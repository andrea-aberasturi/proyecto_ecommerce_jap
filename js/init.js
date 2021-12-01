const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
// const CATEGORIES_URL = "http://localhost:3000/categories";

const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
// const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish";

const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
// const CATEGORY_INFO_URL = "http://localhost:3000/categoriesInfo";

const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
// const PRODUCTS_URL = "http://localhost:3000/products";

const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
// const PRODUCT_INFO_URL = "http://localhost:3000/productsInfo";

const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
// const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/productsComment";

const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
// const CART_INFO_URL = "http://localhost:3000/relatedProducts";

const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
// const CART_BUY_URL = "http://localhost:3000/buy";

const CARRT = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
// const CARRT = 'http://localhost:3000/buyDeux';

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) { 
  
  //Logueado obligatorio
  const div = document.getElementById('div');//Etiqueta div
  let username = localStorage.getItem('user');//Recupero nombre de usuario


  if (username != null) {
    div.innerHTML = `
    <div class="dropdown">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    `+username+`</a>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
          <a class="dropdown-item" href="index.html" onclick = 'cerrarSesion()'>Cerrar Sesión</a>
        </div>
      </div>
    `
    location.replace = 'home.html'
    }
  else{
     window.location.href = './index.html';
    }
});

//Creo función para borrar usuario
function cerrarSesion(){
  localStorage.clear();
}