<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $category = $input['category'] ?? '';
    $question = $input['question'] ?? '';
    
    // Validation
    if (empty($name) || empty($email) || empty($question)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
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
        
        $stmt = $pdo->prepare("INSERT INTO user_questions (name, email, category, question, status) VALUES (?, ?, ?, ?, 'pending')");
        $stmt->execute([$name, $email, $category, $question]);
        
        echo json_encode(['success' => true, 'message' => 'Question submitted successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>