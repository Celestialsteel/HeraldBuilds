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
    
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';
    
    // Validation
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username and password are required']);
        exit;
    }
    
    // Database connection
    $host = 'localhost';
    $dbname = 'heraldbuilds';
    $db_username = 'root';
    $db_password = 'pilos3245@2005';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $db_username, $db_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Check if admin exists in database
        $stmt = $pdo->prepare("SELECT adminID, adminName, password FROM admins WHERE adminName = ?");
        $stmt->execute([$username]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($admin) {
    
            if ($admin['password'] === $password) {
                echo json_encode([
                    'success' => true, 
                    'message' => 'Login successful',
                    'admin' => [
                        'id' => $admin['adminID'],
                        'name' => $admin['adminName']
                    ]
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid password']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Admin user not found']);
        }
        
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>