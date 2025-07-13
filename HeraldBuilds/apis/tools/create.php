<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $title = $input['title'] ?? '';
    $description = $input['description'] ?? '';
    $tips = $input['tips'] ?? [];
    $image = $input['image'] ?? '';
    $category = $input['category'] ?? 'tools';
    
    // Validation
    if (empty($title) || empty($description)) {
        echo json_encode(['success' => false, 'message' => 'Title and description are required']);
        exit;
    }
    
    // Validate category
    if (!in_array($category, ['tools', 'components', 'hardware'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid category']);
        exit;
    }
    
    // Database connection
    $host = 'localhost';
    $dbname = 'heraldbuilds';
    $username = 'root';
    $password = 'pilos3245@2005';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("INSERT INTO tools (title, description, tips, image, category) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$title, $description, json_encode($tips), $image, $category]);
        
        echo json_encode(['success' => true, 'message' => 'Tool created successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>