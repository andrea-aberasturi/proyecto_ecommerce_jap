const CARRT = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    var cart = []; //Petición fetch URL dos products
    fetch(CARRT).then (data => data.json())
    .then (data => {
        cart = data.articles;
        console.log(cart);
        table(cart);
    })

 


    //Función para mostrar tabla dinamica
    
    let htmlCarrt = ''; 
    function table(array){ 
    for (let i=0; i<array.length; i++){
        let productos = array[i]; //Seteo para evitar el uso de corchetes
        htmlCarrt += `
        <tr>
        <td>  <div class="col-lg-3 col-md-4 col-6">
        <div class="d-block mb-4 h-100">
            <img class="img-fluid" src=" ${productos.src} " alt="">
        </div>
    </div>
        </td>
        <td>${productos.name} </td>
        <td><input type= 'number'value=${productos.count} oninput= 'subTotal(this.value)' ></td>
        <td>${productos.unitCost*productos.count} ${productos.currency}</td>
      </tr>`
    }
       //Para desplejar contenido en HTML
       document.getElementById('body').innerHTML = htmlCarrt;
}


//Función calcular subtotal
function subTotal(valor) {
    document.getElementById('')
}
});