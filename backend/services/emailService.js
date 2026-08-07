const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (email, medicineName, time) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: '💊 Medicine Reminder',
            html: `
                <h2>Medicine Reminder</h2>
                <p>It's time to take your medicine:</p>
                <h3>${medicineName}</h3>
                <p><b>Scheduled Time:</b> ${time}</p>
                <br/>
                <p>Stay healthy 💙</p>
            `
        });

        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Email Error:', error.message);
    }
};

module.exports = { sendEmail };