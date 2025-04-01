var totalprice = 0;
var toggle = 0;
function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('open');

    getPrice()
    toggle = toggle + 1;
}

function getPrice(){
    if(toggle%2 == 0){
    var cart = document.createElement("div");
    cart.id = "cart";
    /* var ul = document.createElement("ul"); */

    for(let i = 1;i<9;i++){
        var count = document.getElementById("quantity"+i);
        var pv = count.value;
        var multi = document.getElementById("v"+i);
        var multiv = multi.getAttribute("value");
        pv = pv * multiv;
        pv = Math.round(pv*100)/100;
        totalprice = totalprice + pv;
        if(pv != 0){
            var title = document.getElementById("name"+i)
            var name = title.innerText;
            var cartitem = document.createElement("h2");
            cartitem.innerHTML = name + ": $"+ pv;
            
            cart.appendChild(cartitem);
        }
    }
    var e = document.createElement("h1");
    e.innerHTML = "Total: $"+totalprice;
    cart.appendChild(e);
    var putithere = document.getElementById("fortheitems");
    putithere.appendChild(cart);
    }
    else{
        console.log("he")
        var del = document.getElementById("cart");
        del.remove();
    }
}

