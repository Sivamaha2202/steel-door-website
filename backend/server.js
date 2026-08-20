require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("IRONOVA backend is running!");
});

// Gmail transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Quote API
app.post("/api/quote", async (req, res) => {

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

    console.log("New Quote Request:");
    console.log(req.body);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,

        subject: `New IRONOVA Quote Request - ${product}`,

        html: `
            <h2>IRONOVA — New Quote Request</h2>

            <h3>Customer Details</h3>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Location:</strong> ${location}</p>

            <h3>Project Details</h3>

            <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
            <p><strong>Quantity:</strong> ${quantity || "Not specified"}</p>

            <h3>Product Specifications</h3>

            <p><strong>Product:</strong> ${product}</p>
            <p><strong>Finish:</strong> ${finish || "Not specified"}</p>
            <p><strong>Glass:</strong> ${glass || "Not specified"}</p>
            <p><strong>Width:</strong> ${width || "Not specified"}</p>
            <p><strong>Height:</strong> ${height || "Not specified"}</p>

            <h3>Project Requirements</h3>

            <p>${message || "No additional message provided."}</p>
        `
    };

    try {

        await transporter.sendMail(mailOptions);

        console.log("Quote email sent successfully!");

        res.status(200).json({
            success: true,
            message: "Quote request sent successfully!"
        });

    } catch (error) {

        console.error("Email sending failed:", error);

        res.status(500).json({
            success: false,
            message: "Unable to send quote request."
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`IRONOVA backend running on port ${PORT}`);
});