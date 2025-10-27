<?php
session_start();
include 'config.php';

if (!isset($_SESSION['user_id'])) {
  header('Location: login.php');
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
  $userId = $_SESSION['user_id'];
  $id = (int)$_POST['id'];

  // delete only if owned by user
  $stmt = $pdo->prepare("DELETE FROM listings WHERE id = ? AND user_id = ?");
  $stmt->execute([$id, $userId]);
}

header('Location: profile.php');
exit;
?>
