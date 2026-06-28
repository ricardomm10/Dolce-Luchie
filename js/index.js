// Oculta el encabezado en celular al bajar y lo muestra de nuevo al subir.
const header = document.querySelector(".site-header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const currentScrollY = window.scrollY;

    if (!header || !isMobile) {
        header?.classList.remove("nav-hidden");
        lastScrollY = currentScrollY;
        return;
    }

    if (currentScrollY > lastScrollY && currentScrollY > 120) {
        header.classList.add("nav-hidden");
    } else {
        header.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
});

// Crea el carrito flotante para agregar, ver total y eliminar postres.
const cartKey = "dolceLuchieCart";
const addButtons = document.querySelectorAll(".add-to-cart");
const cartWidget = document.createElement("aside");

cartWidget.className = "cart-widget";
cartWidget.innerHTML = `
    <button class="cart-toggle" type="button" aria-expanded="false">
        Carrito <span class="cart-count">0</span>
    </button>
    <div class="cart-panel" aria-label="Carrito de compras">
        <div class="cart-header">
            <h2>Tu pedido</h2>
            <button class="cart-close" type="button" aria-label="Cerrar carrito">×</button>
        </div>
        <div class="cart-list"></div>
        <div class="cart-total">
            <span>Total</span>
            <strong>$0.00</strong>
        </div>
    </div>
`;

document.body.appendChild(cartWidget);

const cartToggle = cartWidget.querySelector(".cart-toggle");
const cartClose = cartWidget.querySelector(".cart-close");
const cartCount = cartWidget.querySelector(".cart-count");
const cartList = cartWidget.querySelector(".cart-list");
const cartTotal = cartWidget.querySelector(".cart-total strong");

const getCart = () => JSON.parse(localStorage.getItem(cartKey)) || [];

const saveCart = (items) => {
    localStorage.setItem(cartKey, JSON.stringify(items));
};

const formatPrice = (price) => `$${price.toFixed(2)}`;

const renderCart = () => {
    const items = getCart();
    const total = items.reduce((sum, item) => sum + item.price, 0);

    cartCount.textContent = items.length;
    cartTotal.textContent = formatPrice(total);

    if (items.length === 0) {
        cartList.innerHTML = `<p class="cart-empty">Aún no has agregado postres.</p>`;
        return;
    }

    cartList.innerHTML = items.map((item, index) => `
        <article class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <span>${formatPrice(item.price)}</span>
            </div>
            <button class="cart-remove" type="button" data-index="${index}" aria-label="Eliminar ${item.name}">Eliminar</button>
        </article>
    `).join("");
};

addButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const items = getCart();
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        items.push({ name, price });
        saveCart(items);
        renderCart();
        cartWidget.classList.add("open");
        cartToggle.setAttribute("aria-expanded", "true");
    });
});

cartToggle.addEventListener("click", () => {
    const isOpen = cartWidget.classList.toggle("open");
    cartToggle.setAttribute("aria-expanded", String(isOpen));
});

cartClose.addEventListener("click", () => {
    cartWidget.classList.remove("open");
    cartToggle.setAttribute("aria-expanded", "false");
});

cartList.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".cart-remove");

    if (!removeButton) {
        return;
    }

    const items = getCart();
    items.splice(Number(removeButton.dataset.index), 1);
    saveCart(items);
    renderCart();
});

renderCart();