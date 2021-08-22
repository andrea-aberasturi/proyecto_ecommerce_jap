 //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    // getJSONData(PRODUCT_INFO_URL).then(function(resultado){ // para mostrar autos
    //   if (resultado.status === 'ok'){
    //     arraysCars = resultado.data;
    //     // mostrarCars(arraysCars);
    //   }
    // });
  
  });
  
    
    var arraysCars = []; //Creo un Array para luego agregarle contenido
  async function mostrar_cars() {
    let promise = await fetch ('https://japdevdep.github.io/ecommerce-api/product/all.json');//Petición fetch
    let data = await promise.json();  //creo json
  
    let contenido = "";
    for (let index = 0; index < data.length; index++) {
          let elemento = data[index];
          contenido += `<div class="list-group-item list-group-item-action">
          <div class="row">
              <div class="col-3">
                  <img src=" ` + elemento.imgSrc +`  " alt="" ` + elemento.description + ` class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">`+ elemento.name +`</h4>
                      <small class="text-muted">` + elemento.soldCount + ` artículos</small>
                  </div>
                  <p class="descript">`+ elemento.description + `</p>
              </div>
          </div>
      </div>
     `
  
     document.getElementById('prod-container').innerHTML = contenido;
  
     }
      }
  
  
  mostrar_cars(); 