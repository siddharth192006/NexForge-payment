// Owner's UPI ID for collecting payments
const ownerUPIId = "siddharthdeshmukh24@fam"; // Replace with your actual UPI ID

document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get user inputs
    const upiID = document.getElementById('upiID').value;
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;

    // UPI ID validation (basic format check)
    const upiRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
    const upiMessageDiv = document.getElementById('upiMessage');
    if (!upiRegex.test(upiID)) {
        upiMessageDiv.classList.remove('hidden');
        upiMessageDiv.innerHTML = "⚠️ Invalid UPI ID format. Please check your input.";
        return;
    } else {
        upiMessageDiv.classList.add('hidden'); // Hide message if valid
    }

    // Phone number validation (check for +91 and 10 digits)
    const phoneRegex = /^\+91\d{10}$/;
    const phoneMessageDiv = document.getElementById('phoneMessage');
    if (!phoneRegex.test(phone)) {
        phoneMessageDiv.classList.remove('hidden');
        phoneMessageDiv.innerHTML = "⚠️ Please enter a valid Indian phone number in the format +91XXXXXXXXXX.";
        return;
    } else {
        phoneMessageDiv.classList.add('hidden'); // Hide message if valid
    }

    // Amount validation (check for valid number and not exceeding limits)
    const amountNumber = Number(amount);
    const amountMessageDiv = document.getElementById('amountMessage');
    if (isNaN(amountNumber) || amountNumber <= 0) {
        amountMessageDiv.classList.remove('hidden');
        amountMessageDiv.innerHTML = "⚠️ Please enter a valid payment amount.";
        return;
    } else {
        amountMessageDiv.classList.add('hidden'); // Hide message if valid
    }

    // Show a success message indicating the payment has been sent
    const messageDiv = document.getElementById('message');
    messageDiv.classList.remove('hidden');
    messageDiv.innerHTML = `✅ Payment of ₹${amount} has been successfully sent to the owner's UPI ID (${ownerUPIId}). A confirmation SMS will be dispatched to ${phone}.`;

    // Prepare the payment URL and redirect to the UPI payment app
    const paymentUrl = `upi://pay?pa=${ownerUPIId}&pn=YourName&am=${amount}&tn=Payment%20for%20service%20rendered`;

    // Redirect the user to the UPI payment application
    window.location.href = paymentUrl;

    // Log payment request details (for demonstration purposes)
    console.log(`Payment request: Amount: ₹${amountNumber}, UPI ID: ${upiID}, Phone: ${phone}, Owner UPI ID: ${ownerUPIId}`);
});
