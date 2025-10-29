<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require 'config.php';

if (isset($_GET['code'])) {
    // Get the Google access token
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

    // Check for errors in token
    if (!isset($token['error'])) {
        $client->setAccessToken($token['access_token']);

        // Get user info
        $google_service = new Google_Service_Oauth2($client);
        $userData = $google_service->userinfo->get();

        $email = $userData['email'];
        $name  = $userData['name'];

        // Check if user already exists
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user) {
            // Log the user in
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];

            echo "<script>
                    alert('Welcome back, $name!');
                    window.location.href='profile.php';
                  </script>";
            exit();
        } else {
            // New user → insert into DB
            $insert = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            // Use a random placeholder password since Google users don’t set one
            $insert->execute([$name, $email, password_hash(bin2hex(random_bytes(8)), PASSWORD_DEFAULT)]);
            $newUserId = $pdo->lastInsertId();

            $_SESSION['user_id'] = $newUserId;
            $_SESSION['user_name'] = $name;

            echo "<script>
                    alert('Account created successfully with Google!');
                    window.location.href='profile.php';
                  </script>";
            exit();
        }
    } else {
        echo "<script>alert('Google authentication failed.'); window.location.href='login.php';</script>";
    }
} else {
    echo "<script>alert('No Google authorization code received.'); window.location.href='login.php';</script>";
}
?>
