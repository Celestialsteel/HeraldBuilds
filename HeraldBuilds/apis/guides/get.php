<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Database connection
$host = 'localhost';
$dbname = 'heraldbuilds';
$username = 'root';
$password = 'pilos3245@2005';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $pdo->query("SELECT * FROM guides ORDER BY id DESC");
    $guides = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Decode JSON fields
    foreach ($guides as &$guide) {
        if ($guide['tags']) {
            $guide['tags'] = json_decode($guide['tags'], true);
        }
        if ($guide['steps']) {
            $guide['steps'] = json_decode($guide['steps'], true);
        }
    }
    
    echo json_encode($guides);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>