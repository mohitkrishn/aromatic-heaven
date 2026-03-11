import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from '../email/welcome.email.js';
import { ORDER_CONFIRMATION_EMAIL_TEMPLATE } from '../email/orderConfirm.email.js';
import { RESET_PASSWORD_EMAIL_TEMPLATE } from '../email/resetPasswordEmail.js';
// import { VERIFY_ACCOUNT_EMAIL_TEMPLATE } from '../email/verifyAccount.email.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendWelcomeEmail = async (to, name, link) => {
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to,
        subject: 'Welcome to Aromatic Heaven',
        html: WELCOME_EMAIL_TEMPLATE
        .replace("[User Name]!", name)
        .replace("[Verification Link]", link)
    };

    await transporter.sendMail(mailOptions);
}

export const orderConfirmationEmail = async (to, name, serviceName, price) => {
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to,
        subject: 'Your Aromatic Heaven Booking Confirmation',
        html: ORDER_CONFIRMATION_EMAIL_TEMPLATE
            .replace("[User Name]", name)
            .replace("[Type of Service, e.g., Stress-Buster Head Massage]", serviceName)
            .replace("[Price]", price)
    }

    await transporter.sendMail(mailOptions);
}

export const resetPasswordEmail = async (to, user, link) => {
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to,
        subject: 'Reset Your Password - Aromatic Heaven',
        html: RESET_PASSWORD_EMAIL_TEMPLATE
            .replace("[ResetLinkButton]", link)
            .replace("[User Name]", user)
    }

    await transporter.sendMail(mailOptions);
}

// export const verifyUserEmail = async (to, user, link) => {
//     const mailOptions = {
//         from: process.env.EMAIL_ID,
//         to,
//         subject: 'Verify Your Account - Aromatic Heaven',
//         html: VERIFY_ACCOUNT_EMAIL_TEMPLATE
//             .replace("[User Name]", user)
//             .replaceAll("[ResetLinkURL]", link)
//     }

//     await transporter.sendMail(mailOptions);
// }