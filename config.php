<?php
$host = "localhost"; // your Laragon MySQL host
$db   = "visitsasa";   // your Laragon DB name
$user = "root";    // default Laragon MySQL user
$pass = "";        // default Laragon MySQL password
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
?>
