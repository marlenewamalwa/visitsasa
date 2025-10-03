<?php
session_start();
include 'config.php';

// Make sure user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: signup.php");
    exit();
}

// Get package and amount from URL
$package = $_GET['package'] ?? '';
$amount  = $_GET['amount'] ?? '';

// Save payment record in DB
$stmt = $pdo->prepare("INSERT INTO payments (user_id, package, amount, payment_status, created_at) VALUES (?, ?, ?, ?, NOW())");
$stmt->execute([$_SESSION['user_id'], $package, $amount, 'Completed']);

// Mark user as paid and store package
$update = $pdo->prepare("UPDATE users SET paid = 1, package = ? WHERE id = ?");
$update->execute([$package, $_SESSION['user_id']]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payment Success - Visitsasa</title>
  <style>
    body { font-family: Arial, sans-serif; background:#f7f9fc; text-align:center; padding:50px; }
    .box { background:white; padding:30px; border-radius:15px; max-width:400px; margin:auto; 
           box-shadow:0 8px 20px rgba(0,0,0,0.1); }
    h2 { color:green; margin-bottom:20px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>✅ Payment Successful</h2>
    <p>Thank you, <?php echo $_SESSION['user_name']; ?>!</p>
    <p>You purchased the <b><?php echo htmlspecialchars($package); ?></b> package.</p>
    <p>Amount Paid: <b>$<?php echo htmlspecialchars($amount); ?></b></p>
    <a href="dashboard.php">Go to Dashboard</a>
  </div>
</body>
</html>
