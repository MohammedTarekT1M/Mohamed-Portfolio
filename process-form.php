<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Your email address
    $to = "mohamed.wasel2212@icloud.com";
    
    // Email subject
    $email_subject = "New Contact Form: $subject";
    
    // Email content
    $email_body = "
    Name: $firstName $lastName
    Email: $email
    Subject: $subject
    
    Message:
    $message
    ";
    
    // Headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>