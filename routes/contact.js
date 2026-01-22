const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.log("Error with email configuration:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// POST route to handle contact form
router.post("/", async (req, res) => {
  const { name, contact, email, subject, message } = req.body;

  // Validation
  if (!name || !contact || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Email to admin
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Enquiry: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px;">
            New Enquiry from SKV Builders Website
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Contact Number:</strong> ${contact}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4CAF50;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from the SKV Builders contact form.</p>
            <p>Date: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          </div>
        </div>
      </div>
    `,
  };

  // Auto-reply to customer
  const autoReplyOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting SKV Builders",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4CAF50; margin: 0;">SKV Builders & Developers</h1>
          </div>
          
          <h2 style="color: #333;">Dear ${name},</h2>
          
          <p style="line-height: 1.6; color: #555;">
            Thank you for contacting SKV Builders & Developers. We have received your enquiry regarding <strong>${subject}</strong>.
          </p>
          
          <p style="line-height: 1.6; color: #555;">
            Our team will review your message and get back to you within 24 hours.
          </p>
          
          <div style="margin: 30px 0; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
            <p style="margin: 5px 0;"><strong>Your enquiry details:</strong></p>
            <p style="margin: 5px 0;">Name: ${name}</p>
            <p style="margin: 5px 0;">Subject: ${subject}</p>
            <p style="margin: 5px 0;">Contact: ${contact}</p>
          </div>
          
          <p style="line-height: 1.6; color: #555;">
            If you have any urgent queries, feel free to reach us at:
          </p>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0;">📞 +91 6369254389</p>
            <p style="margin: 5px 0;">📧 skvbuilders@gmail.com</p>
            <p style="margin: 5px 0;">📍 53, Defence Colony, 2nd Avenue, Pallavaram, Chennai – 32</p>
          </div>
          
          <p style="line-height: 1.6; color: #555;">
            Best Regards,<br>
            <strong>SKV Builders & Developers Team</strong>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; text-align: center;">
            <p>© 2025 SKV Builders & Developers. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
});

module.exports = router;