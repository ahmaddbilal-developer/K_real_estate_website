import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // If no email creds, log only
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Mock Email Sent:', options);
        return;
    }

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `Real Estate Support <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: options.html // Optional: Add HTML template later
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
