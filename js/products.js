const ORDER_ASC_BY_COST = "⬆$";
const ORDER_DESC_BY_COST = "⬇$";
const ORDER_BY_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) { return -1; }
      if (a.cost > b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) { return -1; }
      if (a.cost < b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === ORDER_BY_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) { return -1; }
      if (aCount < bCount) { return 1; }
      return 0;
    });
  }

  return result;
}

var arraysCars = []; //Creo un Array para luego agregarle contenido
async function mostrar_cars(criteria) {
  let promise = await fetch('https://japdevdep.github.io/ecommerce-api/product/all.json');//Petición fetch
  let data = await promise.json();  //obtengo en fmato json

  data = sortProducts(criteria, data)
  let contenido = "";
  for (let index = 0; index < data.length; index++) {
    let elemento = data[index];

    if (((minCount == undefined) || (minCount != undefined && parseInt(elemento.cost) >= minCount)) &&
      ((maxCount == undefined) || (maxCount != undefined && parseInt(elemento.cost) <= maxCount))) {

      contenido += `
     <div class="col-md-6">
     <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
     <h3 class="m-3">${elemento.name} </h3>
       <img class="bd-placeholder-img card-img-top"  src= ${elemento.imgSrc} alt= ${elemento.description} >
       <div class="card-body">
         <p class="card-text">$ ${elemento.cost} ${elemento.currency}.</p>
         <p class="card-text">Disponibles: ${elemento.soldCount}</p>
         <p class="card-text"> ${elemento.description}</p>
       </div>
     </a>
     </div>
     `
    }
    document.getElementById('prod-container').innerHTML = contenido;

  }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes. d-none ocultar de pantalla
document.addEventListener("DOMContentLoaded", function (e) {

  //Research
const research =  document.getElementById('search'); //capturo el input del buscador
const button = document.getElementById('button'); //capturo el boton

const filter = ()=>{
  const contenido  = research.value.toLowerCase();
  console.log(contenido);

  for (let arraysCar  of arraysCars){
    let name = arraysCar.name.toLowerCase();
    if(name.indexOf(contenido) !== -1){
      
    }
  }
}
button.addEventListener('click', filter);

document.getElementById('sortAsc').addEventListener('click', function () { //Orden ascendente
  mostrar_cars(ORDER_ASC_BY_COST);
})
document.getElementById('sortDsc').addEventListener('click', function () { //Orden descendente
  mostrar_cars(ORDER_DESC_BY_COST);
})
document.getElementById('sortCount').addEventListener('click', function () { //Por cantidad, relevancia
  mostrar_cars(ORDER_BY_COUNT);
})

document.getElementById('clearFilter').addEventListener('click', function () { //Para limpiar filtro
  document.getElementById('rangeCountMin').value = '';
  document.getElementById('rangeCountMax').value = '';

  minCount = undefined;
  maxCount = undefined;

  mostrar_cars(ORDER_ASC_BY_COST); //Invoco la función luego de ordenarla
});

document.getElementById('range-Count').addEventListener('click', function () { //Rango de precio

  minCount = document.getElementById("rangeCountMin").value;
  maxCount = document.getElementById("rangeCountMax").value;

  // console.log(minCount);
  // console.log(maxCount);

  if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
    minCount = parseInt(minCount);
  }
  else {
    minCount = undefined;
  }

  if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
    maxCount = parseInt(maxCount);
  }
  else {
    maxCount = undefined;
  }
  mostrar_cars(ORDER_ASC_BY_COST);
})
mostrar_cars(ORDER_ASC_BY_COST);
});

// JSON.stringify() //Para mostrar un arreglo
// let orden = ORDER_BY_PROD_COUNT.sort( (a, b)=> //Función tipo flecha
//   a.cost - b.cost ) //ordenar por costo ascendente simplificado
//   if (a.cost === b.cost){
//     return 0;
//    }
//    if (a.cost < b.cost ){
//      return -1;
//    }
//    return 1;
//   }
//  )
//  console.log(orden);