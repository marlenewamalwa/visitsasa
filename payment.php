<?php
session_start();
include 'config.php';

$package = $_GET['package'] ?? 'standard';

// Define package prices
$prices = [
  'premium' => 500,
  'deluxe' => 1000
];

if (!isset($prices[$package])) {
  die('Invalid package');
}

$amount = $prices[$package];

// Simulate a user (replace with your logged-in user)
$user_id = $_SESSION['user_id'] ?? 1;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Simulate payment success
  $stmt = $pdo->prepare("INSERT INTO payments (user_id, package, amount, status) VALUES (?, ?, ?, 'paid')");
  $stmt->execute([$user_id, $package, $amount]);

  // Redirect to listing form after "payment"
  header("Location: add_listing.php?package=$package");
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payment</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="payment-container">
    <h2>Confirm Payment</h2>
    <p>You selected the <strong><?= ucfirst($package) ?></strong> package.</p>
    <p>Amount: <strong>Ksh <?= $amount ?></strong></p>

    <form method="POST">
      <button type="submit">Pay Now</button>
    </form>

    <a href="select_package.php">Cancel</a>
  </div>
</body>
</html>
