<?php
$host = "localhost";
$db   = "visitsasa";   // your database name
$user = "root";        // default Laragon MySQL user
$pass = "";            // default Laragon MySQL password
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    // echo "Connected successfully"; // optional test
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
