// JavaScript code to handle form submission
document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Fetch form data
    const formData = new FormData(this);

    // Check if new password matches confirm password
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
    }

    // Send form data to server using fetch or XMLHttpRequest
    // Example:
    // fetch('change-password.php', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle response from server
    //     console.log(data);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
});
