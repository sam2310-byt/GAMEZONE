document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector(".cart-total h3");
    const contactForm = document.querySelector("#contactForm");

    // Add products to the cart
    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const productName = button.dataset.name;
            const productPrice = Number(button.dataset.price);

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find(function (product) {
                return product.name === productName;
            });

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(productName + " added to cart!");
        });
    });

    // Display the cart
    if (cartItems && cartTotal) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        function saveCart() {
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        function displayCart() {
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <p>Your cart is currently empty.</p>
                `;

                cartTotal.textContent = "Total: £0.00";
                return;
            }

            cartItems.innerHTML = "";

            let total = 0;

            cart.forEach(function (product, index) {
                const productTotal = product.price * product.quantity;
                total += productTotal;

                const item = document.createElement("div");
                item.classList.add("cart-item");

                item.innerHTML = `
                    <h3>${product.name}</h3>

                    <p>Price: £${product.price.toFixed(2)}</p>

                    <button class="decrease" data-index="${index}">−</button>

                    <span>Quantity: ${product.quantity}</span>

                    <button class="increase" data-index="${index}">+</button>

                    <button class="remove" data-index="${index}">
                        Remove
                    </button>

                    <p>
                        Item total: £${productTotal.toFixed(2)}
                    </p>
                `;

                cartItems.appendChild(item);
            });

            cartTotal.textContent = `Total: £${total.toFixed(2)}`;

            const increaseButtons =
                document.querySelectorAll(".increase");

            increaseButtons.forEach(function (button) {
                button.addEventListener("click", function () {
                    const index = Number(button.dataset.index);

                    cart[index].quantity++;

                    saveCart();
                    displayCart();
                });
            });

            const decreaseButtons =
                document.querySelectorAll(".decrease");

            decreaseButtons.forEach(function (button) {
                button.addEventListener("click", function () {
                    const index = Number(button.dataset.index);

                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                    }

                    saveCart();
                    displayCart();
                });
            });

            const removeButtons =
                document.querySelectorAll(".remove");

            removeButtons.forEach(function (button) {
                button.addEventListener("click", function () {
                    const index = Number(button.dataset.index);

                    cart.splice(index, 1);

                    saveCart();
                    displayCart();
                });
            });
        }

        displayCart();
    }

    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name =
                document.querySelector("#name").value.trim();

            const email =
                document.querySelector("#email").value.trim();

            const message =
                document.querySelector("#message").value.trim();

            const successMessage =
                document.querySelector("#successMessage");

            if (name === "" || email === "" || message === "") {
                successMessage.textContent =
                    "Please complete all fields.";

                successMessage.style.color = "red";
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                successMessage.textContent =
                    "Please enter a valid email address.";

                successMessage.style.color = "red";
                return;
            }

            successMessage.textContent =
                "Thank you! Your message has been sent.";

            successMessage.style.color = "green";

            contactForm.reset();
        });
    }
});
const productSearch = document.querySelector("#productSearch");
const productCards = document.querySelectorAll(".card");

if (productSearch) {
    productSearch.addEventListener("input", function () {
        const searchText = productSearch.value.toLowerCase();

        productCards.forEach(function (card) {
            const productName = card
                .querySelector("h3")
                .textContent
                .toLowerCase();

            if (productName.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}