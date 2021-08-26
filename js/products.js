 //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
     getJSONData(PRODUCT_INFO_URL).then(function(resultado){ // para mostrar autos
      if (resultado.status === 'ok'){
         arraysCars = resultado.data;
         // mostrarCars(arraysCars);
       }
     });
  
  });


const ORDER_BY_PROD_COUNT = [
  {
      "name": "Chevrolet Onix Joy",
      "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
      "cost": 13500,
      "currency": "USD",
      "imgSrc": "img/prod1.jpg",
      "soldCount": 14
  },
  {
      "name": "Fiat Way",
      "description": "La versión de Fiat que brinda confort y a un precio accesible.",
      "cost": 14500,
      "currency": "USD",
      "imgSrc": "img/prod2.jpg",
      "soldCount": 52
  },
  {
      "name": "Suzuki Celerio",
      "description": "Un auto que se ha ganado la buena fama por su economía con el combustible.",
      "cost": 12500,
      "currency": "USD",
      "imgSrc": "img/prod3.jpg",
      "soldCount": 25
  },
  {
      "name": "Peugeot 208",
      "description": "El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.",
      "cost": 15200,
      "currency": "USD",
      "imgSrc": "img/prod4.jpg",
      "soldCount": 17
  }
];

let orden = ORDER_BY_PROD_COUNT.sort( (a, b)=> //Función tipo flecha
  a.cost - b.cost ) //ordenar por costo simplificado
//   if (a.cost === b.cost){
//     return 0;
//    }
//    if (a.cost < b.cost ){
//      return -1;
//    }
//    return 1;
//   }
//  )
 console.log(orden);

 var minCount = undefined;
 var maxCount = undefined;


    
    var arraysCars = []; //Creo un Array para luego agregarle contenido
  async function mostrar_cars() {
    let promise = await fetch ('https://japdevdep.github.io/ecommerce-api/product/all.json');//Petición fetch
    let data = await promise.json();  //creo json
  
    let contenido = "";
    for (let index = 0; index < data.length; index++) {
          let elemento = data[index];

          if (((minCount == undefined) || (minCount != undefined && parseInt(elemento.productCount) >= minCount)) &&
          ((maxCount == undefined) || (maxCount != undefined && parseInt(elemento.productCount) <= maxCount))){

          contenido += `<div class="list-group-item list-group-item-action">
          <div class="row">
              <div class="col-3">
                  <img src=" ` + elemento.imgSrc +`  " alt="" ` + elemento.description + ` class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">`+ elemento.name +`</h4>
                      <div>
              <p class= 'precio'> $`+ elemento.cost + `USD</p>
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
  
  
  mostrar_cars(); 