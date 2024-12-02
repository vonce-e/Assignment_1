// Quantity Button Script
document.addEventListener('DOMContentLoaded', () => {
    const qtyButtons = document.querySelectorAll('.qty_button');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    const quantities = {};

    qtyButtons.forEach((qtyButton, index) => {
        const numDisplay = qtyButton.querySelector('.num');
        const plusButton = qtyButton.querySelector('.plus');
        const minusButton = qtyButton.querySelector('.minus');

        let quantity = 0; 

        function updateQuantity(newQty) {
            quantity = Math.max(0, newQty); 
            numDisplay.textContent = quantity;
            quantities[index] = quantity; 
        }
        plusButton.addEventListener('click', () => updateQuantity(quantity + 1));
        minusButton.addEventListener('click', () => updateQuantity(quantity - 1));
    });

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const quantity = quantities[index] || 0; 
            if (quantity === 0) {
                alert('Please select a quantity before adding to the cart.');
                return;
            }
            const productDetails = {
                name: button.dataset.name,
                image: button.dataset.image,
                price: parseFloat(button.dataset.price),
                quantity: quantity,
            };
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(
                item => item.name === productDetails.name
            );

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += productDetails.quantity;
            } else {
                cart.push(productDetails);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'cart.html';
        });
    });
});
