<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
include 'config.php';

// Make sure user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: signup.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_SESSION['user_id'];
    $location = trim($_POST['location']);
    $property_name = trim($_POST['property_name']);
    $description = trim($_POST['description']);
    $additional_features = trim($_POST['additional_features']);
    $banner_advert = trim($_POST['banner_advert']);
    $video_advert = trim($_POST['video_advert']);
    $amenities = trim($_POST['amenities']);

    // Handle image upload
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $new_filename = uniqid() . "." . $ext;
        $upload_dir = "uploads/";

        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        $target_file = $upload_dir . $new_filename;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            // Save to database
            $stmt = $pdo->prepare("INSERT INTO deluxe_forms (user_id, location, property_name, description, additional_features, banner_advert, video_advert, amenities, image, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,NOW())");
            if ($stmt->execute([$user_id, $location, $property_name, $description, $additional_features, $banner_advert, $video_advert, $amenities, $new_filename])) {
                echo "<script>alert('Deluxe form submitted successfully!'); window.location.href='dashboard.php';</script>";
                exit();
            } else {
                echo "Database error!";
            }
        } else {
            echo "Failed to upload image.";
        }
    } else {
        echo "Please upload an image.";
    }
}
?>
