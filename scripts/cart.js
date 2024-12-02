// Cart Script
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartContainer.innerHTML = '';
    cartTotal.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSection = document.querySelector('.cart_section');
    const button = document.querySelector('.checkout_button');

    if (cart.length === 0) {
        cartSection.style.display = 'none';
        button.style.display = 'none';
        cartContainer.innerHTML = '<div class="empty_cart">Your cart is empty</div>';
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-item');
        productDiv.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <p><strong>${item.name}</strong>
                   Price: $${item.price.toFixed(2)} Quantity: ${item.quantity} Subtotal: $${(item.quantity * item.price).toFixed(2)}</p>
                </div>
                <button class="delete-item" data-index="${index}" style="background: none; border: none; cursor: pointer;">
                    <i class="material-icons" style="color: red;">delete</i>
                </button>
            </div>
        `;
        totalPrice += item.quantity * item.price;
        cartContainer.appendChild(productDiv);
    });

    cartTotal.innerHTML = `<h2>Total: $${totalPrice.toFixed(2)}</h2>`;

    const deleteButtons = document.querySelectorAll('.delete-item');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(button.dataset.index, 10);
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart)); 
            renderCart(); 
        });
    });
}
