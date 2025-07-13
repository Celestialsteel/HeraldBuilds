<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $id = $input['id'] ?? '';
    $question = $input['question'] ?? '';
    $answer = $input['answer'] ?? '';
    $category = $input['category'] ?? '';
    
    // Validation
    if (empty($id) || empty($question) || empty($answer)) {
        echo json_encode(['success' => false, 'message' => 'ID, question, and answer are required']);
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
        
        $stmt = $pdo->prepare("UPDATE faqs SET question = ?, answer = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([$question, $answer, $category, $id]);
        
        echo json_encode(['success' => true, 'message' => 'FAQ updated successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>