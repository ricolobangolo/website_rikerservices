// ...existing code...

// Add to cart functionality
document.addEventListener('click', (e) => {
    if (e.target.matches('.add-to-cart')) {
        const serviceId = e.target.dataset.id;
        const service = services.find(s => s.id === serviceId);
        if (service) {
            const cart = new ShoppingCart();
            cart.addItem({
                id: service.id,
                name: service.name,
                price: service.price,
                image: 'path/to/service-image.jpg' // Add appropriate image path
            });
            
            // Show success toast
            const toast = document.createElement('div');
            toast.className = 'toast success';
            toast.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Added ${service.name} to cart
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    }
});

// Add toast styles to common.css or create a new toast.css file
