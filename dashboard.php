<?php

include 'config.php';
include 'header.php';

// Make sure user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: signup.php");
    exit();
}

// Get user info
$stmt = $pdo->prepare("SELECT name, package, paid FROM users WHERE id = ?");
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Fetch listings created by this user
$listings = [];

if ($user['package'] === 'Standard') {
    $stmt = $pdo->prepare("SELECT property_name, location, description, image FROM standard_forms WHERE user_id = ?");
} elseif ($user['package'] === 'Premium') {
    $stmt = $pdo->prepare("SELECT property_name, location, description, image FROM premium_forms WHERE user_id = ?");
} elseif ($user['package'] === 'Deluxe') {
    $stmt = $pdo->prepare("SELECT property_name, location, description, image FROM deluxe_forms WHERE user_id = ?");
}

if (!empty($stmt)) {
    $stmt->execute([$_SESSION['user_id']]);
    $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dashboard - Visitsasa</title>
<style>
      * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #F3FAFB;
            color: #0F445F;
        }
.container { max-width:1000px; margin:50px auto; padding:30px; background:white; border-radius:15px; box-shadow:0 8px 20px rgba(0,0,0,0.1); }
h1 { margin-bottom:20px; }
.card { background:#f1f5f9; padding:20px; border-radius:12px; margin-bottom:20px; }
a.button { display:inline-block; background:#0F445F; color:white; padding:10px 20px; border-radius:8px; text-decoration:none; font-weight:bold; }
a.button:hover { background:#0d3a50; }

.grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:20px; margin-top:20px; }
.property { background:#fff; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.1); padding:15px; text-align:center; }
.property img { width:100%; height:180px; object-fit:cover; border-radius:10px; margin-bottom:10px; }
.property h3 { margin:10px 0 5px 0; }
.property p { margin:5px 0; color:#555; }
</style>
</head>
<body>
<div class="container">
    <h1>Welcome, <?php echo htmlspecialchars($user['name']); ?>!</h1>

    <div class="card">
        <h2>Your Package: <?php echo htmlspecialchars($user['package'] ?? 'None'); ?></h2>
        <p>Status: <?php echo $user['paid'] ? 'Paid' : 'Pending'; ?></p>
    </div>

    <div class="card">
        <h2>Your Listings</h2>

        <?php if (count($listings) > 0): ?>
            <div class="grid">
                <?php foreach ($listings as $listing): ?>
                    <div class="property">
                        <img src="uploads/<?php echo htmlspecialchars($listing['image']); ?>" alt="<?php echo htmlspecialchars($listing['property_name']); ?>">
                        <h3><?php echo htmlspecialchars($listing['property_name']); ?></h3>
                        <p><b>Location:</b> <?php echo htmlspecialchars($listing['location']); ?></p>
                        <p><?php echo htmlspecialchars($listing['description']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php else: ?>
            <p>You haven’t added any listings yet.</p>
            <a class="button" href="select-package.php">Add New Listing</a>
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
