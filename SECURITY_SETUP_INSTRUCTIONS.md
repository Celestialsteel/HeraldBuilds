# Security Setup Instructions

## ⚠️ CRITICAL SECURITY ISSUES FOUND

Your project has **64 files** with hardcoded database credentials exposed. This is a major security vulnerability.

## Issues Identified:

1. **Database password `pilos3245@2005` is hardcoded in 64+ files**
2. **Admin password stored in plain text**
3. **No password hashing implemented**
4. **Database credentials exposed in public repository**

## Immediate Actions Required:

### 1. Update Database Configuration

**Edit this file:** `heraldbuilds_php/heraldbuilds/config/database.php`

```php
<?php
return [
    'host' => 'localhost',
    'dbname' => 'heraldbuilds',
    'username' => 'root',
    'password' => 'YOUR_ACTUAL_PASSWORD_HERE', // Replace with your MySQL password
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]
];
?>
```

### 2. Files That Need Manual Updates

The following files still contain your hardcoded password and need to be updated to use the secure config:

**Main API Files:**
- `heraldbuilds_php/heraldbuilds/apis/faqs/get.php`
- `heraldbuilds_php/heraldbuilds/apis/faqs/create.php`
- `heraldbuilds_php/heraldbuilds/apis/faqs/update.php`
- `heraldbuilds_php/heraldbuilds/apis/faqs/delete.php`
- `heraldbuilds_php/heraldbuilds/apis/guides/get.php`
- `heraldbuilds_php/heraldbuilds/apis/guides/create.php`
- `heraldbuilds_php/heraldbuilds/apis/guides/update.php`
- `heraldbuilds_php/heraldbuilds/apis/guides/delete.php`
- `heraldbuilds_php/heraldbuilds/apis/tools/get.php`
- `heraldbuilds_php/heraldbuilds/apis/tools/create.php`
- `heraldbuilds_php/heraldbuilds/apis/tools/update.php`
- `heraldbuilds_php/heraldbuilds/apis/tools/delete.php`
- `heraldbuilds_php/heraldbuilds/apis/user-questions/get.php`
- `heraldbuilds_php/heraldbuilds/apis/user-questions/submit.php`
- `heraldbuilds_php/heraldbuilds/apis/user-questions/update-status-simple.php`
- `heraldbuilds_php/heraldbuilds/apis/user-questions/delete.php`

**Replace the database connection code in each file:**

**FROM:**
```php
$host = 'localhost';
$dbname = 'heraldbuilds';
$username = 'root';
$password = 'pilos3245@2005';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
```

**TO:**
```php
$config = require_once '../../../config/database.php';
$dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset={$config['charset']}";
$pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);
```

### 3. Updated SQL File

The SQL file has been cleaned:
- Admin username changed from "Griffin" to "admin"
- Admin password changed from "hello123" to "admin123"
- Your personal database password removed

**New admin credentials:**
- Username: `admin`
- Password: `admin123`

### 4. Add to .gitignore

Add this to your `.gitignore` file:
```
# Database configuration
**/config/database.php
**/*config*.php
*.env
```

### 5. Potential Setup Issues

**Issues that may cause setup to fail:**

1. **Path Issues:** The config file path `../../config/database.php` assumes the API files are in the correct directory structure
2. **Missing Config:** If the config file doesn't exist, all APIs will fail
3. **Wrong Password:** If you don't update the password in the config file, database connections will fail
4. **File Permissions:** The config file needs to be readable by the web server

**Testing the Setup:**

1. Update the password in `config/database.php`
2. Test the admin login: `http://localhost/heraldbuilds/apis/admin/login.php`
3. Test an API endpoint: `http://localhost/heraldbuilds/apis/faqs/get.php`

### 6. Recommended Next Steps

1. **Implement password hashing** for admin passwords
2. **Use environment variables** instead of config files
3. **Update all 64 files** to use the secure configuration
4. **Remove hardcoded credentials** from all files
5. **Add rate limiting** to login endpoints
6. **Implement proper error handling**

## Files Already Updated:

✅ `heraldbuilds_php/heraldbuilds.sql` - Credentials removed
✅ `heraldbuilds_php/heraldbuilds/apis/admin/login.php` - Uses secure config
✅ `heraldbuilds_php/heraldbuilds/config/database.php` - Created secure config

## Files Still Needing Updates: 60+ files

**Priority:** Update the main API files first, then the test/example files.