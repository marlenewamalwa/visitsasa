<?php
session_start();
include 'config.php';

if (!isset($_SESSION['user']) || $_SESSION['user']['is_admin'] != 1) {
    header("Location: login.php");
    exit();
}

// Fetch counts
$totalUsers = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$totalListings = $pdo->query("SELECT COUNT(*) FROM listings")->fetchColumn();

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Dashboard</title>
<style>
     * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f7fa;
}

.dashboard {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 260px;
    background-color: #0F445F;
    color: white;
    padding: 30px 0;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
}

.sidebar h2 {
    padding: 0 25px 30px;
    font-size: 24px;
    border-bottom: 2px solid #11989B;
    margin-bottom: 20px;
}

.sidebar a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 15px 25px;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
}

.sidebar a:hover {
    background-color: #11989B;
    border-left-color: white;
    padding-left: 30px;
}

.main {
    flex: 1;
    margin-left: 260px;
    padding: 40px;
}

.main h1 {
    color: #0F445F;
    margin-bottom: 40px;
    font-size: 32px;
}

.card {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(15, 68, 95, 0.1);
    margin-bottom: 20px;
    font-size: 20px;
    color: #333;
    border-left: 5px solid #11989B;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(17, 152, 155, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }
    
    .main {
        margin-left: 0;
        padding: 20px;
    }
    
    .dashboard {
        flex-direction: column;
    }
}  
</style>
</head>
<body>
<div class="dashboard">
    <aside class="sidebar">
        <h2>Visitsasa Admin</h2>
        <a href="admin.php">Dashboard</a>
        <a href="users.php">Users</a>
        <a href="listings.php">Listings</a>
    
        <a href="logout.php">Logout</a>
    </aside>
    <div class="main">
        <h1>Welcome, Admin!</h1>
        <div class="card">Total Users: <?= $totalUsers ?></div>
        <div class="card">Total Listings: <?= $totalListings ?></div>
       
    </div>
</div>
</body>
</html>
