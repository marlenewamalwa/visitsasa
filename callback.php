<?php
ob_start();
require 'config.php'; // Includes Google Client setup and $pdo database connection
// Check if an authorization code was provided by Google
if (isset($_GET['code'])) {
    try {
        // 1. Get the Google access token
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);

        // Check for errors in token retrieval
        if (!isset($token['error'])) {
            $client->setAccessToken($token['access_token']);

            // 2. Get user info
            $google_service = new Google_Service_Oauth2($client);
            $userData = $google_service->userinfo->get();

            $email = $userData['email'];
            $name  = $userData['name'];
            $is_admin = 0; // Default value

            // 3. Check if user already exists
            // Fetch name, id, and is_admin
            $stmt = $pdo->prepare("SELECT id, name, is_admin FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                // Existing User: Log them in and fetch admin status
                $userId = $user['id'];
                $userName = $user['name'];
                $is_admin = $user['is_admin'] ?? 0;
            } else {
                // New User: Insert into DB
                // Using a random password for users created via Google
                $insert = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                $insert->execute([$name, $email, password_hash(bin2hex(random_bytes(8)), PASSWORD_DEFAULT)]);
                $userId = $pdo->lastInsertId();
                $userName = $name;
                $is_admin = 0; // New users are never admin by default
            }

            // CRITICAL FIX 2 & 3: Set the correct session key ($_SESSION['user']) 
            // with all necessary information (id, name, email, is_admin)
            $_SESSION['user'] = [
                'id'       => $userId,
                'name'     => $userName,
                'email'    => $email,
                'is_admin' => $is_admin
            ];

            // 4. Redirect based on role using clean HTTP headers
            if ($is_admin == 1) {
                header("Location: admin.php");
                exit();
            } else {
                header("Location: profile.php");
                exit();
            }

        } else {
            // Token error (e.g., access denied by user or server issue)
            header('Location: login.php?oauth_error=token_failed');
            exit();
        }
    } catch (Exception $e) {
        // Handle other exceptions (e.g., PDO/DB errors, Google API communication fails)
        error_log("Google OAuth Exception: " . $e->getMessage());
        header('Location: login.php?oauth_error=exception');
        exit();
    }
} else {
    // If no code is present (e.g., user denied access initially)
    header('Location: login.php?oauth_error=no_code');
    exit();
}
?>
