<?php
include 'config.php';
$user_id = $_SESSION['user_id'] ?? 1; // adjust to your auth system
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
  $transaction_id = $data['transaction_id'];
  $amount = $data['amount'];
  $package = $data['package'];
  $status = 'completed';

  $stmt = $conn->prepare("INSERT INTO payments (user_id, package, amount, status, transaction_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
  $stmt->bind_param("isdss", $user_id, $package, $amount, $status, $transaction_id);

  if ($stmt->execute()) {
    echo "success";
  } else {
    echo "error: " . $conn->error;
  }

  $stmt->close();
}
?>
