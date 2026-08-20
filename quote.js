/* =========================================================
   IRONOVA — QUOTE PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const quoteProducts = {

    entry: {
        name: "ENTRY SERIES",
        category: "STEEL DOORS",
        price: "FROM ₹2,25,000",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90"
    },

    french: {
        name: "FRENCH SERIES",
        category: "STEEL DOORS",
        price: "FROM ₹1,95,000",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
    },

    pivot: {
        name: "MERIDIAN PIVOT",
        category: "STEEL DOORS",
        price: "FROM ₹2,85,000",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90"
    },

    sliding: {
        name: "SLIDING SERIES",
        category: "STEEL DOORS",
        price: "FROM ₹2,45,000",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90"
    },

    casement: {
        name: "FACTORY CASEMENT",
        category: "STEEL WINDOWS",
        price: "FROM ₹78,000",
        image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=90"
    },

    fixed: {
        name: "FIXED SERIES",
        category: "STEEL WINDOWS",
        price: "FROM ₹65,000",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90"
    },

    slimline: {
        name: "SLIMLINE SERIES",
        category: "STEEL WINDOWS",
        price: "FROM ₹85,000",
        image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90"
    }

};


/* =========================================================
   PRODUCTION BACKEND
========================================================= */

const API_URL = "https://steel-website.onrender.com";


/* =========================================================
   GET PRODUCT FROM URL
========================================================= */

const params = new URLSearchParams(window.location.search);

const productId = params.get("product") || "pivot";

const product =
    quoteProducts[productId] || quoteProducts.pivot;


/* =========================================================
   DISPLAY SELECTED PRODUCT
========================================================= */

const selectedProductName =
    document.getElementById("selectedProductName");

const selectedProductCategory =
    document.getElementById("selectedProductCategory");

const selectedProductPrice =
    document.getElementById("selectedProductPrice");

const selectedProductImage =
    document.getElementById("selectedProductImage");


if (selectedProductName) {
    selectedProductName.textContent = product.name;
}

if (selectedProductCategory) {
    selectedProductCategory.textContent = product.category;
}

if (selectedProductPrice) {
    selectedProductPrice.textContent = product.price;
}

if (selectedProductImage) {
    selectedProductImage.style.backgroundImage =
        `url("${product.image}")`;
}


/* =========================================================
   QUOTE FORM
========================================================= */

const quoteForm =
    document.getElementById("quoteForm");

const successOverlay =
    document.getElementById("successOverlay");


if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* -------------------------------------------------
               COLLECT FORM DATA
            ------------------------------------------------- */

            const formData = {

                product: product.name,

                name:
                    document
                        .getElementById("fullName")
                        .value
                        .trim(),

                phone:
                    document
                        .getElementById("phone")
                        .value
                        .trim(),

                email:
                    document
                        .getElementById("email")
                        .value
                        .trim(),

                location:
                    document
                        .getElementById("location")
                        .value
                        .trim(),

                projectType:
                    document
                        .getElementById("projectType")
                        .value,

                quantity:
                    document
                        .getElementById("quantity")
                        .value,

                finish:
                    document
                        .getElementById("finish")
                        .value,

                glass:
                    document
                        .getElementById("glass")
                        .value,

                width:
                    document
                        .getElementById("width")
                        .value
                        .trim(),

                height:
                    document
                        .getElementById("height")
                        .value
                        .trim(),

                message:
                    document
                        .getElementById("message")
                        .value
                        .trim()

            };


            /* -------------------------------------------------
               SAVE LAST QUOTE LOCALLY
            ------------------------------------------------- */

            localStorage.setItem(
                "ironovaLastQuote",
                JSON.stringify(formData)
            );


            /* -------------------------------------------------
               SUBMIT BUTTON
            ------------------------------------------------- */

            const submitButton =
                quoteForm.querySelector(".submit-btn");

            const originalButtonText =
                submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.innerHTML =
                "SENDING...";


            /* -------------------------------------------------
               SEND TO RENDER BACKEND
               
               IMPORTANT:
               Backend endpoint is /api/quote
            ------------------------------------------------- */

            try {

                const response = await fetch(
                    `${API_URL}/api/quote`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(formData)
                    }
                );


                /* -------------------------------------------------
                   READ SERVER RESPONSE
                ------------------------------------------------- */

                const result =
                    await response.json();


                /* -------------------------------------------------
                   CHECK RESPONSE
                ------------------------------------------------- */

                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to send quote request."
                    );

                }


                console.log(
                    "Quote sent successfully:",
                    result
                );


                /* -------------------------------------------------
                   SHOW SUCCESS MESSAGE
                ------------------------------------------------- */

                if (successOverlay) {

                    successOverlay.classList.add(
                        "show"
                    );

                    document.body.style.overflow =
                        "hidden";
                }


                /* -------------------------------------------------
                   RESET FORM
                ------------------------------------------------- */

                quoteForm.reset();

                document.getElementById(
                    "quantity"
                ).value = "1";


            } catch (error) {

                console.error(
                    "Quote submission error:",
                    error
                );


                alert(
                    "Sorry, your quote request could not be sent. Please try again."
                );


            } finally {

                /* -------------------------------------------------
                   RESTORE BUTTON
                ------------------------------------------------- */

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButtonText;

            }

        }
    );

}


/* =========================================================
   SUCCESS MESSAGE → HOME
========================================================= */

const successClose =
    document.getElementById("successClose");


if (successClose) {

    successClose.addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );

}