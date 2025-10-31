<?php
include 'config.php';
if (!isset($_SESSION['user']['id'])) {
  header('Location: login.php');
  exit;
}
$userId = $_SESSION['user']['id'];
$id = $_GET['id'] ?? null;
if (!$id) {
  die('Listing ID is required.');
}

// fetch existing listing
$stmt = $pdo->prepare("SELECT * FROM listings WHERE id = ? AND user_id = ?");
$stmt->execute([$id, $userId]);
$listing = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$listing) die('Listing not found.');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['property_name']);
  $location = trim($_POST['location']);
  $description = $_POST['description'] ?? null;
  $contact = $_POST['contact_info'] ?? null;
  $social = $_POST['social_links'] ?? null;

  $stmt = $pdo->prepare("UPDATE listings SET property_name=?, location=?, description=?, contact_info=?, social_links=? WHERE id=? AND user_id=?");
  $stmt->execute([$name, $location, $description, $contact, $social, $id, $userId]);

  header('Location: profile.php');
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Edit Listing</title>
<style>
    .form-container {
        width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #f9f9f9;
    }
    .form-container h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    .form-container label {
        display: block;
        margin-top: 10px;
    }
    .form-container input[type="text"],
    .form-container input[type="url"],
    .form-container textarea {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
    .form-container button {
        margin-top: 15px;
        width: 100%;
        padding: 10px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    .form-container button:hover {
        background: #218838;
    }
</style>
</head>
<body>
  <div class="form-container">
    <h2>Edit Listing</h2>
    <form method="POST">
      <label>Property Name</label>
      <input type="text" name="property_name" value="<?php echo htmlspecialchars($listing['property_name']); ?>" required>

      <label>Location</label>
      <input type="text" name="location" value="<?php echo htmlspecialchars($listing['location']); ?>" required>

      <label>Description</label>
<textarea name="description"><?php echo htmlspecialchars($listing['description'] ?? ''); ?></textarea>

<label>Contact Info</label>
<input type="text" name="contact_info" value="<?php echo htmlspecialchars($listing['contact_info'] ?? ''); ?>">

<label>Social Links</label>
<input type="url" name="social_links" value="<?php echo htmlspecialchars($listing['social_links'] ?? ''); ?>">


      <button type="submit" class="btn">Save Changes</button>
    </form>
  </div>
</body>
</html>
