console.log("hola mundo");
const btnBasket = document.getElementsByClassName("btnBasket")[0];

btnBasket.addEventListener("click", (e) => {
   e.preventDefault();
    console.log("click")
    addCard();
})


const addCard = () => {
let caja = document.createElement("div");
caja.className = "card";
caja.style.position = "absolute";
caja.style.zIndex = "2"
caja.style.marginTop = "80px";
caja.style.marginLeft = "25px";
caja.style.width = "90%";
caja.style.height = "70vw";



let slide = document.getElementsByClassName("carousel")[0];

slide.style.zIndex = "1"
 
let header = document.createElement("div");
header.className = "card-header bg-sencondary"
header.innerText = "Cart"
header.style.backgroundColor = "hsl(0, 0%, 100%)";
 caja.appendChild(header)

let bodyCard = document.createElement("div");
bodyCard.className = "card-body"
 caja.appendChild(bodyCard)

let p = document.createElement("p");
p.className = "card-title text-warning";
p.innerText = "Your cart is empty";
p.style.textAlign = "center";

bodyCard.appendChild(p)


let parentDiv = slide.parentNode;



 
  parentDiv.insertBefore(caja, slide);
}

let menos = document.getElementsByClassName("minus")[0];
let mas = document.getElementById("plus");
let valor = document.getElementsByClassName("value")[0];
 let contador = 1;
mas.addEventListener("click",(e)=>{
   e.preventDefault();
  valor.innerHTML = contador;
  contador++
})

menos.addEventListener("click", (e)=>{
  e.preventDefault
  valor.innerHTML = contador - 1;
contador--
 
  console.log(contador)
})
