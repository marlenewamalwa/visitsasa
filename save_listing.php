<?php
session_start();
include 'config.php';

// Simulate logged-in user (replace with real session)
$user_id = $_SESSION['user_id'] ?? 1;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $package = $_POST['package'];
  $name = trim($_POST['property_name']);
  $location = trim($_POST['location']);
  $description = $_POST['description'] ?? null;
  $contact = $_POST['contact_info'] ?? null;
  $social = $_POST['social_links'] ?? null;

  // Handle image uploads
  $uploadDir = 'uploads/';
  if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

  $uploaded = [];
  $maxFiles = $package == 'standard' ? 1 : ($package == 'premium' ? 5 : 10);

  if (!empty($_FILES['images']['name'][0])) {
    $total = count($_FILES['images']['name']);
    if ($total > $maxFiles) $total = $maxFiles;

    for ($i = 0; $i < $total; $i++) {
      $fileName = time() . '_' . basename($_FILES['images']['name'][$i]);
      $target = $uploadDir . $fileName;

      if (move_uploaded_file($_FILES['images']['tmp_name'][$i], $target)) {
        $uploaded[] = $fileName;
      }
    }
  }

  $imagesJson = json_encode($uploaded);

  // Save to DB
  $stmt = $pdo->prepare("INSERT INTO listings 
    (user_id, package, property_name, location, description, contact_info, social_links, images) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  
  $stmt->execute([$user_id, $package, $name, $location, $description, $contact, $social, $imagesJson]);

  echo "<script>alert('Listing added successfully!');window.location.href='profile.php';</script>";
  exit;
}
?>
