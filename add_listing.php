<?php
session_start();
include 'config.php';

$package = $_GET['package'] ?? 'standard';

// Validate package
$allowed = ['standard', 'premium', 'deluxe'];
if (!in_array($package, $allowed)) {
  die('Invalid package');
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add Listing (<?= ucfirst($package) ?>)</title>
  <link rel="icon" type="image/png" href="images/logo.png">
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
      border-radius: 4px;
    }
    .form-container button {
      margin-top: 15px;
      padding: 10px 15px;
      background-color: #11989B;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .form-container button:hover {
      background-color: #0e7a7b;
    }
    </style>
</head>
<body>
  <div class="form-container">
    <h2>Add Listing - <?= ucfirst($package) ?> Package</h2>

    <form action="save_listing.php" method="POST" enctype="multipart/form-data">
      <input type="hidden" name="package" value="<?= htmlspecialchars($package) ?>">

      <label>Property Name</label>
      <input type="text" name="property_name" required>

      <label>Location</label>
      <input type="text" name="location" required>

      <?php if ($package != 'standard'): ?>
        <label>Description</label>
        <textarea name="description"></textarea>

        <label>Contact Info</label>
        <input type="text" name="contact_info">
      <?php endif; ?>

      <?php if ($package == 'deluxe'): ?>
        <label>Social Links</label>
        <input type="url" name="social_links">
      <?php endif; ?>

      <label>Upload Images</label>
      <input type="file" name="images[]" multiple accept="image/*" id="images">

      <button type="submit">Submit Listing</button>
    </form>
  </div>

  <script>
  // Limit image uploads based on package
  const pkg = "<?= $package ?>";
  const imageInput = document.getElementById('images');
  const limits = { standard: 1, premium: 5, deluxe: 10 };

  imageInput.addEventListener('change', function() {
    const max = limits[pkg];
    if (this.files.length > max) {
      alert(`You can upload a maximum of ${max} image(s) for the ${pkg} package.`);
      this.value = ''; // reset input
    }
  });
  </script>
</body>
</html>
