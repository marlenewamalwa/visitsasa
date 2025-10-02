<?php
session_start();
include 'config.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: signup.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $package = $_POST['package'];
    $user_id = $_SESSION['user_id'];

    // Save chosen package
    $stmt = $pdo->prepare("UPDATE users SET package = ? WHERE id = ?");
    if ($stmt->execute([$package, $user_id])) {
       if ($package === "Standard") {
    // Redirect Standard users directly to their form
    $_SESSION['selected_package'] = $package; // optional if needed
    header("Location: form_standard.php");
    exit();
} else {
    // Redirect to payment page for Premium/Deluxe
    $_SESSION['selected_package'] = $package;
    header("Location: payment.php");
    exit();
}
    } else {
        echo "Error saving package. Please try again.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Select Package - Visitsasa</title>
<style>
body {
  font-family: Arial, sans-serif;
  background: #f7f9fc;
  margin: 0; padding: 0;
}
.container {
  max-width: 1100px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}
.package {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transition: 0.3s ease;
}
.package:hover { transform: translateY(-5px); }
.package h2 { margin-bottom: 10px; }
.package ul { list-style: none; padding: 0; margin: 20px 0; }
.package ul li { margin: 8px 0; }
.price {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}
button {
  background: linear-gradient(135deg,#0F445F,#1a5c7a);
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}
button:hover { background: #0d3a50; }
</style>
</head>
<body>
<div class="container">
  <!-- Standard -->
  <form method="post" class="package">
    <h2>Standard</h2>
    <div class="price">FREE</div>
    <ul>
      <li>Listing on visitsasa.com</li>
      <li>1 professional property photos</li>
      <li>Email technical support</li>
      <li>1 Social media feature</li>
    </ul>
    <button type="submit" name="package" value="Standard">Choose</button>
  </form>

  <!-- Premium -->
  <form method="post" class="package">
    <h2>Premium</h2>
    <div class="price">$20</div>
    <ul>
      <li>Listing on visitsasa.com</li>
      <li>Email technical support</li>
      <li>3 Social media features</li>
      <li>1 professional property photos</li>
      <li>Room availability calendar</li>
      <li>Event Calendar</li>
    </ul>
    <button type="submit" name="package" value="Premium">Choose</button>
  </form>

  <!-- Deluxe -->
  <form method="post" class="package">
    <h2>Deluxe</h2>
    <div class="price">$149</div>
    <ul>
      <li>Listing on visitsasa.com</li>
      <li>Email technical support</li>
      <li>3 Social media features</li>
      <li>1 professional property photos</li>
      <li>Room availability calendar</li>
      <li>Event Calendar</li>
      <li>Banner Adverts</li>
      <li>Video Adverts</li>
      <li>Free SMS text alerts</li>
      <li>Amenities listing</li>
    </ul>
    <button type="submit" name="package" value="Deluxe">Choose</button>
  </form>
</div>
</body>
</html>
