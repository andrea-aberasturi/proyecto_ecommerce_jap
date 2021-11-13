let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;
let total = 0;
let MONEY_SYMBOL = "$";
let PERCENTAGE_SYMBOL = '%';
let message = '¡Su compra fue efectuada con éxito!'
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

    //Para capturar los eventos change de los radio button y pasarle la función actualiza costo Total
    document.getElementById('productCost').addEventListener('change', () => {
        productCost = Number(this.innerHTML);
        upDateTotal();
    })

    document.getElementById('premium').addEventListener('change', function () {
        comissionPercentage = 0.15;
        upDateTotal();
    })

    document.getElementById('express').addEventListener('change', function () {
        comissionPercentage = 0.07;
        upDateTotal();
    })

    document.getElementById('standardradio').addEventListener('change', function () {
        comissionPercentage = 0.05;
        upDateTotal();
    })

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

//Función calcular valor del Subtotal
function sumaTotal() {
    let tds = document.getElementsByClassName('td');
    //colocar contador
    let suma = 0
    for (let td of tds) {
        // console.log(parseInt(td.innerHTML));
        suma += parseFloat(td.innerHTML) // sumar a contador recorrido antes del for  
    }
    // console.log(suma)
    productCost = document.getElementById('productCost').innerHTML = suma;
}

//Función calcular TOTAL
function upDateTotal() {
    
    //Capturo los elementos HTML
    let comission = document.getElementById('comission');
    let envio = document.getElementById('totalCost');
    let totals = document.getElementById('total');

    //Calculo el valor de envio y su respectivo porcentage
    let valueEnvio = (Math.round(productCost * comissionPercentage * 100)/100);
    let percentage = Math.round((comissionPercentage * 100)) + PERCENTAGE_SYMBOL;

    //Inserto los valores correspondientes dentro del HTML
    comission.innerHTML = percentage;
    envio.innerHTML = valueEnvio;

    totals.innerHTML = Math.round(productCost + valueEnvio);
}

//Función para validar Modal
let guardar = document.getElementById('save'); //Capturo button Guardar
let validar = false; // Creo un booleano para confimar validación desde un addeventListener

//Obtengo todos los imputs para verificar que no esten vacios
let customUn = document.getElementById('customRadio1');
let customDeux = document.getElementById('customRadio2');
let cardNumber = document.getElementById('cardNumber');
let codePin = document.getElementById('cardPin');
let cardDate = document.getElementById('cardDate');
let accountNumber = document.getElementById('accountNumber');


//Para validar
//Obtengo todos los elementos necesarios para chequear su estado
let radioUn = document.getElementById('customRadio1');//button radio Tarjeta de Crédito
let radioDeux = document.getElementById('customRadio2'); //button radio Transferencia Bancaria
let cardNumber = document.getElementById('cardNumber');//Input nombre tarjeta
let pinCode = document.getElementById('cardPin');//Input code seguridad
let cardDate = document.getElementById('cardDate'); //Input date vencimiento card
let accountNumber = document.getElementById('accountNumber'); //Input nombre banco

//Comienzo validaciones
function validate (){ 
if (radioUn.checked && cardNumber != '' && pinCode != '' && cardDate != ''){
    
}
}