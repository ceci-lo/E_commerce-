/**Pedido de datos por ajax */
let carrito = [];
let bascket = [];

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
          statusText: xhr.statusText,
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };

    xhr.send();
  });
}

makeRequest("GET", "/data.json")
  .then(function (datums) {
    datums = JSON.parse(datums);
    carrito.push(datums);

    let titulo = document.getElementById("titleProduct");
    let description = document.getElementById("descriptionProduct");
    let price = document.getElementById("precio");

    /**Cuando se carguen mas datos ver como iterar dinamicamente este objeto **/
    for (let i = 0; i < carrito.length; i++) {
      carrito[i].map((producto) => (titulo.innerText = producto.title));
      carrito[i].map(
        (producto) => (description.innerText = producto.description)
      );
      carrito[i].map((producto) => (price.innerText = producto.price));
    }

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

if(window.innerWidth < 1024){
  
      div.className = "carousel-item" + (otherClass || "");
    
  }

  let img = document.createElement("img");
  img.src = url;
  img.id = "img-shoos";
  img.className = "d-block w-100 img-fluid";
  div.appendChild(img);

  let carousel = document.getElementsByClassName("carousel-inner")[0];
  
  //Mayor a 1024
  if (window.innerWidth >= 1024) {
    if (otherClass) {
      div.className = "img-thumbnail carousel-item-1";
    } else{
      div.className = "img-thumbnail carousel-item";
      carousel.style.display = "grid !important";
    }
  } 


  carousel.appendChild(div);
};

const btnBasket = document.getElementsByClassName("btnBasket")[0];
let cuentaClicks = 0;

// boton de carrito
btnBasket.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  addCard();
  deleteProduct();
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

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  let nombreProducto;
  for (let j = 0; j < carrito.length; j++) {
    for (let i = 0; i < carrito.length; i++) {
      nombreProducto = carrito[j][i].title;
    }
  }
  circulo = document.createElement("div");
  circulo.className = "conteo bg-secondary";
  let precio = document.getElementsByClassName("precioDescontado")[0].innerText;
  let cantidad = document.getElementsByClassName("value")[0].innerText;
  let foto = document.getElementById("img-shoos");
  let basketIcon = document.getElementsByClassName("container-nav-avatar")[0];
 

  parseInt(cantidad);
  parseInt(precio);

  let precioTotal = cantidad * precio;

  bascket.push({
    id: 1,
    title: nombreProducto,
    precio: precio,
    cantidad: cantidad,
    precioTotal: precioTotal,
    foto: foto,
  });

  let valor = document.getElementsByClassName("value")[0];

  valor.innerHTML = 0 ;

  //circulo de conteo de productos
  circulo.style.borderRadius = "50%";
  circulo.style.color = "white";
  circulo.style.width = "20px";
  circulo.style.height = "18px";
  circulo.style.position = "absolute";
  circulo.style.top = "-7px";
  circulo.style.right = "57px";
  circulo.innerText = cantidad;
  circulo.style.textAlign = "center";
  circulo.style.fontSize = "12px";
  basketIcon.appendChild(circulo);
});


//Elimina producto del carrito
let deleteProduct = () => {
  let deleteBoton = document.getElementsByClassName("deleteButton")[0];

  if (bascket.length >= 1) {
   
    deleteBoton.addEventListener("click", (e) => {
      e.preventDefault();

      for (const product of bascket) {
        let indice = bascket.findIndex((obj) => obj.id === product.id);
      let hijo = document.getElementsByClassName("card-body")[0];
      let circulo = document.getElementsByClassName("conteo")[0];
        let btnCheckout = document.getElementsByClassName("btnCheckout")[0];
      bascket.splice(indice, 1);
        
        hijo.remove();
        if(bascket.length==0) {
          circulo.remove();
          btnCheckout.remove();
         let p = document.createElement("p");
          let bodyCard =document.createElement("div");
          let card = document.getElementsByClassName("card")[0];
           p.innerText = "Your cart is empty.";
           p.style.textAlign = "center";
           p.className = "card-title text-warning";
           p.style.fontSize = "15px";
            card.appendChild(bodyCard);
            bodyCard.appendChild(p);

        }
        
      }
     
    });
  }
  
};

//añade la tarjeta carrito
const addCard = () => {
  let box = document.getElementsByClassName("card")[0];
  if (!box) {
    let caja = document.createElement("div");
    caja.className = "card";
   

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
    p.style.fontSize = "15px";
    minimg = document.createElement("img");
    let trash = document.createElement("img");
    let trashLink = document.createElement("span");
    let button = document.createElement("button");
    button.className = "btn btn-secondary btnCheckout";
    button.innerText = "Checkout";

    //carga el carrito
    if (bascket.length > 0) {
      for (let i = 0; i < carrito.length; i++) {
        minimg.src = carrito[0][i].picture[i];

        p.innerText = `${bascket[i].title} \n ${bascket[i].precio} x ${bascket[i].cantidad}  $${bascket[i].precioTotal}`;
        trash.src = "/ecommerce-product-page-main/images/icon-delete.svg";
      }
    } else {
      p.innerText = "Your cart is empty";
      p.style.textAlign = "center";
    }

    minimg.style.width = "60px";
    minimg.style.borderRadius = "5px";
    minimg.style.height = "fit-content";
    minimg.style.marginRight = "16px";

    trash.style.width = "20px";
    trash.style.height = "fit-content";
    trash.style.marginLeft = "5px";

    trashLink.className = "deleteButton";
    trashLink.appendChild(trash);

    button.style.width = "90%";
    button.style.padding = "3% 0 3% 0";
    button.style.margin = "15px";

    bodyCard.appendChild(minimg);
    bodyCard.appendChild(p);
    bodyCard.appendChild(trashLink);
    caja.appendChild(button);

    let parentDiv = slide.parentNode;

    parentDiv.insertBefore(caja, slide);
  } else {
    box.remove();
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
