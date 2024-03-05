const cartContainer = document.getElementById("cart-container")
const renderCart = (product, length) => {

    const cartDiv = document.createElement('div')
    cartDiv.classList.add('row')

    cartDiv.innerHTML = `
    <div class="image">
        <img src="${product.image}" alt="">
    </div>

    <div class="details">
        <div class="header">
            <p class="title"> ${product.name}</p>
            <p class="price">EGP ${product.price}</p>
        </div>
        <div class="quantity">
            <button class="add">+</button>
            <span class="number">${product.cartQuantity}</span>
            <button class="remove">&#x2212;</button>
        </div>
    </div>
    `


    cartContainer.appendChild(cartDiv)
}



const emptyCart = () => {
    const emptyCart = document.getElementById("empty-cart")

    emptyCart.innerHTML += `
    <div class="empty">
    <p>Your cart is empty!</p>
    <p>Browse our categories and discover our best deals!</p>


    <a href="http://127.0.0.1:5500/home.html">Start Shopping</a>
    </div>
    `
}

const getCartProduct = () => {
    if ('cart-products' in localStorage) {
        let cartProducts = JSON.parse(localStorage.getItem('cart-products'))
        console.log(cartProducts)

        const cartHeader = document.createElement('div')
        cartHeader.classList.add("cart-title")
        cartHeader.innerHTML += ` <p> Cart (${cartProducts.length})</p>`
        cartContainer.appendChild(cartHeader)
        cartProducts.forEach(product => {
            renderCart(product)
        });
        // product.cartQuantity = product.cartQuantity += 1
        // cartProducts = cartProducts.filter((el) => (el.id == product.id && el.quantity > el.cartQuantity) ? el.cartQuantity += 1 : '')
        // localStorage.setItem('cart-products', JSON.stringify(cartProducts))

    } else {
        emptyCart()
        console.log("Your cart is empty!Browse our categories and discover our best deals!")
    }
}



getCartProduct()


