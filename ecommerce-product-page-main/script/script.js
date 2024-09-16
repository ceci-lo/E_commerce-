/**Pedido de datos por ajax */
let datos = [];
let titulo = "";
let xhr = new XMLHttpRequest();

xhr.open("get", "/data.json");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    let data = JSON.parse(xhr.response);

    /**Cuando se carguen mas datos ver como iterar dinamicamente este objeto */
   document.getElementById("titleProduct").innerText = data[0].title;
   titulo = data[0].title;
   console.log(typeof titulo)
    document.getElementById("descriptionProduct").innerText =
      data[0].description;

    /**Carga de imagenes */
    crearDivImg(data[0].picture[0], " active");
    for (let i = 0; i < data[0].picture.length; i++) {
      console.log(typeof data[0].picture[i]);

      crearDivImg(data[0].picture[i]);
    }
  }
};

xhr.send();

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
  console.log("agregue ");
})

//añade la tarjeta carrito
const addCard = () => {
  let box = document.getElementsByClassName("card")[0];
  if (!box) {
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
    caja.appendChild(bodyCard);

    let p = document.createElement("p");
    p.className = "card-title text-warning";
    p.innerText = "Your cart is empty";
    p.style.textAlign = "center";

    bodyCard.appendChild(p);

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
