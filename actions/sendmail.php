<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// PHPMailer files
require '../components/phpMailer/src/Exception.php';
require '../components/phpMailer/src/PHPMailer.php';
require '../components/phpMailer/src/SMTP.php';

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect form fields
    $name     = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email    = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $phone    = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
    $date     = isset($_POST['date']) ? htmlspecialchars($_POST['date']) : '';
    $location = isset($_POST['location']) ? htmlspecialchars($_POST['location']) : '';
    $events   = isset($_POST['events']) ? implode(", ", $_POST['events']) : 'None selected';

    // Validation
    if (empty($name) || empty($email) || empty($phone) || empty($date)) {
        die("❌ Please fill all required fields.");
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP Settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'khushmankalsi.code@gmail.com'; // Your Gmail
        $mail->Password   = 'vdsfwepludayejof';              // App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Sender & Recipient
        $mail->setFrom('khushmankalsi.code@gmail.com', 'Wedding Inquiry Form');
        $mail->addAddress('recipient@example.com'); // Your receiving email
        $mail->addReplyTo($email, $name);

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = "New Wedding Inquiry from $name";
        $mail->Body    = "
            <h2 style='color:#b8941f;'>Wedding Inquiry Details</h2>
            <p><strong>Full Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Phone/WhatsApp:</strong> {$phone}</p>
            <p><strong>Wedding Date:</strong> {$date}</p>
            <p><strong>Wedding Location:</strong> {$location}</p>
            <p><strong>Type of Events:</strong> {$events}</p>
        ";

        // Send Email
        $mail->send();
        
        // Redirect to success page
        header("Location: ../success.html");
        exit();
    } catch (Exception $e) {
        echo "❌ Email could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "❌ Invalid request.";
}
?>
