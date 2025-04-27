var totalprice = 0;
var toggle = 0;

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('open');

    toggle = toggle + 1;
}

function addToCart(button) {
    const parentElement = button.parentElement;
    var cart = document.getElementById("cartItems");

    var count = getChildById(parentElement, "quantity");
    var pv = count.value;
    var multi = getChildById(parentElement, "v");
    var multiv = multi.getAttribute("value");

    pv = pv * multiv;
    pv = Math.round(pv*100)/100;
    totalprice = totalprice + pv;

    if(pv != 0){
        var title = getChildById(parentElement, "name");
        var name = title.innerText;
        var cartitem = document.createElement("h2");
        cartitem.innerHTML = name + ": $"+ pv;
        cart.appendChild(cartitem);
    }

    var e = document.getElementById("totalAmount");
    e.innerHTML = "Total: $"+totalprice;
}

function loadPage(page) {
    fetch(page)
      .then(response => {
        if (!response.ok) {
          throw new Error("Page not found");
        }
        return response.text();
      })
      .then(data => {
        document.getElementById("pagestuff").innerHTML = data;
      })
      .catch(error => {
        console.error(error);
        document.getElementById("pagestuff").innerHTML = "<p>Error loading page</p>";
      });
}

function getChildById(parentElement, id) {
    const child = parentElement.querySelector(`#${id}`);
    return child;
}