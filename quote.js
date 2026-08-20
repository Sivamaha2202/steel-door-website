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

        image:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90"
    },


    french: {
        name: "FRENCH SERIES",
        category: "STEEL DOORS",
        price: "FROM ₹1,95,000",

        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
    },


    pivot: {
        name: "MERIDIAN PIVOT",
        category: "STEEL DOORS",
        price: "FROM ₹2,85,000",

        image:
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=90"
    },


    sliding: {
        name: "SLIDING SERIES",
        category: "STEEL DOORS",
        price: "FROM ₹2,45,000",

        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90"
    },


    casement: {
        name: "FACTORY CASEMENT",
        category: "STEEL WINDOWS",
        price: "FROM ₹78,000",

        image:
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=90"
    },


    fixed: {
        name: "FIXED SERIES",
        category: "STEEL WINDOWS",
        price: "FROM ₹65,000",

        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90"
    },


    slimline: {
        name: "SLIMLINE SERIES",
        category: "STEEL WINDOWS",
        price: "FROM ₹85,000",

        image:
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90"
    }

};



/* =========================================================
   GET PRODUCT FROM URL
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const productId =
    params.get("product") || "pivot";


const product =
    quoteProducts[productId] ||
    quoteProducts.pivot;



/* =========================================================
   DISPLAY SELECTED PRODUCT
========================================================= */

document.getElementById(
    "selectedProductName"
).textContent = product.name;


document.getElementById(
    "selectedProductCategory"
).textContent = product.category;


document.getElementById(
    "selectedProductPrice"
).textContent = product.price;


document.getElementById(
    "selectedProductImage"
).style.backgroundImage =
    `url("${product.image}")`;



/* =========================================================
   FORM SUBMISSION
========================================================= */

const quoteForm =
    document.getElementById("quoteForm");


const successOverlay =
    document.getElementById("successOverlay");


quoteForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /*
         * Collect form data
         */

        const formData = {

            product: product.name,

            name:
                document.getElementById(
                    "fullName"
                ).value,

            phone:
                document.getElementById(
                    "phone"
                ).value,

            email:
                document.getElementById(
                    "email"
                ).value,

            location:
                document.getElementById(
                    "location"
                ).value,

            projectType:
                document.getElementById(
                    "projectType"
                ).value,

            quantity:
                document.getElementById(
                    "quantity"
                ).value,

            finish:
                document.getElementById(
                    "finish"
                ).value,

            glass:
                document.getElementById(
                    "glass"
                ).value,

            width:
                document.getElementById(
                    "width"
                ).value,

            height:
                document.getElementById(
                    "height"
                ).value,

            message:
                document.getElementById(
                    "message"
                ).value

        };


        /*
         * Save enquiry locally for now.
         */

        localStorage.setItem(
            "ironovaLastQuote",
            JSON.stringify(formData)
        );


        /*
         * Show success message.
         */

        successOverlay.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }
);



/* =========================================================
   SUCCESS → HOME
========================================================= */

document.getElementById(
    "successClose"
).addEventListener(
    "click",
    function () {

        window.location.href =
            "index.html";

    }
);