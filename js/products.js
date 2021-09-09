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
  let data = await promise.json();  //creo json

  data = sortProducts(criteria, data)
  let contenido = "";
  for (let index = 0; index < data.length; index++) {
    let elemento = data[index];

    if (((minCount == undefined) || (minCount != undefined && parseInt(elemento.cost) >= minCount)) &&
      ((maxCount == undefined) || (maxCount != undefined && parseInt(elemento.cost) <= maxCount))) {

      contenido += `
      <a href= "products-info.html" class="list-group-item list-group-item-action">
      <div class="list-group-item list-group-item-action">
          <div class="row">
              <div class="col-3">
                  <img src=" ` + elemento.imgSrc + `  " alt="" ` + elemento.description + ` class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">`+ elemento.name + `</h4>
                      <div>
              <p class= 'precio'> $`+ elemento.cost + ` ` + elemento.currency + ` </p>
                     </div>
                      <small class="text-muted">` + elemento.soldCount + ` artículos</small>
                  </div>
                  <p class="descript">`+ elemento.description + `</p>
              </div>
          </div>
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


document.getElementById('sortAsc').addEventListener('click', function () { //orden ascendente
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