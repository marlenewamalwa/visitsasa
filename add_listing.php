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
  <link rel="stylesheet" href="style.css">
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
