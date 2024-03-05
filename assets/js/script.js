const darkMode = () => {
    document.body.classList.toggle("dark-mode")
}


let allProducts = []
let categories = []
let filterdProducts = []
let filterdCategories = []

fetch("https://fakestoreapi.com/products").then((data) => {
    data.json().then((finaldata) => {
        console.log(finaldata)
        allProducts = finaldata.map((p) => {
            return {
                id: p.id,
                name: p.title,
                // image: p.images[0].replace(/[^\w/:.\s]/gi, ''),
                image: p.image,
                // category: p.category.name,
                category: p.category,
                price: p.price,
                description: p.description,
                quantity: Math.floor(Math.random() * 10),
                cartQuantity: 0
            }
        })
        console.log(allProducts)
        filterdProducts = [...allProducts]
        categories = [
            ...new Set(filterdProducts.map((el) => el.category)),
        ];

        console.log(categories)
        renderProducts(filterdProducts)
        renderCategories(categories)
    })

})



const renderProducts = (products) => {
    const productContainer = document.getElementById('products-container')

    products.forEach((product, i) => {
        const prodcutDiv = document.createElement('div')
        prodcutDiv.classList.add('product')
        prodcutDiv.innerHTML = `
        <div class="image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="info">
            <p class="product-name"> ${product.name}</p>
            <div class="cart-price">
                <p class="product-price">EGP ${product.price}</p>
                <div class=cart-button>
                    <button id=product-${i}>ADD</button>
                </div>
            </div>
        </div>`
        productContainer.appendChild(prodcutDiv)
        let productBtn = document.getElementById(`product-${i}`)
        productBtn.addEventListener('click', () => {
            addToCart(filterdProducts[i])
            // localStorage.setItem('cart-products', JSON.stringify(filterdProducts[i]))
        })
    })
}

let cartProducts = []
const addToCart = (product) => {
    if ('cart-products' in localStorage) {
        let cartProducts = JSON.parse(localStorage.getItem('cart-products'))
        console.log(cartProducts)
        let isExist = cartProducts.find((el) => (el.id == product.id))

        if (isExist) {
            product.cartQuantity = product.cartQuantity += 1
            // arr.push(product)
            cartProducts = cartProducts.filter((el) => (el.id == product.id && el.quantity > el.cartQuantity) ? el.cartQuantity += 1 : '')
            localStorage.setItem('cart-products', JSON.stringify(cartProducts))

        } else {
            setLocalItem(product, cartProducts)
        }
    } else {
        setLocalItem(product, cartProducts)
    }



}

const setLocalItem = (product, arr) => {
    product.cartQuantity = product.cartQuantity += 1
    arr.push(product)
    localStorage.setItem('cart-products', JSON.stringify(arr))
    console.log(product.cartQuantity)
}

const renderCategories = (category) => {
    const filterContainer = document.getElementById('filter-container')

    category.forEach((cat) => {
        const catDiv = document.createElement('div')
        catDiv.classList.add('cat-row')

        catDiv.innerHTML = `
        <input type="checkbox" id=${cat} value=${cat}>
        <label for="${cat}">${cat}</label>
        `
        filterContainer.appendChild(catDiv)

        let checkBtns = document.querySelectorAll('input[type=checkbox]')
        checkBtns.forEach((el) => {
            el.addEventListener('click', checkBoxHandler)
        })
    })
}

const resetPage = () => {
    const productContainer = document.getElementById('products-container')
    productContainer.innerHTML = ''
}

const renderFilterdData = (filterdCategories) => {
    filterdProducts = []
    filterdCategories.length != 0 ? filterdCategories.forEach((elem) => {
        resetPage()
        filterdProducts.push(...allProducts.filter((el) => el.category === elem))
    }) : filterdProducts = [...allProducts]
    renderProducts(filterdProducts)
}

const checkBoxHandler = (e) => {
    e.target.checked ?
        filterdCategories.push(e.target.value) :
        filterdCategories = filterdCategories.filter(el => el != e.target.value)
    renderFilterdData(filterdCategories)
}


const sortProducts = () => {
    const sortContainer = document.getElementById('sorting')
    sortContainer.addEventListener('change', (e) => {
        if (e.target.value == 1) {
            filterdProducts = filterdProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        } else if (e.target.value == 2) {
            filterdProducts = filterdProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        resetPage()
        renderProducts(filterdProducts)
    })
}