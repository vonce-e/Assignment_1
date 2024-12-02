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
    const checkout_button = document.querySelector('.checkout_button');

    if (cart.length === 0) {
        cartSection.style.display = 'none';
        checkout_button.style.display = 'none';
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
                    <div class="product_cart">${item.name}</div>
                   <div class="price_cart">$${item.price.toFixed(2)}</div> <div class="quantity_cart">${item.quantity}</div> <div class="total_cart">$${(item.quantity * item.price).toFixed(2)}</div>
                </div>
                <button class="delete-item" data-index="${index}" style="background: none; border: none; cursor: pointer;">
                    <i class="material-icons" style="color: black;">delete</i>
                </button>
            </div>
        `;
        totalPrice += item.quantity * item.price;
        cartContainer.appendChild(productDiv);
    });

    cartTotal.innerHTML = `<div class="subtotal_cart">Total: $${totalPrice.toFixed(2)}</div>`;

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
