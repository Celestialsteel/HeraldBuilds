<?php
// Database configuration
// IMPORTANT: Update these values for your environment
// For production, use environment variables instead of hardcoded values

return [
    'host' => 'localhost',
    'dbname' => 'heraldbuilds',
    'username' => 'root',
    'password' => '', // Set your MySQL password here
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
];
?>