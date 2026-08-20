require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
    res.send("IRONOVA backend is running!");
});


// ===============================
// GMAIL TRANSPORTER
// ===============================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// ===============================
// CHECK GMAIL CONNECTION
// ===============================

transporter.verify((error, success) => {

    if (error) {

        console.error("❌ Gmail connection failed:");
        console.error(error);

    } else {

        console.log("✅ Gmail SMTP connection successful!");

    }

});


// ===============================
// QUOTE API
// ===============================

app.post("/api/quote", async (req, res) => {

    try {

        const {
            product,
            name,
            phone,
            email,
            location,
            projectType,
            quantity,
            finish,
            glass,
            width,
            height,
            message
        } = req.body;


        console.log("================================");
        console.log("NEW IRONOVA QUOTE REQUEST");
        console.log("================================");

        console.log(req.body);


        if (!name || !email || !phone) {

            return res.status(400).json({
                success: false,
                message: "Name, email and phone are required."
            });

        }


        const mailOptions = {

            from: `"IRONOVA Website" <${process.env.EMAIL_USER}>`,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `New IRONOVA Quote Request - ${product || "Product"}`,

            html: `

                <h2>IRONOVA — New Quote Request</h2>

                <h3>Customer Details</h3>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Phone:</strong> ${phone}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Location:</strong> ${location || "Not specified"}</p>


                <h3>Project Details</h3>

                <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>

                <p><strong>Quantity:</strong> ${quantity || "Not specified"}</p>


                <h3>Product Specifications</h3>

                <p><strong>Product:</strong> ${product || "Not specified"}</p>

                <p><strong>Finish:</strong> ${finish || "Not specified"}</p>

                <p><strong>Glass:</strong> ${glass || "Not specified"}</p>

                <p><strong>Width:</strong> ${width || "Not specified"}</p>

                <p><strong>Height:</strong> ${height || "Not specified"}</p>


                <h3>Project Requirements</h3>

                <p>${message || "No additional message provided."}</p>

            `
        };


        const info = await transporter.sendMail(mailOptions);


        console.log("================================");
        console.log("✅ QUOTE EMAIL SENT SUCCESSFULLY");
        console.log("Message ID:", info.messageId);
        console.log("================================");


        res.status(200).json({

            success: true,

            message: "Quote request sent successfully!"

        });


    } catch (error) {

        console.error("================================");
        console.error("❌ EMAIL SENDING FAILED");
        console.error(error);
        console.error("================================");


        res.status(500).json({

            success: false,

            message: "Unable to send quote request."

        });

    }

});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(`IRONOVA backend running on port ${PORT}`);

});