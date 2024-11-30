// Cart Script
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const quantity = parseInt(document.querySelector('.num').textContent, 10);

        if (quantity > 0) {
            const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

            const existingItemIndex = cart.findIndex(item => item.name === name);
             cart.push({ name, price, quantity : 1 });
    
            sessionStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'cart.html';
        } else {
            alert('Please select a quantity greater than 0.');
        }
    });
});