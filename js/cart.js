let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;
let total = 0;
let MONEY_SYMBOL = "$";
let PERCENTAGE_SYMBOL = '%';
let modalSave = '¡Sus datos fueron registrados correctamente!';
let message = '¡Su compra fue efectuada con éxito!'


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let datosModal = JSON.parse(localStorage.getItem('modalForm'));//Recupero lo que guarde en LocalStorage
    if (datosModal != null){
        document.getElementById('cardNumber').value = datosModal.cardNumber;
        document.getElementById('cardPin').value = datosModal.pinCode;
        document.getElementById('cardDate').value = datosModal.cardDate;
        document.getElementById('accountNumber').value = datosModal.accountNumber;
    }
    validate()


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
    }

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
    costos.innerHTML = value + currency;
    sumaTotal()
}

//Función calcular valor del Subtotal
function sumaTotal() {
    let tds = document.getElementsByClassName('td');
    //colocar contador
    let suma = 0
    for (let td of tds) {
        suma += parseFloat(td.innerHTML) // sumar a contador recorrido antes del for  
    }
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

// //Para validar Modal
// //Obtengo todos los elementos necesarios para chequear su estado
let modal = document.getElementById('modalValidate');//form modal
let button = document.getElementById('save');//Button guardar cambios
let radioUn = document.getElementById('customRadio1');//button radio Tarjeta de Crédito
let radioDeux = document.getElementById('customRadio2'); //button radio Transferencia Bancaria
let cardNumber = document.getElementById('cardNumber');//Input nombre tarjeta
let pinCode = document.getElementById('cardPin').value;//Input code seguridad
let cardDate = document.getElementById('cardDate').value; //Input date vencimiento card
let accountNumber = document.getElementById('accountNumber').value; //Input nombre banco
let modalForm = {};//Inicializo objeto para guardar info de ventana modal


//modal validación
function validate (){
    if (modalForm != null){
        button.addEventListener('click',function(){
            window.location.href = 'cart.html';
        })
    }
}

//Guardar los elementos en localStorage
modal.addEventListener('submit',function(e){
    e.preventDefault();
    // let modalForm = {};//Inicializo objeto para guardar info de ventana modal
    modalForm.cardNumber = document.getElementById('cardNumber').value;
    modalForm.pinCode = document.getElementById('cardPin').value;
    modalForm.cardDate = document.getElementById('cardDate').value;
    modalForm.accountNumber = document.getElementById('accountNumber').value;

    localStorage.setItem('modalForm', JSON.stringify(modalForm));//Almaceno en LocalStorage
})

