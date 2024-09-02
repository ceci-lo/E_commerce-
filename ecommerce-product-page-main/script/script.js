console.log("hola mundo");
const btnBasket = document.getElementsByClassName("btnBasket")[0];

btnBasket.addEventListener("click", (e) => {
   e.preventDefault();
    console.log("click")
    addCard();
})


const addCard = () => {
    /*<div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
    </div>*/
    
let caja = document.createElement("div");
caja.className = "card";

 
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


let parentDiv = document.getElementsByClassName("carousel")[0].parentNode;

let  sp2 = document.getElementsByClassName("carousel")[0];

 
  parentDiv.insertBefore(caja, sp2);
}