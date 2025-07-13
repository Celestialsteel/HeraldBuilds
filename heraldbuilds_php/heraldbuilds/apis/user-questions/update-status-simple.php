<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $id = $input['id'] ?? '';
    $status = $input['status'] ?? '';
    
    // Validation
    if (empty($id) || empty($status)) {
        echo json_encode(['success' => false, 'message' => 'ID and status are required']);
        exit;
    }
    
    if (!in_array($status, ['pending', 'answered', 'resolved'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid status']);
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
        
        // Simple update without updated_at column
        $stmt = $pdo->prepare("UPDATE user_questions SET status = ? WHERE id = ?");
        $result = $stmt->execute([$status, $id]);
        
        if ($result && $stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Status updated successfully', 'affected_rows' => $stmt->rowCount()]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No rows were updated. Question ID may not exist.', 'id' => $id]);
        }
        
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>