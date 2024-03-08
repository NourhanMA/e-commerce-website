let mode = true
const darkMode = () => {
    mode = !mode
    console.log(mode)
    localStorage.setItem('mode', mode ? 'light' : 'dark-mode')
    document.body.classList.toggle('dark-mode')


}
const getMode = () => {
    console.log("GGG")
    if ('mode' in localStorage) {
        document.body.classList.add(localStorage.getItem('mode'))
    } else {
        localStorage.setItem('mode', mode ? 'light' : 'dark-mode')
        document.body.classList.add(localStorage.getItem('mode'))
    }
}
getMode()


let allProducts = []
let categories = []
let filterdProducts = []
let filterdCategories = []

fetch("https://fakestoreapi.com/products").then((data) => {
    data.json().then((finaldata) => {
        // console.log(finaldata)
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
                // quantity: Math.floor(Math.random() * 10),
                cartQuantity: 0
            }
        })
        // console.log(allProducts)
        filterdProducts = [...allProducts]
        categories = [
            ...new Set(filterdProducts.map((el) => el.category)),
        ];

        // console.log(categories)
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
    let found = false

    if ('cart-products' in localStorage) {
        cartProducts = JSON.parse(localStorage.getItem('cart-products'))

        cartProducts.forEach((el) => {
            if (product.id == el.id) {
                found = true
                el.cartQuantity += 1
                localStorage.setItem('cart-products', JSON.stringify(cartProducts))
            }
        })
        if (!found) {
            setLocalItem(product, cartProducts)
        }
    } else {
        setLocalItem(product, cartProducts)
    }
}

const setLocalItem = (product, cartProducts) => {
    product.cartQuantity = product.cartQuantity += 1
    cartProducts.push(product)
    localStorage.setItem('cart-products', JSON.stringify(cartProducts))
}

const renderCategories = (category) => {
    const filterContainer = document.getElementById('filter-container')

    category.forEach((cat, i) => {
        const catDiv = document.createElement('div')
        catDiv.classList.add('cat-row')

        catDiv.innerHTML = `
        <input type="checkbox" id="${cat}" value="${cat}">
        <label for="${cat}">${cat}</label>
        `
        filterContainer.appendChild(catDiv)

        let checkBtns = document.querySelectorAll('input[type=checkbox]')
        checkBtns.forEach((el) => {
            el.addEventListener('click', checkBoxHandler)
        })
    })
}

const checkBoxHandler = (e) => {
    console.log(e.target)
    e.target.checked ?
        filterdCategories.push(e.target.value) :
        filterdCategories = filterdCategories.filter(el => el != e.target.value)



    renderFilterdData(filterdCategories)
}

const resetPage = () => {
    const productContainer = document.getElementById('products-container')
    productContainer.innerHTML = ''
}

const renderFilterdData = (filterdCategories) => {
    filterdProducts = []

    if (filterdCategories.length != 0) {
        filterdCategories.forEach((elem) => {
            resetPage()
            filterdProducts.push(...allProducts.filter((el) => el.category === elem))

        })
    }
    else {
        filterdProducts = [...allProducts]
    }
    if (sortData == 1) {
        ascending(filterdProducts)
    } else if (sortData == 2) {
        descending(filterdProducts)
    }

    renderProducts(filterdProducts)
}


let sortData = 0;

const sortProducts = () => {
    const sortContainer = document.getElementById('sorting')
    sortData = sortContainer.value
    if (sortContainer.value == 1) {
        ascending(filterdProducts)

    } else if (sortContainer.value == 2) {
        descending(filterdProducts)
    }
    resetPage()
    renderProducts(filterdProducts)
}

const ascending = (data) => {
    data = data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}

const descending = (data) => {
    data = data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
} 