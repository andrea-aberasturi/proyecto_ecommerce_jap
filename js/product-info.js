//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultado){ // para mostrar autos
      if (resultado.status === 'ok'){
        arraysCars = resultado.data;
        mostrarCars(arraysCars);
      }
    });
  
  });
  
  var arraysCars = [];
  function mostrarCars (array){
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
                       <h4 class="mb-1">`+ category.name +`</h4>
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