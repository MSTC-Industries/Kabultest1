var totalprice = 0;
var toggle = 0;

function ready() {
  document.getElementById("searchback").style.display = "none";
}

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
        var cartitem = document.createElement("div");
        var text = document.createElement("h2");
        var removebutton = document.createElement("button");

        text.innerHTML = name + ": $"+ pv;
        removebutton.textContent = "remove";

        cart.appendChild(cartitem);
        cartitem.appendChild(text);
        cartitem.appendChild(removebutton);

        removebutton.addEventListener("click", () => {
          cartitem.remove();
          totalprice -= pv;
          document.getElementById("totalAmount").innerHTML = "Total: $"+totalprice;
        });
    }

    document.getElementById("totalAmount").innerHTML = "Total: $"+totalprice;
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

function search(searchinput = document.getElementById("searchbox").value) {
  
  document.querySelectorAll(".card").forEach(function(node) {
    var title = getChildById(node, "name").innerText;
    if (title.toLowerCase().includes(searchinput.toLowerCase())) {
      node.style.display = "block"
    } else {
      node.style.display = "none"
    }
  
    document.getElementById("searchback").style.display = "block";
});
}

function searchback() {
  search("");
  document.getElementById("searchback").style.display = "none";
  document.getElementById("searchbox").value = "";
}