const CARRT = 'https://japdevdep.github.io/ecommerce-api/cart/654.json';
let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var cart = [];
    //Petición fetch URL dos products
    fetch(CARRT).then(data => data.json())
        .then(data => {
            cart = data.articles;
            // console.log(cart);
            table(cart);
        })


    //Función para mostrar tabla dinamica
    let htmlCarrt = '';
    function table(array) {
        for (let i = 0; i < array.length; i++) {
            let productos = array[i]; //Seteo para evitar el uso de corchetes

            //Convertir moneda a dolares
            if (productos.currency == 'UYU') {
                productos.unitCost = productos.unitCost / 40;
                productos.currency = 'USD'
            }
            htmlCarrt += `
        <tr>
        <td>  <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid" src=" ${productos.src} " alt="">
            </div>
        </div>
            </td>
            <td>${productos.name} </td>
                <td><input class="border product" data-currency ='${productos.currency}' data-cost='${productos.unitCost}' type='number'value=${productos.count} id='${i}' min='1' onchange = "subTotal(this.value,${productos.unitCost}, ${i}, '${productos.currency}')"></td>
                    <td class='td' id='cost${i}'data-cost='${productos.unitCost * productos.count}'>${productos.unitCost * productos.count} ${productos.currency}</td>
      </tr>`
        }
        //Para desplegar contenido en HTML
        document.getElementById('body').innerHTML = htmlCarrt;
        // sumaTotal();

    }
    //Otra Función para calcular SubTotal
    // function sumaTotal() {
    //     let inputs = document.getElementsByClassName('product');
    //     for (let input of inputs) {
    //         input.addEventListener('change', (e) => {
    //             let cost = parseInt(e.target.dataset.cost);
    // console.log('El costo es: ' , cost)
    //             let val = parseInt(e.target.value);
    //             let i = e.target.getAttribute('id');
    //             let sumaTotal = cost * val;
    //             document.getElementById('ici').innerHTML = sumaTotal;
    //         })
    //     }
    // }

});
//Función calcular subtotal
function subTotal(valor, unitCost, id, currency) {
    let value = valor * unitCost;
    let costos = document.getElementById('cost' + id);
    // console.log(costos)
    costos.innerHTML = value + currency;
    //Otra función aquí
    sumaTotal()
}

function sumaTotal() {
    let tds = document.getElementsByClassName('td');
    //colocar contador
    let suma = 0
    for (let td of tds) {
        // console.log(parseInt(td.innerHTML));
        suma += parseInt(td.innerHTML) // sumar a contador recorrido antes del for
       
    }
    console.log(suma)
    document.getElementById('totalCost').innerHTML = suma
}
