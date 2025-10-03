<?php
session_start();
include 'config.php';

// Make sure user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: signup.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Deluxe Package Form - Visitsasa</title>
<style>
body { font-family: Arial, sans-serif; background:#f7f9fc; padding:50px; }
.container { max-width:600px; margin:auto; background:white; padding:30px; border-radius:15px; box-shadow:0 8px 20px rgba(0,0,0,0.1); }
h2 { margin-bottom:20px; }
input, textarea { width:100%; padding:10px; margin:10px 0; border-radius:8px; border:1px solid #ccc; }
button { background:#0F445F; color:white; padding:12px 20px; border:none; border-radius:8px; cursor:pointer; }
button:hover { background:#0d3a50; }
</style>
</head>
<body>
<div class="container">
  <h2>Deluxe Package Form</h2>
  <form method="post" action="submit_deluxe.php" enctype="multipart/form-data">
    <label for="property_name">Property Name</label>
    <input type="text" id="property_name" name="property_name" required>
 <label for="location">Location</label>
    <input type="text" id="location" name="location" placeholder="Enter the property location" required>
    <label for="description">Description</label>
    <textarea id="description" name="description" rows="4" required></textarea>

    <label for="additional_features">Additional Features</label>
    <textarea id="additional_features" name="additional_features" rows="3" placeholder="Enter extra info"></textarea>

    <label for="banner_advert">Banner Advert URL</label>
    <input type="text" id="banner_advert" name="banner_advert" placeholder="Optional">

    <label for="video_advert">Video Advert URL</label>
    <input type="text" id="video_advert" name="video_advert" placeholder="Optional">

    <label for="amenities">Amenities</label>
    <textarea id="amenities" name="amenities" rows="3" placeholder="List amenities"></textarea>

    <label for="image">Upload an Image</label>
    <input type="file" id="image" name="image" accept="image/*" required>

    <button type="submit">Submit</button>
  </form>
</div>
</body>
</html>
