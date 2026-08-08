document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector(".cart-total h3");

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const product = {
                name: button.dataset.name,
                price: Number(button.dataset.price),
                quantity: 1
            };

            localStorage.setItem("cart", JSON.stringify([product]));
            alert(product.name + " added to cart!");
        });
    });

    if (cartItems) {
        let cart = JSON.parse(localStorage.getItem("cart"));

        function displayCart() {
            if (cart && cart.length > 0) {
                const product = cart[0];

                cartItems.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>Price: £${product.price.toFixed(2)}</p>

                    <button id="decrease">−</button>
                    <span>Quantity: ${product.quantity}</span>
                    <button id="increase">+</button>

                    <button id="remove">Remove</button>
                `;

                cartTotal.textContent =
                    `Total: £${(product.price * product.quantity).toFixed(2)}`;

                document.querySelector("#increase").addEventListener("click", function () {
                    product.quantity++;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    displayCart();
                });

                document.querySelector("#decrease").addEventListener("click", function () {
                    if (product.quantity > 1) {
                        product.quantity--;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        displayCart();
                    }
                });

                document.querySelector("#remove").addEventListener("click", function () {
                    localStorage.removeItem("cart");
                    cart = [];
                    displayCart();
                });
            } else {
                cartItems.innerHTML = `
                    <p>Your cart is currently empty.</p>
                `;

                cartTotal.textContent = "Total: £0.00";
            }
        }

        displayCart();
    }
    const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();
        const successMessage = document.querySelector("#successMessage");

        if (name === "" || email === "" || message === "") {
            successMessage.textContent = "Please complete all fields.";
            successMessage.style.color = "red";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            successMessage.textContent = "Please enter a valid email address.";
            successMessage.style.color = "red";
            return;
        }

        successMessage.textContent = "Thank you! Your message has been sent.";
        successMessage.style.color = "green";

        contactForm.reset();
    });
}
});