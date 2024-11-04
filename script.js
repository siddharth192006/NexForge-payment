document.getElementById("upi-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const upiID = document.getElementById("upi-id").value.trim();
    const amount = document.getElementById("amount").value;
    const phoneNumber = document.getElementById("phone-number").value.trim();

    if (!upiID || !amount || amount <= 0 || amount > 2000 || !phoneNumber) {
        alert("Please enter a valid UPI ID, amount (up to ₹2000), and phone number.");
        return;
    }

    // Construct the UPI URL for initiating payment
    const upiUrl = `upi://pay?pa=${upiID}&am=${amount}&cu=INR`;

    // Send payment request to your server (assumed URL is /send-sms)
    fetch('/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone: phoneNumber,
            amount: amount,
            upiID: upiID
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Inform the user about the payment request
            const message = document.getElementById("message");
            message.innerHTML = `<strong>Payment Request Generated!</strong><br>You will receive a notification on your mobile device's UPI-connected application to complete the payment of ₹${amount}.`;
            message.classList.remove("hidden");
        } else {
            alert("Error sending SMS: " + data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // Generate QR code for the payment
    $('#qrcode').empty().qrcode({
        text: upiUrl,
        width: 128,
        height: 128,
    }).removeClass("hidden");
});
