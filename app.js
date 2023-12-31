let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'EARPODS',
        image: 'earpods.PNG',
        price: 3000
    },
    {
        id: 2,
        name: 'BAGPACK',
        image: 'bagpack.PNG',
        price: 1000
    },
    {
        id: 3,
        name: 'SHIRT',
        image: 'shirt.PNG',
        price: 4000
    },
    {
        id: 4,
        name: 'HANDBAG',
        image: 'handbag.JPG',
        price: 5000
    },
    {
        id: 5,
        name: 'KURTI',
        image: 'kurti.PNG',
        price: 4000
    },
    {
        id: 6,
        name: 'PHONE',
        image: 'phone.png',
        price: 120000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
// Function to save the cart to localStorage
function saveCartToLocalStorage(cartItems) {
  localStorage.setItem('userCart', JSON.stringify(cartItems));
}

// Function to retrieve the cart from localStorage
function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem('userCart');
  return storedCart ? JSON.parse(storedCart) : [];
}

// Example usage:
// Load the cart when the page loads
let cart = getCartFromLocalStorage();

// Add an item to the cart
function addItemToCart(item) {
  cart.push(item);
  saveCartToLocalStorage(cart);
}

// Remove an item from the cart
function removeItemFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCartToLocalStorage(cart);
}

// Clear the entire cart
function clearCart() {
  cart = [];
  saveCartToLocalStorage(cart);
}

// Example usage:
// Add an item to the cart
addItemToCart({ id: 1, name: 'Product 1', price: 20 });

// Remove an item from the cart
removeItemFromCart(1);

// Clear the entire cart
clearCart();

