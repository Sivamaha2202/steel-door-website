/* =========================================================
   IRONOVA — PRODUCT DETAILS JAVASCRIPT
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = {

    entry: {
        name: "ENTRY SERIES",
        category: "STEEL DOORS",
        series: "STEEL DOORS · ENTRY SERIES",
        price: 225000,
        priceText: "FROM ₹2,25,000",

        dimensions: "1000 × 2100 mm",
        frame: "50 × 100 mm",

        description:
            "A refined steel entry door designed for contemporary homes and architectural entrances, combining slim profiles with dependable strength.",

        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90"
    },


    french: {
        name: "FRENCH SERIES",
        category: "STEEL DOORS",
        series: "STEEL DOORS · FRENCH SERIES",
        price: 195000,
        priceText: "FROM ₹1,95,000",

        dimensions: "900 × 2100 mm",
        frame: "45 × 90 mm",

        description:
            "Elegant steel French doors with generous glazing, slim sightlines and a timeless architectural character.",

        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90"
    },


    pivot: {
        name: "MERIDIAN PIVOT",
        category: "STEEL DOORS",
        series: "STEEL DOORS · PIVOT SERIES",
        price: 285000,
        priceText: "FROM ₹2,85,000",

        dimensions: "900 × 2100 mm",
        frame: "50 × 100 mm",

        description:
            "A refined architectural steel pivot door designed for bold entrances, slim sightlines and long-term performance.",

        image:
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=90"
    },


    sliding: {
        name: "SLIDING SERIES",
        category: "STEEL DOORS",
        series: "STEEL DOORS · SLIDING SERIES",
        price: 245000,
        priceText: "FROM ₹2,45,000",

        dimensions: "1800 × 2400 mm",
        frame: "50 × 100 mm",

        description:
            "A contemporary sliding steel system designed for larger openings, combining smooth operation with strong architectural proportions.",

        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90"
    },


    casement: {
        name: "FACTORY CASEMENT",
        category: "STEEL WINDOWS",
        series: "STEEL WINDOWS · CASEMENT SERIES",
        price: 78000,
        priceText: "FROM ₹78,000",

        dimensions: "1200 × 1500 mm",
        frame: "40 × 75 mm",

        description:
            "Slim steel casement windows designed for ventilation, natural light and a strong industrial architectural expression.",

        image:
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=90"
    },


    fixed: {
        name: "FIXED SERIES",
        category: "STEEL WINDOWS",
        series: "STEEL WINDOWS · FIXED SERIES",
        price: 65000,
        priceText: "FROM ₹65,000",

        dimensions: "1500 × 1800 mm",
        frame: "40 × 75 mm",

        description:
            "Fixed steel windows designed to create clean architectural openings while maximising natural light and views.",

        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90"
    },


    slimline: {
        name: "SLIMLINE SERIES",
        category: "STEEL WINDOWS",
        series: "STEEL WINDOWS · SLIMLINE SERIES",
        price: 85000,
        priceText: "FROM ₹85,000",

        dimensions: "1200 × 1800 mm",
        frame: "35 × 70 mm",

        description:
            "Ultra-slim steel windows created for modern architectural projects where maximum glass and minimal framing are required.",

        image:
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90"
    }

};


/* =========================================================
   GET PRODUCT ID
========================================================= */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id") || "pivot";

const product = products[productId] || products.pivot;


/* =========================================================
   LOAD PRODUCT
========================================================= */

document.title = `IRONOVA — ${product.name}`;


document.getElementById("productName").textContent =
    product.name;


document.getElementById("productCategory").textContent =
    product.category;


document.getElementById("productSeries").textContent =
    product.series;


document.getElementById("productPrice").textContent =
    product.priceText;


document.getElementById("productDescription").textContent =
    product.description;


document.getElementById("productDimensions").textContent =
    product.dimensions;


document.getElementById("productFrame").textContent =
    product.frame;


document.getElementById("bottomDescription").textContent =
    product.description;


document.getElementById("productImage").style.backgroundImage =
    `url("${product.image}")`;


/* =========================================================
   QUANTITY
========================================================= */

let quantity = 1;


const quantityDisplay =
    document.getElementById("quantity");


document.getElementById("minusBtn").addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

        quantityDisplay.textContent = quantity;

    }

});


document.getElementById("plusBtn").addEventListener("click", () => {

    quantity++;

    quantityDisplay.textContent = quantity;

});


/* =========================================================
   CART
========================================================= */

let cart = JSON.parse(
    localStorage.getItem("ironovaCart")
) || [];


function saveCart() {

    localStorage.setItem(
        "ironovaCart",
        JSON.stringify(cart)
    );

}


/* =========================================================
   ADD TO CART
========================================================= */

document.getElementById("addCartBtn").addEventListener("click", () => {

    const finish =
        document.getElementById("finishSelect").value;


    const glass =
        document.getElementById("glassSelect").value;


    const existingProduct = cart.find(item =>
        item.id === productId &&
        item.finish === finish &&
        item.glass === glass
    );


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            id: productId,

            name: product.name,

            price: product.price,

            image: product.image,

            finish: finish,

            glass: glass,

            quantity: quantity

        });

    }


    saveCart();

    updateCartCount();

    openCart();

});


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    document.getElementById("cartCount").textContent =
        count;

}


/* =========================================================
   OPEN / CLOSE CART
========================================================= */

const cartOverlay =
    document.getElementById("cartOverlay");


document.getElementById("cartBtn").addEventListener(
    "click",
    openCart
);


document.getElementById("cartClose").addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener("click", (event) => {

    if (event.target === cartOverlay) {

        closeCart();

    }

});


function openCart() {

    renderCart();

    cartOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeCart() {

    cartOverlay.classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");


    const cartTotal =
        document.getElementById("cartTotal");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                color:#777;
                font-size:11px;
                padding:30px 0;
            ">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;

    }


    let total = 0;


    cartItems.innerHTML = cart.map((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        return `

            <div class="cart-item">

                <div
                    class="cart-item-image"
                    style="
                        background-image:
                        url('${item.image}')
                    "
                ></div>


                <div>

                    <h3>
                        ${item.name}
                    </h3>


                    <p>
                        ${item.finish}
                        ·
                        ${item.glass}
                    </p>


                    <p>
                        Qty: ${item.quantity}
                    </p>


                    <p>
                        ₹${itemTotal.toLocaleString("en-IN")}
                    </p>

                </div>


                <button
                    class="remove-item"
                    onclick="removeCartItem(${index})"
                >
                    ×
                </button>

            </div>

        `;

    }).join("");


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeCartItem(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    renderCart();

}


/* =========================================================
   REQUEST A QUOTE
========================================================= */

const quoteProductBtn =
    document.getElementById("quoteProductBtn");


if (quoteProductBtn) {

    quoteProductBtn.addEventListener("click", function () {

        /*
         * Get the current product ID.
         *
         * Example:
         * product.html?id=pivot
         *
         * will open:
         * quote.html?product=pivot
         */

        const currentParams =
            new URLSearchParams(window.location.search);


        const currentProductId =
            currentParams.get("id");


        if (currentProductId) {

            window.location.href =
                `quote.html?product=${encodeURIComponent(currentProductId)}`;

        } else {

            window.location.href =
                "quote.html";

        }

    });

}


/* =========================================================
   INITIALIZE
========================================================= */

updateCartCount();