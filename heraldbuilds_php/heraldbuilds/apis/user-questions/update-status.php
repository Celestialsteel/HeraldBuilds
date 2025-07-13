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
    
    // Debug logging
    error_log('Update Status API called with input: ' . print_r($input, true));
    
    $id = $input['id'] ?? '';
    $status = $input['status'] ?? '';
    
    // Validation
    if (empty($id) || empty($status)) {
        error_log('Validation failed - ID: ' . $id . ', Status: ' . $status);
        echo json_encode(['success' => false, 'message' => 'ID and status are required', 'debug' => ['id' => $id, 'status' => $status, 'input' => $input]]);
        exit;
    }
    
    if (!in_array($status, ['pending', 'answered', 'resolved'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid status']);
        exit;
    }
    
    // Database connection using config file
    $config = require_once(__DIR__ . '/../../database-config.php');
    
    try {
        // Try connecting to database
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
        $pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);
        
        // Check if table exists
        $stmt = $pdo->query("SHOW TABLES LIKE 'user_questions'");
        if ($stmt->rowCount() == 0) {
            echo json_encode(['success' => false, 'error' => 'user_questions table does not exist. Please run setup.sql']);
            exit;
        }
        
        // Update the status (check if updated_at column exists first)
        $stmt = $pdo->query("SHOW COLUMNS FROM user_questions LIKE 'updated_at'");
        $hasUpdatedAt = $stmt->rowCount() > 0;
        
        if ($hasUpdatedAt) {
            $stmt = $pdo->prepare("UPDATE user_questions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        } else {
            $stmt = $pdo->prepare("UPDATE user_questions SET status = ? WHERE id = ?");
        }
        
        $result = $stmt->execute([$status, $id]);
        
        if ($result && $stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Status updated successfully', 'affected_rows' => $stmt->rowCount()]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No rows were updated. Question ID may not exist.', 'id' => $id]);
        }
        
    } catch (PDOException $e) {
        // More detailed error handling
        $errorCode = $e->getCode();
        $errorMessage = $e->getMessage();
        
        if ($errorCode == 1045) {
            echo json_encode(['success' => false, 'error' => 'Database access denied. Please check XAMPP MySQL credentials.']);
        } elseif ($errorCode == 1049) {
            echo json_encode(['success' => false, 'error' => 'Database "heraldbuilds" does not exist. Please create it first.']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Database error: ' . $errorMessage, 'code' => $errorCode]);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>