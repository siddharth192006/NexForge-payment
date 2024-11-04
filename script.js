document.getElementById("upi-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const upiID = document.getElementById("upi-id").value.trim();
    if (!upiID) {
        alert("Please enter your UPI ID.");
        return;
    }

    // Inform the user about the UPI request
    const message = document.getElementById("message");
    message.innerHTML = `<strong>Payment Request Sent!</strong><br>You will receive a notification on your mobile device's UPI-connected application (like PhonePe, Paytm, Google Pay, etc.) to complete the payment of ₹30.`;
    message.classList.remove("hidden");

    const yourUpiId = "siddharthdeshmukh24@fam"; // Your actual UPI ID
    const name = "Siddharth Deshmukh"; // Your name
    const amount = "01.00"; // Payment amount
    const transactionNote = "Payment from NexForge"; // Description of the payment

    // Construct the UPI URL for initiating payment
    const upiUrl = `upi://pay?pa=${yourUpiId}&pn=${encodeURIComponent(name)}&mc=&tid=${Date.now()}&tr=${Date.now()}&tn=${encodeURIComponent(transactionNote)}&am=${amount}&cu=INR`;

    // Try to open the UPI URL (works better on mobile devices)
    setTimeout(() => {
        window.location.href = upiUrl;
    }, 2000); // Wait for 2 seconds before attempting to open the UPI link
});
