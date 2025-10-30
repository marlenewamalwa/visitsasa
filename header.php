<?php
// Start output buffering to prevent "headers already sent"
ob_start();
session_start(); // must be first

$isLoggedIn = !empty($_SESSION['user_id']);
$userName   = $isLoggedIn && !empty($_SESSION['user_name'])
    ? htmlspecialchars($_SESSION['user_name'])
    : '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VisitSasa</title>
    <style>
        /* Navigation CSS (same as yours) */
        nav {
            background: rgba(255, 255, 255, 0.95);
            padding: 1rem 5%;
            position: fixed;
            width: 100%;
            height: 90px;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        /* ... rest of your CSS ... */
        body {
            margin: 0;
            padding-top: 70px;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
<header>
    <nav>
        <div class="nav-container">
            <a href="index.php" class="logo">
                <img src="images/logo.png" alt="VisitSasa Logo" style="height:70px;">
            </a>
            <div class="nav-links">
                <a href="index.php">Home</a>
                <a href="destinations.php">Destinations</a>
                <a href="about.php">About</a>
                <a href="contact.php">Contact</a>

                <?php if ($isLoggedIn): ?>
                    <a href="profile.php" class="btn-sign-in">👤 <?= $userName ?></a>
                    <button class="btn-add-listing" onclick="location.href='select_package.php'">+ Add Listing</button>
                <?php else: ?>
                    <a href="login.php" class="btn-sign-in">👤 Log In</a>
                    <button class="btn-add-listing" onclick="location.href='signup.php'">+ Add Listing</button>
                <?php endif; ?>
            </div>
        </div>
    </nav>
</header>
