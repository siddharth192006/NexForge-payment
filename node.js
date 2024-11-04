const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Your Twilio Account SID
const authToken = 'YOUR_TWILIO_AUTH_TOKEN'; // Your Twilio Auth Token
const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
    const { phone, amount, upiID } = req.body;

    client.messages.create({
        body: `Payment of ₹${amount} initiated to UPI ID: ${upiID}.`,
        to: phone,  // Text this number
        from: 'YOUR_TWILIO_PHONE_NUMBER' // From a valid Twilio number
    })
    .then((message) => {
        console.log(`SMS sent: ${message.sid}`);
        res.json({ success: true });
    })
    .catch((error) => {
        console.error('Error sending SMS:', error);
        res.json({ success: false, error: error.message });
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
