<?php

include 'config.php';
include 'header.php';

// Get the search term from the query string
$search = isset($_GET['location']) ? trim($_GET['location']) : '';

// Fetch Standard destinations
$standard = $pdo->query("SELECT property_name, description, location, image, 'Standard' AS package FROM standard_forms")->fetchAll(PDO::FETCH_ASSOC);

// Fetch Premium destinations
$premium = $pdo->query("SELECT property_name, description, location, image, 'Premium' AS package FROM premium_forms")->fetchAll(PDO::FETCH_ASSOC);

// Fetch Deluxe destinations
$deluxe = $pdo->query("SELECT property_name, description, location, image, 'Deluxe' AS package FROM deluxe_forms")->fetchAll(PDO::FETCH_ASSOC);

// Combine all destinations into one array
$destinations = array_merge($standard, $premium, $deluxe);

// Filter results if a location was searched
if (!empty($search)) {
    $destinations = array_filter($destinations, function ($d) use ($search) {
        return stripos($d['location'], $search) !== false ||
               stripos($d['property_name'], $search) !== false ||
               stripos($d['description'], $search) !== false;
    });
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>All Destinations - Visitsasa</title>
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
h1 { text-align:center; margin-bottom:20px; margin-top:20px; }
#searchInput { width:100%; max-width:400px; margin: 0 auto 20px auto; display:block; padding:10px; border-radius:8px; border:1px solid #ccc; }
.grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:20px; }
.card { background:white; border-radius:15px; padding:15px; box-shadow:0 5px 15px rgba(0,0,0,0.1); text-align:center; }
.card img { width:100%; height:180px; object-fit:cover; border-radius:10px; margin-bottom:10px; }
.card h3 { margin:10px 0 5px 0; }
.card p { margin:5px 0; color:#555; }
</style>
</head>
<body>

<h1>
  <?php echo !empty($search) ? "Search results for: " . htmlspecialchars($search) : "All Destinations"; ?>
</h1>

<input type="text" id="searchInput" placeholder="Search by location..." value="<?php echo htmlspecialchars($search); ?>">

<div class="grid" id="destinationsGrid">
<?php if (count($destinations) > 0): ?>
  <?php foreach($destinations as $d): ?>
    <div class="card" data-location="<?php echo strtolower($d['location']); ?>">
      <img src="uploads/<?php echo htmlspecialchars($d['image']); ?>" alt="<?php echo htmlspecialchars($d['property_name']); ?>">
      <h3><?php echo htmlspecialchars($d['property_name']); ?></h3>
      <p><b>Location:</b> <?php echo htmlspecialchars($d['location']); ?></p>
      <p><?php echo htmlspecialchars($d['description']); ?></p>
      <p><b>Package:</b> <?php echo $d['package']; ?></p>
    </div>
  <?php endforeach; ?>
<?php else: ?>
  <p style="text-align:center;">No destinations found.</p>
<?php endif; ?>
</div>

<script>
// Keep the instant JS filtering too
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', function() {
  const value = this.value.toLowerCase();
  cards.forEach(card => {
    const location = card.getAttribute('data-location');
    card.style.display = location.includes(value) ? 'block' : 'none';
  });
});
</script>

</body>
</html>
