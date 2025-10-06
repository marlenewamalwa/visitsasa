<?php
session_start();
include 'config.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: signup.php");
    exit();
}

$package = $_GET['package'] ?? '';
$amount  = $_GET['amount'] ?? '';

// (Optional) Save payment record in DB
$stmt = $pdo->prepare("INSERT INTO payments (user_id, package, amount, payment_status, created_at) VALUES (?, ?, ?, ?, NOW())");
$stmt->execute([$_SESSION['user_id'], $package, $amount, 'Completed']);

// Also mark user as paid (optional if you want a flag)
$update = $pdo->prepare("UPDATE users SET package = ?, paid = 1 WHERE id = ?");
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
    <?php
// Determine correct form link
$form_link = '';
if ($package === 'Standard') {
    $form_link = 'form_standard.php';
} elseif ($package === 'Premium') {
    $form_link = 'form_premium.php';
} elseif ($package === 'Deluxe') {
    $form_link = 'form_deluxe.php';
}
?>
<a href="<?php echo $form_link; ?>">Continue to Your Form</a>

  </div>
</body>
</html>
