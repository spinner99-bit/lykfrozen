const products = [
    {
        id: 1,
        name: "ASAM JAWA 1KG",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 5.75,
        category: "Seafood"
    },
    {
        id: 2,
        name: "AGAR-AGAR TALI 20GM",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 3.30,
        category: "Instant & Dry Food"
    },
    {
        id: 3,
        name: "ASAM KEPING 100GM",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 3.20,
        category: "Instant & Dry Food"
    },
    {
        id: 4,
        name: "ASAM MOI 200GM",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 2.65,
        category: "Instant & Dry Food"
    },
    {
        id: 5,
        name: "BIHUN AWANG 3KG",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 19.75,
        category: "Instant & Dry Food"
    },
    {
        id: 6,
        name: "BALDUCCI SPAGHETTI 400GM",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 3.89,
        category: "Instant & Dry Food"
    },
    {
        id: 7,
        name: "BIHUN HARIMAU 3KG",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 19.00,
        category: "Instant & Dry Food"
    },
    {
        id: 8,
        name: "BIHUN NAYATI 3KG",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 21.74,
        category: "Instant & Dry Food"
    },
    {
        id: 9,
        name: "BIO LUX SPAGHETTI 400GM",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 3.79,
        category: "Instant & Dry Food"
    },
    {
        id: 10,
        name: "BUNGA MAS MARJERIN 1KG",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 10.80,
        category: "Instant & Dry Food"
    },
    {
        id: 11,
        name: "CARROT MEE",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 13.59,
        category: "Instant & Dry Food"
    },
    {
        id: 12,
        name: "DRIED SEAWEED 100S",
        description: "INSTANT & DRY FOOD, OTHER",
        price: 69.50,
        category: "Instant & Dry Food"
    },
];

let cart = [];

const productsGrid = document.getElementById('products-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartDisplay();
});

function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
				<img src="Products/${product.name}.jpg" alt="${product.name}">
			</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">MYR ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showAddToCartAnimation();
}

function showAddToCartAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    cartIcon.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
    
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
        cartIcon.style.backgroundColor = 'rgba(255,255,255,0.2)';
    }, 300);
}

function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    renderCartItems();
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>The cart is empty</p>
                <p>Quickly select your favorite products!</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
				<img src="Products/${item.name}.jpg" alt="${item.name}">
			</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">MYR ${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Delete</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
}

function checkout() {
    if (cart.length === 0) {
        alert('The cart is empty, please add products first!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const confirmMessage = `Confirm checkout?\n\nProduct quantity: ${totalItems}\nTotal amount: MYR ${total.toFixed(2)}\n\nClick confirm to continue the checkout process`;
    
    if (confirm(confirmMessage)) {
        alert('Thank you for your purchase! The order has been submitted, and we will process it as soon as possible.');
        
        cart = [];
        updateCartDisplay();
        toggleCart();
    }
}

function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">MYR ${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
        toggleCart();
    }
});

cartOverlay.addEventListener('click', function(e) {
    if (e.target === cartOverlay) {
        toggleCart();
    }
});