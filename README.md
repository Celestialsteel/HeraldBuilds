# Herald Builds - Complete PC Building Platform

![Herald Builds](HeraldBuilds/heraldbuilds/public/main-logo.png)

## 🎯 Project Overview

Herald Builds is a comprehensive web platform designed to guide users through every step of building the perfect PC. This full-stack application consists of a React-based frontend for users and a complete admin dashboard for content management, backed by PHP APIs and MySQL database.

### 🌟 What Makes Herald Builds Special

- **Complete PC Building Ecosystem** - From component selection to troubleshooting
- **Multi-Level Guidance** - Beginner to expert-level tutorials
- **Dynamic Content Management** - Real-time updates through admin dashboard
- **Responsive Design** - Works seamlessly on all devices
- **Professional Grade** - Built with modern web technologies

## 📁 Project Structure

```
Herald/
├── HeraldBuilds/                    # Main user-facing application
│   └── heraldbuilds/
│       ├── src/
│       │   ├── components/
│       │   │   └── pages/
│       │   ├── hooks/
│       │   └── App.js
│       ├── public/
│       ├── package.json
│       └── README.md
├── HeraldBuilds-admin/              # Admin dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
├── heraldbuilds_php/               # PHP backend services
│   ├── apis/
│   │   ├── faqs/
│   │   ├── guides/
│   │   ├── tools/
│   │   └── user-questions/
│   └── database/
└── README.md                       # This file
```

## 🚀 Features Overview

### 🎮 Main Application (HeraldBuilds)
- **Interactive PC Building Guides** - Step-by-step tutorials with difficulty levels
- **Comprehensive FAQ System** - Dynamic Q&A with real-time updates
- **Tools & Components Database** - Curated recommendations and specifications
- **Troubleshooting System** - Diagnose and solve common PC issues
- **Responsive Design** - Mobile-first approach for all devices

### 🛠️ Admin Dashboard (HeraldBuilds-admin)
- **Content Management System** - Full CRUD operations for all content
- **User Questions Management** - Handle user submissions and convert to FAQs
- **Real-time Updates** - Instant synchronization with main application
- **Secure Authentication** - Protected admin areas with session management
- **Analytics Dashboard** - Monitor content usage and user engagement

### 🔧 Backend Services
- **RESTful APIs** - Clean, documented API endpoints
- **MySQL Database** - Robust data storage and management
- **Security Features** - Input validation, SQL injection prevention
- **Error Handling** - Comprehensive error management and logging

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18.3.1** - Modern React with hooks and functional components
- **React Router DOM 6.30.1** - Client-side routing and navigation
- **FontAwesome Icons** - Professional iconography
- **Axios 1.3.0** - HTTP client for API communication
- **CSS3** - Custom styling with modern features

### Backend Technologies
- **PHP 8.0+** - Server-side scripting and API development
- **MySQL 8.0+** - Relational database management
- **Apache/Nginx** - Web server configuration
- **XAMPP** - Local development environment

### Development Tools
- **Create React App** - Development environment and build tools
- **Git** - Version control and collaboration
- **VS Code** - Recommended IDE with extensions
- **Postman** - API testing and documentation

## 📋 Prerequisites

Before installing Herald Builds, ensure you have the following installed:

### Required Software
- **Node.js** (version 14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **XAMPP** (for local development) - [Download](https://www.apachefriends.org/)
- **Git** - [Download](https://git-scm.com/)

### Recommended Tools
- **VS Code** - [Download](https://code.visualstudio.com/)
- **Postman** - [Download](https://www.postman.com/)
- **MySQL Workbench** - [Download](https://www.mysql.com/products/workbench/)

## 🚀 Complete Installation Guide

### Step 1: Clone the Repository

```bash
# Clone the main repository
git clone <repository-url>
cd Herald

# Verify the project structure
ls -la
```

### Step 2: Database Setup

1. **Start XAMPP Services**
   ```bash
   # Start Apache and MySQL services
   # Open XAMPP Control Panel and start Apache + MySQL
   ```

2. **Create Database**
   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Create a new database named `heraldbuilds`
   - Import the database structure (if available) or create tables manually

3. **Database Configuration**
   ```sql
   -- Example table structures
   CREATE TABLE faqs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       question TEXT NOT NULL,
       answer TEXT NOT NULL,
       category VARCHAR(100),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE guides (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       summary TEXT,
       content TEXT,
       level ENUM('beginner', 'intermediate', 'advanced', 'expert'),
       tags TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE user_questions (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) NOT NULL,
       category VARCHAR(100),
       question TEXT NOT NULL,
       status ENUM('pending', 'answered', 'resolved') DEFAULT 'pending',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Step 3: Backend API Setup

1. **Copy API Files to XAMPP**
   ```bash
   # Copy the APIs to your XAMPP htdocs directory
   cp -r heraldbuilds_php/apis/ /path/to/xampp/htdocs/heraldbuilds/
   ```

2. **Configure Database Connection**
   Create `config.php` in your APIs directory:
   ```php
   <?php
   $servername = "localhost";
   $username = "root";
   $password = "";
   $dbname = "heraldbuilds";

   try {
       $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
       $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   } catch(PDOException $e) {
       die("Connection failed: " . $e->getMessage());
   }
   ?>
   ```

3. **Test API Endpoints**
   ```bash
   # Test if APIs are working
   curl http://localhost/heraldbuilds/apis/faqs/get.php
   ```

### Step 4: Main Application Setup

1. **Navigate to Main App Directory**
   ```bash
   cd HeraldBuilds/heraldbuilds
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `.env` file:
   ```env
   REACT_APP_API_BASE_URL=http://localhost/heraldbuilds/apis
   REACT_APP_VERSION=1.0.0
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

5. **Verify Installation**
   - Open http://localhost:3000
   - Check that all pages load correctly
   - Test navigation and functionality

### Step 5: Admin Dashboard Setup

1. **Navigate to Admin Directory**
   ```bash
   cd ../HeraldBuilds-admin
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `.env` file:
   ```env
   REACT_APP_API_BASE_URL=http://localhost/heraldbuilds/apis
   REACT_APP_ADMIN_USERNAME=admin
   ```

4. **Start Admin Dashboard**
   ```bash
   npm start
   ```
   Note: This will start on port 3001 since 3000 is already in use

5. **Access Admin Dashboard**
   - Open http://localhost:3001
   - Login with default credentials:
     - Username: `admin`
     - Password: `password123`

### Step 6: Final Configuration

1. **Update API Endpoints**
   Ensure all components are pointing to the correct API URLs

2. **Test Full Integration**
   - Create content in admin dashboard
   - Verify it appears in main application
   - Test user question submission
   - Check FAQ management

3. **Configure CORS (if needed)**
   Add CORS headers to your PHP APIs:
   ```php
   header("Access-Control-Allow-Origin: http://localhost:3000");
   header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
   header("Access-Control-Allow-Headers: Content-Type");
   ```

## 🔧 Development Workflow

### Running the Complete System

1. **Start Backend Services**
   ```bash
   # Start XAMPP (Apache + MySQL)
   sudo /opt/lampp/lampp start  # Linux
   # Or use XAMPP Control Panel on Windows
   ```

2. **Start Main Application**
   ```bash
   cd HeraldBuilds/heraldbuilds
   npm start  # Runs on http://localhost:3000
   ```

3. **Start Admin Dashboard**
   ```bash
   cd HeraldBuilds-admin
   npm start  # Runs on http://localhost:3001
   ```

### Available Scripts

#### Main Application
```bash
npm start          # Start development server
npm test           # Run test suite
npm run build      # Create production build
npm run eject      # Eject from Create React App
```

#### Admin Dashboard
```bash
npm start          # Start development server
npm test           # Run test suite
npm run build      # Create production build
```

## 🌐 Deployment Guide

### Production Deployment

1. **Build Applications**
   ```bash
   # Build main application
   cd HeraldBuilds/heraldbuilds
   npm run build

   # Build admin dashboard
   cd ../HeraldBuilds-admin
   npm run build
   ```

2. **Deploy to Web Server**
   - Upload `build` folders to your web server
   - Configure web server to serve React applications
   - Set up PHP environment with MySQL

3. **Configure Production APIs**
   - Update database credentials
   - Set production API URLs
   - Enable HTTPS and security headers

### Recommended Hosting Platforms

#### Frontend Hosting
- **Netlify** - Automatic deployments from Git
- **Vercel** - Optimized for React applications
- **AWS S3 + CloudFront** - Scalable cloud hosting

#### Backend Hosting
- **DigitalOcean Droplet** - VPS with full control
- **AWS EC2** - Scalable cloud computing
- **Shared Hosting** - Budget-friendly option with cPanel

## 🧪 Testing

### Running Tests

```bash
# Test main application
cd HeraldBuilds/heraldbuilds
npm test

# Test admin dashboard
cd ../HeraldBuilds-admin
npm test
```

### Manual Testing Checklist

#### Main Application
- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Search functionality works
- [ ] FAQ system displays content
- [ ] Guides are properly categorized
- [ ] Responsive design on mobile

#### Admin Dashboard
- [ ] Login system works
- [ ] All CRUD operations function
- [ ] Content updates reflect in main app
- [ ] User questions are manageable
- [ ] Dashboard is responsive

#### Backend APIs
- [ ] All endpoints return correct data
- [ ] Error handling works properly
- [ ] Database connections are stable
- [ ] CORS is configured correctly

## 🔒 Security Considerations

### Frontend Security
- Input validation on all forms
- XSS prevention in content rendering
- Secure API communication
- Environment variable protection

### Backend Security
- SQL injection prevention
- Input sanitization
- Authentication and authorization
- Error message sanitization
- HTTPS enforcement in production

### Database Security
- Strong passwords
- Limited user privileges
- Regular backups
- Connection encryption

## 📊 Performance Optimization

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization
- Bundle size monitoring
- Caching strategies

### Backend Optimization
- Database query optimization
- API response caching
- Connection pooling
- Server-side compression

## 🤝 Contributing

### Development Guidelines

1. **Fork the Repository**
2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make Changes**
   - Follow coding standards
   - Add tests for new features
   - Update documentation
4. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Create Pull Request**

### Code Standards
- **React Components** - Functional components with hooks
- **CSS** - BEM methodology for class naming
- **JavaScript** - ES6+ features and modern syntax
- **PHP** - PSR-12 coding standards
- **Database** - Normalized schema design

## 📞 Support & Troubleshooting

### Common Issues

#### "Cannot connect to database"
- Verify XAMPP is running
- Check database credentials
- Ensure database exists

#### "API endpoints not found"
- Verify API files are in htdocs
- Check Apache configuration
- Test API URLs directly

#### "React app won't start"
- Clear node_modules and reinstall
- Check Node.js version compatibility
- Verify package.json integrity

### Getting Help

1. **Check Documentation** - Review README files
2. **Search Issues** - Look for existing solutions
3. **Create Issue** - Report bugs with detailed information
4. **Contact Support** - Reach out for urgent matters

### Contact Information
- **Email**: supportcentre@heraldbuilds.com
- **Phone**: +254 748913742
- **Address**: 224, Madaraka, Nairobi, Kenya
- **Support Hours**: Monday–Friday, 9AM–6PM EAT

## 📈 Roadmap & Future Features

### Version 2.0 Planned Features
- **User Accounts** - Personal build tracking and favorites
- **Build Calculator** - Component compatibility checker
- **Community Forum** - User discussions and Q&A
- **Video Integration** - Embedded tutorial videos
- **Mobile App** - Native iOS and Android applications
- **AI Assistant** - Intelligent troubleshooting and recommendations

### Technical Improvements
- **GraphQL API** - More efficient data fetching
- **TypeScript Migration** - Better type safety
- **Progressive Web App** - Offline functionality
- **Microservices Architecture** - Scalable backend design
- **Real-time Features** - Live chat and notifications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

### Technologies Used
- **React Team** - For the amazing React framework
- **Create React App** - For the development environment
- **FontAwesome** - For the beautiful icons
- **PHP Community** - For the robust backend language
- **MySQL** - For reliable data storage

### Special Thanks
- **Open Source Community** - For inspiration and resources
- **Beta Testers** - For valuable feedback and bug reports
- **Contributors** - For code contributions and improvements

---

**Herald Builds - Empowering PC Builders Worldwide**

*Built with ❤️ for the PC building community*

## 📋 Quick Start Summary

For experienced developers who want to get started quickly:

```bash
# 1. Clone and setup
git clone <repository-url>
cd Herald

# 2. Start XAMPP (Apache + MySQL)
# Create database 'heraldbuilds'

# 3. Setup main app
cd HeraldBuilds/heraldbuilds
npm install
npm start  # http://localhost:3000

# 4. Setup admin (new terminal)
cd HeraldBuilds-admin
npm install
npm start  # http://localhost:3001

# 5. Copy APIs from heraldbuilds_php/ to XAMPP htdocs/heraldbuilds/apis/
# 6. Test everything works!
```

**Default Admin Login**: admin / password123