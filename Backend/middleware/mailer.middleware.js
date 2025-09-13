const nodemailer = require('nodemailer');
const CONFIG = require('../config/config');

const transporter = nodemailer.createTransport({
    // Configure your nodemailer transporter here
    host: CONFIG.sesSmtpHost,
    port: 465,
    secure: true,
    auth: {
        user: CONFIG.sesSmtpUser,
        pass: CONFIG.sesSmtpPassword,
    },
});

const sendRegistrationEmail = async (req, res, next) => {
    try {
        await transporter.sendMail({
            from: 'admin@medora.dev',
            to: req.body.email,
            subject: 'Patient Registration Completed',
            bcc: 'admin@medora.dev',
            text: `Your account was created by Medora Admin. Your username is ${req.body.email} and password is "abcd".`,
        });

        next();
    } catch (error) {
        console.error('Error sending registration email:', error);
        // You can handle the error as needed, e.g., return an error response to the client
        res.status(500).json({ error: 'Error sending registration email' });
    }
};

module.exports.sendRegistrationEmail = sendRegistrationEmail;