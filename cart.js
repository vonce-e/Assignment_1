// Cart Script
document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let totalPrice = 0;

    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <p><strong>${item.name}</strong>
                    Price: $${item.price.toFixed(2)}
                    Quantity: ${item.quantity}
                    Subtotal: $${(item.quantity * item.price).toFixed(2)}</p>
                </div>
            </div>
        `;
        totalPrice += item.quantity * item.price;
        cartContainer.appendChild(productDiv);
    });

    cartTotal.innerHTML = `<h2>Total: $${totalPrice.toFixed(2)}</h2>`;

    clearCartButton.addEventListener('click', () => {
        if (confirm('Are you sure  you want to clear the cart?')) {

            // Remove cart from localStorage
            localStorage.removeItem('cart');

            // Update cart display
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';

            // Clear total
            cartTotal.innerHTML = '';

            // Hide the button
            clearCartButton.style.display = 'none';
        }
    });
});