<?php
require 'config.php';
session_start(); // ensure session is started before using $_SESSION

if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
    session_unset();
    session_destroy();
    header('Location: login.php');
    exit;
}

include 'header.php'; // ✅ safe to include after checks

$userId = $_SESSION['user']['id'];
$stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE id = ? LIMIT 1");
$stmt->execute([$userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

$userName  = $user['name'] ?? $_SESSION['user']['name'];
$userEmail = $user['email'] ?? $_SESSION['user']['email'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dashboard - Visitsasa</title>
<style>
  :root{--accent:#0F445F}
      * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #ffff;
            color: #0F445F;
        }

  .container{max-width:1000px;margin:0 auto;background:#fff;border-radius:12px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,0.08)}
  .header{display:flex;align-items:center;justify-content:space-between}
  .profile{display:flex;align-items:center;gap:14px}
  .avatar{width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--accent)}
  h1{margin:0;font-size:20px}
  .muted{color:#6b7a82}
  .actions{display:flex;gap:10px}
  .btn{background:var(--accent);color:#fff;padding:10px 14px;border-radius:8px;border:0;text-decoration:none;font-weight:600;cursor:pointer}
  .btn.secondary{background:#fff;color:var(--accent);border:1px solid #d8e6e8}
  .grid{display:grid;grid-template-columns:1fr 320px;gap:20px;margin-top:20px}
  .card{background:#fbffff;border-radius:10px;padding:16px;box-shadow:0 6px 18px rgba(17,152,155,0.04)}
  .small{font-size:13px;color:#58707a}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="profile">
      <div>
        <h1>Welcome, <?php echo htmlspecialchars($userName); ?></h1>
        <div class="muted small"><?php echo htmlspecialchars($userEmail); ?></div>
      </div>
    </div>

    <div class="actions">
      <a href="profile.php" class="btn secondary">Profile</a>
      <form method="post" style="margin:0">
        <button type="submit" name="logout" class="btn">Log out</button>
      </form>
    </div>
  </div>

  <div class="grid">
    <div>
        <?php
// fetch listings for this user
$listStmt = $pdo->prepare("SELECT * FROM listings WHERE user_id = ? ORDER BY created_at DESC");
$listStmt->execute([$userId]);
$listings = $listStmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="card">
  <h3>My Listings</h3>
  <?php if (empty($listings)): ?>
    <p class="small">You haven’t added any listings yet.</p>
  <?php else: ?>
    <ul style="list-style:none;padding:0;margin:0">
      <?php foreach ($listings as $l): 
        $imgs = json_decode($l['images'], true);
        $thumb = $imgs[0] ?? 'images/no_image.png';
      ?>
      <li style="display:flex;align-items:center;gap:12px;margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:10px">
        <img src="uploads/<?php echo htmlspecialchars($thumb); ?>" alt="" style="width:60px;height:60px;object-fit:cover;border-radius:6px">
        <div style="flex:1">
          <strong><?php echo htmlspecialchars($l['property_name']); ?></strong><br>
          <span class="small">
            <?php echo htmlspecialchars($l['location']); ?> — <?php echo ucfirst($l['package']); ?>
          </span>
        </div>
<div style="display:flex;gap:6px">
    <a href="edit_listing.php?id=<?php echo $l['id']; ?>" class="btn secondary" style="padding:6px 10px;font-size:13px">Edit</a>
    <form method="POST" action="delete_listing.php" onsubmit="return confirm('Delete this listing?')" style="margin:0">
        <input type="hidden" name="id" value="<?php echo $l['id']; ?>">
        <button type="submit" class="btn" style="background:#d9534f;padding:6px 10px;font-size:13px">Delete</button>
    </form>
</div>

      </li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>

  <p style="margin-top:14px">
    <a href="select_package.php" class="btn">Add New Listing</a>
  </p>
</div>
    </div>

    <aside>
      <div class="card">
        <h4>Account</h4>
        <p class="small"><strong>Name:</strong> <?php echo htmlspecialchars($userName); ?></p>
        <p class="small"><strong>Email:</strong> <?php echo htmlspecialchars($userEmail); ?></p>
        <p style="margin-top:12px">
          <a href="edit_profile.php" class="btn secondary" style="display:inline-block">Edit profile</a>
          
        </p>
      </div>
    </aside>
  </div>
</div>
</body>
</html>