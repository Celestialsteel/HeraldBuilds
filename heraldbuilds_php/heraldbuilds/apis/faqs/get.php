<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Database connection - replace with your actual database credentials
$host = 'localhost';
$dbname = 'heraldbuilds';
$username = 'root';
$password = 'pilos3245@2005';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SELECT * FROM faqs ORDER BY id DESC");
    $faqs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($faqs);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>