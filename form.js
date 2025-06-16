// Initialize EmailJS with your user public key
(function () {
    emailjs.init("BlvI5daBQiA39-pKM"); // Your Public Key
})();

// Send email function
function sendEmail(event) {
    event.preventDefault(); // Prevent default form submission

    // Your Service ID and Template ID
    const serviceID = "service_lud335h"; // Your Service ID
    const templateID = "template_wpqnt22"; // Your Template ID

    // Get form data
    const userName = document.getElementById("user-name").value;
    const userEmail = document.getElementById("recipient-email").value;
    const userPhone = document.getElementById("user-phone").value;
    const userRequest = document.getElementById("user-request").value;
    const userAddress = document.getElementById("user-address").value;

    // Validate inputs
    if (!userName || !userEmail || !userPhone || !userRequest || !userAddress) {
        alert("Please fill all fields.");
        return;
    }

    // Send email with EmailJS
    emailjs
        .send(serviceID, templateID, {
            user_name: userName,
            user_email: userEmail,
            user_phone: userPhone,
            user_request: userRequest,
            user_address: userAddress,
        })
        .then(
            function (response) {
                alert("Email sent successfully! Status: " + response.status);
                // Redirect to payment.html
                window.location.href = "payment.html";
            },
            function (error) {
                console.error("Error sending email: ", error);
                alert("Failed to send email: " + error.text);
            }
        );
}
