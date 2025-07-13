<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $id = $input['id'] ?? '';
    $title = $input['title'] ?? '';
    $summary = $input['summary'] ?? '';
    $level = $input['level'] ?? 'beginner';
    $tags = $input['tags'] ?? [];
    $content = $input['content'] ?? '';
    $steps = $input['steps'] ?? [];
    
    // Validation
    if (empty($id) || empty($title) || empty($summary)) {
        echo json_encode(['success' => false, 'message' => 'ID, title, and summary are required']);
        exit;
    }
    
    // Validate level
    if (!in_array($level, ['beginner', 'intermediate', 'advanced'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid level']);
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
        
        $stmt = $pdo->prepare("UPDATE guides SET title = ?, summary = ?, level = ?, tags = ?, content = ?, steps = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([$title, $summary, $level, json_encode($tags), $content, json_encode($steps), $id]);
        
        echo json_encode(['success' => true, 'message' => 'Guide updated successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>