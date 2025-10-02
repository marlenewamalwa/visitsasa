<?php
session_start();
include 'config.php';

// Make sure user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: signup.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_SESSION['user_id'];
    $property_name = trim($_POST['property_name']);
    $description = trim($_POST['description']);
    $additional_features = trim($_POST['additional_features']);

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
            $stmt = $pdo->prepare("INSERT INTO premium_forms (user_id, property_name, description, additional_features, image, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
            if ($stmt->execute([$user_id, $property_name, $description, $additional_features, $new_filename])) {
                echo "<script>alert('Premium form submitted successfully!'); window.location.href='dashboard.php';</script>";
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
