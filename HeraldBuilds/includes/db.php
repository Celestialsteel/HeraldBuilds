<?php
$host = 'localhost';
$dbname = 'heraldbuilds';
$username = 'root';
$password = 'pilos3245@2005'; // or 'your_password' if set

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
?>
<?php