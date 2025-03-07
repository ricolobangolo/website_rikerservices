class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.processingFeeRate = 0.05; // 5% processing fee
        this.updateCartBadge();
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
        this.saveCart();
        this.updateUI();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateUI();
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            this.saveCart();
            this.updateUI();
        }
    }

    calculateTotal() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const processingFee = subtotal * this.processingFeeRate;
        const total = subtotal + processingFee;
        return { subtotal, processingFee, total };
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateUI() {
        const cartItems = document.getElementById('cartItems');
        const subtotalElement = document.getElementById('subtotal');
        const processingFeeElement = document.getElementById('processingFee');
        const totalElement = document.getElementById('total');

        // Update cart items
        cartItems.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">€${item.price.toFixed(2)}</p>
                </div>
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="remove-item">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Update totals
        const { subtotal, processingFee, total } = this.calculateTotal();
        subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
        processingFeeElement.textContent = `€${processingFee.toFixed(2)}`;
        totalElement.textContent = `€${total.toFixed(2)}`;

        // Update cart badge if exists
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
        }

        this.updateCartBadge();
    }

    updateCartBadge() {
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    bindEvents() {
        const cartItems = document.getElementById('cartItems');
        const checkoutBtn = document.getElementById('checkoutBtn');

        cartItems.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            if (!cartItem) return;

            const itemId = cartItem.dataset.id;

            if (e.target.closest('.minus')) {
                const item = this.items.find(i => i.id === itemId);
                if (item) this.updateQuantity(itemId, item.quantity - 1);
            }
            else if (e.target.closest('.plus')) {
                const item = this.items.find(i => i.id === itemId);
                if (item) this.updateQuantity(itemId, item.quantity + 1);
            }
            else if (e.target.closest('.remove-item')) {
                this.removeItem(itemId);
            }
        });

        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'https://discord.gg/tzE9yWBwqx';
        });
    }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
    cart.updateUI();
    cart.bindEvents();
    cart.updateCartBadge();
});
