/**Pedido de datos por ajax */
let carrito = [];

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };


    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };

    xhr.send();

  });
}

makeRequest("GET", "/data.json")
  .then(function (datums) {
   
    datums = JSON.parse(datums);

    /**Cuando se carguen mas datos ver como iterar dinamicamente este objeto **/
    document.getElementById("titleProduct").innerText = datums[0].title;
   

    titulo = datums[0].title;
    console.log(titulo);
    document.getElementById("descriptionProduct").innerText =
      datums[0].description;

    /**Carga de imagenes **/
    crearDivImg(datums[0].picture[0], " active");
    for (let i = 0; i < datums[0].picture.length; i++) {
      crearDivImg(datums[0].picture[i]);
    }


  })
  .catch(function (err) {
    console.log(err);
    console.error("Augh, there was an error!", err.statusText);
  });

  
/**creando elementos html para alojar las imagenes */
const crearDivImg = (url, otherClass) => {
  let div = document.createElement("div");

  if (otherClass) {
    div.className = "carousel-item" + otherClass;
  } else {
    div.className = "carousel-item";
  }

  let img = document.createElement("img");
  img.src = url;
  img.id = "img-shoos";
  img.className = "d-block w-100 img-fluid";
  div.appendChild(img);

  let carousel = document.getElementsByClassName("carousel-inner")[0];

  carousel.appendChild(div);
};

const btnBasket = document.getElementsByClassName("btnBasket")[0];
let cuentaClicks = 0;

// boton de carrito
btnBasket.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  addCard();
  cuentaClicks++;
});

const btnAdd = document.getElementById("btnAdd");

//boton de Añadir
/**
 * Debe añadir al carrito de compras :
 * titulo de la compra
 * precio de la unidad
 * cantidad
 * precio total
 */
btnAdd.addEventListener("click",(e)=>{
  e.preventDefault();
  e.stopPropagation();
 
  let nombreProducto = document.getElementById('titleProduct').innerText;
  let precio = document.getElementsByClassName("precioDescontado")[0].innerText;
  let cantidad = document.getElementsByClassName("value")[0].innerText;
 let foto = document.getElementById("img-shoos");
   
  parseInt(cantidad);
  parseInt(precio);

  let precioTotal = cantidad * precio;

  carrito.push({"title": nombreProducto, "precio": precio, "cantidad": cantidad, "precioTotal": precioTotal, "foto": foto})
  

})

//añade la tarjeta carrito
const addCard = () => {
  let box = document.getElementsByClassName("card")[0];
  if (!box) {
    let basketIcon =document.getElementsByClassName("container-nav-avatar")[0];

    let caja = document.createElement("div");
    caja.className = "card";
    caja.style.position = "absolute";
    caja.style.zIndex = "2";
    caja.style.marginTop = "80px";
    caja.style.marginLeft = "25px";
    caja.style.width = "90%";
    caja.style.height = "70vw";

    let slide = document.getElementsByClassName("carousel")[0];

    slide.style.zIndex = "1";

    let header = document.createElement("div");
    header.className = "card-header bg-sencondary";
    header.innerText = "Cart";
    header.style.backgroundColor = "hsl(0, 0%, 100%)";
    caja.appendChild(header);

    let bodyCard = document.createElement("div");
    bodyCard.className = "card-body";
    bodyCard.style.display = "flex";
    bodyCard.style.justifyContent = "start";

    caja.appendChild(bodyCard);

    let p = document.createElement("p");
    p.className = "card-title text-warning";
    p.style.fontSize = "15px"
    minimg = document.createElement("img");
    trash = document.createElement("img");

    circulo = document.createElement("div");
    circulo.className = "bg-secondary";
    basketIcon.style.position = "relative"
    if(carrito[0]){
      for(let i = 0; i < carrito.length; i++){

          minimg.src = carrito[i].foto.src
          p.innerText =  `${carrito[i].title} \n ${carrito[i].precio} x ${carrito[i].cantidad} =  ${carrito[i].precioTotal} `;    
          circulo.style.border = "solid orange";   
          circulo.style.borderRadius = "50%";   
          circulo.style.color ="white";
          circulo.style.width = "20px";
          circulo.style.height = "20px";
          circulo.style.position = "absolute";
          circulo.style.top = "-7px";
          circulo.style.right = "57px";




          trash.src = "/ecommerce-product-page-main/images/icon-delete.svg"
      }
     
    }else {
      p.innerText = "Your cart is empty";
      p.style.textAlign = "center";
    }
    minimg.style.width = "60px";
    minimg.style.borderRadius = "5px";
    minimg.style.height= "fit-content";
    minimg.style.marginRight = "16px";
    trash.style.width = "20px";
    trash.style.height = "fit-content";
    trash.style.marginLeft = "5px";

    bodyCard.appendChild(minimg);
    bodyCard.appendChild(p);
    bodyCard.appendChild(trash);
    
    basketIcon.appendChild(circulo);

    let parentDiv = slide.parentNode;

    parentDiv.insertBefore(caja, slide);
  } else {
    box.remove();
    console.log("entre al if");
  }
};

let menos = document.getElementsByClassName("minus")[0];
let mas = document.getElementById("plus");
let valor = document.getElementsByClassName("value")[0];
let contador = 1;

/**
 * Funciones mas y menos agregan o quita un articulo de la lista antes de añadirlo a la basket
 */
mas.addEventListener("click", (e) => {
  e.preventDefault();
  valor.innerHTML = contador;
  contador++;
});

menos.addEventListener("click", (e) => {
  e.preventDefault;
  valor.innerHTML = contador - 1;
  contador--;
});
