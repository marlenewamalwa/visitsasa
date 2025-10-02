<?php
session_start();
include 'config.php';

// Make sure user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: signup.php");
    exit();
}

// Get user info
$stmt = $pdo->prepare("SELECT name, package, paid FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Determine form link
$form_link = '';
if ($user['package'] === 'Standard') {
    $form_link = 'form_standard.php';
} elseif ($user['package'] === 'Premium') {
    $form_link = 'form_premium.php';
} elseif ($user['package'] === 'Deluxe') {
    $form_link = 'form_deluxe.php';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dashboard - Visitsasa</title>
<style>
body { font-family: Arial, sans-serif; background:#f7f9fc; margin:0; padding:0; }
.container { max-width:900px; margin:50px auto; padding:30px; background:white; border-radius:15px; box-shadow:0 8px 20px rgba(0,0,0,0.1); }
h1 { margin-bottom:20px; }
.card { background:#f1f5f9; padding:20px; border-radius:12px; margin-bottom:20px; }
a.button { display:inline-block; background:#0F445F; color:white; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; }
a.button:hover { background:#0d3a50; }
</style>
</head>
<body>
<div class="container">
    <h1>Welcome, <?php echo htmlspecialchars($user['name']); ?>!</h1>

    <div class="card">
        <h2>Your Package: <?php echo $user['package'] ?? 'None'; ?></h2>
        <p>Status: <?php echo $user['paid'] ? 'Paid' : 'Pending'; ?></p>
        <?php if ($form_link && $user['paid']): ?>
            <a class="button" href="<?php echo $form_link; ?>">Go to Your Form</a>
        <?php endif; ?>
    </div>

    <div class="card">
        <h2>Account Settings</h2>
        <a class="button" href="profile.php">Edit Profile</a>
        <a class="button" href="logout.php">Logout</a>
    </div>
</div>
</body>
</html>
