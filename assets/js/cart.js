let mode = true
const darkMode = () => {
    mode = !mode
    console.log(mode)
    localStorage.setItem('mode', mode ? 'light' : 'dark-mode')
    document.body.classList.toggle('dark-mode')

    mode ? document.getElementById('mode').innerHTML = 'dark' : document.getElementById('mode').innerHTML = 'light'
}
const getMode = () => {
    if ('mode' in localStorage) {
        document.body.classList.add(localStorage.getItem('mode'))
        localStorage.getItem('mode') == 'dark-mode' ? mode = false : mode = true
    } else {
        localStorage.setItem('mode', mode ? 'light' : 'dark-mode')
        document.body.classList.add(localStorage.getItem('mode'))
    }
}
getMode()
const cartContainer = document.getElementById("rows")

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
            <button id="delete-${product.id}" class=delete></button>

            <button class="add" id="add-${product.id}">+</button>
            <span class="number" id="productNumber-${product.id}">${product.cartQuantity}</span>
            <button class="remove"  id="remove-${product.id}">&#x2212;</button>

        </div>
    </div>
    `
    cartContainer.appendChild(cartDiv)



    let addBtn = document.getElementById(`add-${product.id}`)
    console.log(addBtn)
    addBtn.addEventListener('click', () => {
        addProduct(product)
    })

    let removeBtn = document.getElementById(`remove-${product.id}`)
    removeBtn.addEventListener('click', () => {
        removeProduct(product)
    })

    let deleteBtn = document.getElementById(`delete-${product.id}`)
    deleteBtn.addEventListener('click', () => {
        deleteProduct(product)
    })
}

const addProduct = (p) => {
    const number = document.getElementById(`productNumber-${p.id}`)
    p.cartQuantity += 1
    addToCart(p)
    number.innerHTML = p.cartQuantity
    // console.log(cartProducts)
}

const removeProduct = (p) => {
    if (p.cartQuantity != 1) {
        const number = document.getElementById(`productNumber-${p.id}`)
        p.cartQuantity -= 1
        addToCart(p)
        number.innerHTML = p.cartQuantity
    }
}

const deleteProduct = (p) => {
    cartProducts = cartProducts.filter(el => el.id != p.id)

    resetPage()
    if (cartProducts.length == 0) {
        const productContainer = document.getElementById('products-container')
        productContainer.innerHTML = ''
        emptyCart()
    }
    else {
        localStorage.setItem('cart-products', JSON.stringify(cartProducts))
        cartProducts.forEach(product => {
            renderCart(product)
        }), calculatePrice()
    }

}

const resetPage = () => {
    const productContainer = document.getElementById('rows')
    productContainer.innerHTML = ''
}

const emptyCart = () => {
    const emptyCart = document.getElementById("products-container")

    emptyCart.innerHTML += `
    <div id="empty-cart">
    <div class="empty">
    <p>Your cart is empty!</p>
    <p>Browse our categories and discover our best deals!</p>


    <a href="http://127.0.0.1:5500/home.html">Start Shopping</a>
    </div>
    </div>

    `
}
let cartProducts;
const getCartProduct = () => {
    if ('cart-products' in localStorage) {
        cartProducts = JSON.parse(localStorage.getItem('cart-products'))
        // console.log(cartProducts)

        const cartHeader = document.createElement('div')
        cartHeader.classList.add("cart-title")
        cartHeader.innerHTML += ` <p> Cart (${cartProducts.length})</p>`
        cartContainer.appendChild(cartHeader)
        cartProducts.forEach(product => {
            renderCart(product)
        });
        calculatePrice()

    } else {
        emptyCart()
    }
}


const addToCart = (product) => {
    localStorage.setItem('cart-products', JSON.stringify(cartProducts))

    calculatePrice()
}


let subtotal = 0
let total = 0

const calculatePrice = () => {
    subtotal = 0
    total = 0
    cartProducts.forEach(el => {
        subtotal += (el.cartQuantity * el.price)
    })
    total = subtotal + 50


    const subtotalEl = document.getElementById("subtotal")
    const totalEl = document.getElementById("total")

    subtotalEl.innerHTML = parseFloat(subtotal).toFixed(2)
    totalEl.innerHTML = parseFloat(total).toFixed(2)


}




getCartProduct()


