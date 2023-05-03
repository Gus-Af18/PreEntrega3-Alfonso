var products = [
  { id: 1, name: "Torta Floral", description: "Descripcion 1", price: 250 },
  { id: 2, name: "Torta de Chocolate Festivo", description: "Descripcion 2", price: 250 },
  { id: 3, name: "Sacher Hotel de Viena", description: "Descripcion 3", price: 300 },
  { id: 4, name: "Clasica de Zanahoria", description: "Descripcion 4", price: 150 },
  { id: 5, name: "Clasica de Chocolate", description: "Descripcion 5", price: 150 },
  { id: 6, name: "Torta Llena de Colores", description: "Descripcion 6", price: 200 },
];

let cart = [];
let total = 0;

let addToCartButtons = document.querySelectorAll(".add-to-cart");

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function () {
    let productId = this.getAttribute("data-product-id");
    addToCart(productId);
  });
}

function addToCart(productId) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      cart.push(products[i]);
      total += products[i].price;
      saveCart();
      displayCart();
      break;
    }
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
  let cartItems = document.querySelector("#cart-items");
  cartItems.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    cartItems.innerHTML += "<li>" + cart[i].name + " <button class='remove-from-cart' data-product-id='"+cart[i].id+"'>Limpiar</button></li>";
  }
  cartItems.innerHTML += "<li>Total: $" + total + " <button class='remove-total'>Limpiar Total</button></li>";
  let removeButtons = document.querySelectorAll(".remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", function () {
      let productId = this.getAttribute("data-product-id");
      removeFromCart(productId);
    });
  }
  let removeTotalButton = document.querySelector(".remove-total");
  removeTotalButton.addEventListener("click", function(){
    total = 0;
    saveCart();
    displayCart();
  });
}


function removeFromCart(productId) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            total -= cart[i].price;
            cart.splice(i, 1);
            saveCart();
            displayCart();
            break;
        }
    }
}

  // agregar un boton para hacer la compra
  let purchaseButton = document.createElement("button");
  purchaseButton.innerHTML = "Comprar";
  purchaseButton.id = "purchase-button";
  purchaseButton.addEventListener("click", function () {
      makePurchase();
  });
  document.querySelector("#cart").appendChild(purchaseButton);
  
  // funcion para hacer la compra
  function makePurchase() {
      console.log("Compra realizada!");
      cart = [];
      saveCart();
      displayCart();
      cart.length === 0 && console.log("El carrito está vacío!")
  }
  
