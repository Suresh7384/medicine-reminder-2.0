const twilio = require('twilio');
require('dotenv').config();

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (phoneNumber, medicineName, dosage) => {
    try {
        await client.messages.create({
            body: `💊 Reminder: Take ${medicineName} (${dosage})`,
            from: process.env.TWILIO_PHONE,
            to: phoneNumber
        });

        console.log(`SMS sent to ${phoneNumber}`);
    } catch (error) {
        console.error('SMS Error:', error.message);
    }
};

module.exports = { sendSMS };