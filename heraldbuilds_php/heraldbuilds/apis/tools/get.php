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
    
    $stmt = $pdo->query("SELECT * FROM tools ORDER BY id DESC");
    $tools = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Decode JSON fields
    foreach ($tools as &$tool) {
        if ($tool['tips']) {
            $tool['tips'] = json_decode($tool['tips'], true);
        }
    }
    
    echo json_encode($tools);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>