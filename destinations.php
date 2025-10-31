<?php
include 'config.php';
// replace the existing fetch block with this:
$searchTerm = trim($_GET['location'] ?? '');

try {
    if ($searchTerm === '') {
        $stmt = $pdo->query("SELECT * FROM listings ORDER BY created_at DESC");
        $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $like = '%' . $searchTerm . '%';
        $stmt = $pdo->prepare("SELECT * FROM listings 
                               WHERE property_name LIKE ? OR location LIKE ? OR description LIKE ?
                               ORDER BY created_at DESC");
        $stmt->execute([$like, $like, $like]);
        $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
} catch (PDOException $e) {
    die("Error fetching listings: " . $e->getMessage());
}
include 'header.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Destinations - Visit Sasa</title>
  <link rel="icon" type="image/png" href="images/logo.png">
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

    .container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .card {
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .card-content {
      padding: 15px;
    }
    .card-content h3 {
      margin: 0 0 10px;
      color: #0F445F;
    }
    .card-content p {
      font-size: 14px;
      margin-bottom: 8px;
    }

  </style>
</head>
<body>

  <div class="container">
    <?php if (!empty($listings)): ?>
      <?php foreach ($listings as $row): ?>
        <div class="card">
          <?php 
      
         // Decode JSON or fallback
$imagesData = $row['images'] ?? '';
$imageArray = json_decode($imagesData, true);

// Handle if JSON decode failed (old data format)
if (!is_array($imageArray)) {
  $imageArray = explode(',', $imagesData);
}

$firstImage = trim($imageArray[0] ?? '');
$imagePath = !empty($firstImage) ? 'uploads/' . htmlspecialchars($firstImage) : 'default.jpg';
          ?>
          <img src="<?= $imagePath ?>" alt="Destination Image">

          <div class="card-content">
            
            <h3><?= htmlspecialchars($row['property_name']); ?></h3>
            <p><strong>Location:</strong> <?= htmlspecialchars($row['location']); ?></p>
            <?php if (!empty($row['description'])): ?>
              <p><?= nl2br(htmlspecialchars(substr($row['description'], 0, 80))); ?>...</p>
            <?php endif; ?>
          </div>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <p style="text-align:center;">No listings available yet.</p>
    <?php endif; ?>
  </div>
</body>
<?php include 'footer.php'; ?>
</html>
