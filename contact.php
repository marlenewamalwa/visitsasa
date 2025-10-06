<?php
include  'header.php';
// contact.php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = trim($_POST["name"]);
  $email = trim($_POST["email"]);
  $message = trim($_POST["message"]);

  if ($name && $email && $message) {
    $to = "support@visitsasa.com"; // <-- change this to your actual email
    $subject = "New Contact Message from $name";
    $body = "You received a new message from the VisitSasa contact form:\n\n" .
            "Name: $name\n" .
            "Email: $email\n\n" .
            "Message:\n$message";
    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
      $success = true;
    } else {
      $error = "Message failed to send. Please try again later.";
    }
  } else {
    $error = "Please fill in all fields.";
  }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us - VisitSasa</title>
  <style>
v   * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #F3FAFB;
            color: #0F445F;
        }

    .contact-container {
      max-width: 900px;
      margin: 60px auto;
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #0F445F;
      border-left: 5px solid #11989B;
      padding-left: 10px;
      margin-bottom: 25px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    input, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.3s ease;
    }

    input:focus, textarea:focus {
      border-color: #11989B;
      outline: none;
    }

    button {
      background: #11989B;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button:hover {
      background: #0F445F;
    }

    .info {
      margin-top: 40px;
    }

    .info p {
      font-size: 1rem;
      color: #444;
      line-height: 1.7;
    }

    .success, .error {
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .success {
      background: #e8f9f1;
      color: #0F445F;
      border-left: 5px solid #11989B;
    }

    .error {
      background: #ffecec;
      color: #b80000;
      border-left: 5px solid #ff4b4b;
    }

    footer {
      background: #0F445F;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 60px;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      header h1 {
        font-size: 2rem;
      }
      .contact-container {
        padding: 25px;
      }
    }
  </style>
</head>
<body>

  <div class="contact-container">
    <?php if (!empty($success)): ?>
      <div class="success">✅ Your message has been sent successfully. We’ll get back to you soon!</div>
    <?php elseif (!empty($error)): ?>
      <div class="error">❌ <?php echo $error; ?></div>
    <?php endif; ?>

    <h2>Send Us a Message</h2>
    <form method="POST" action="">
      <input type="text" name="name" placeholder="Your Name" required>
      <input type="email" name="email" placeholder="Your Email" required>
      <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>

    <div class="info">
      <h2>Our Office</h2>
      <p><b>VisitSasa HQ</b><br>
      Nairobi, Kenya<br>
      Phone: +254 700 123 456<br>
      Email: support@visitsasa.com</p>
    </div>
  </div>

  <footer>
    &copy; <?php echo date('Y'); ?> VisitSasa. All Rights Reserved.
  </footer>

</body>
</html>
