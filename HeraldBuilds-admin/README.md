# Herald Builds Admin Dashboard

![Herald Builds Admin](src/assets/Heraldbuilds-logo.png)

## 🎯 Project Overview

The Herald Builds Admin Dashboard is a comprehensive content management system designed to manage all aspects of the Herald Builds platform. This React-based admin interface provides full CRUD operations for FAQs, guides, tools, and user questions, enabling administrators to maintain and update content efficiently.

## ✨ Key Features

### 🔐 Authentication & Security
- **Secure Admin Login** - Protected authentication system
- **Route Protection** - Restricted access to admin areas
- **Session Management** - Persistent login state
- **Logout Functionality** - Secure session termination

### 📋 Content Management
- **FAQ Management** - Create, edit, delete, and categorize FAQs
- **Guides Management** - Manage PC building guides with difficulty levels
- **Tools Management** - Maintain tools and components database
- **User Questions** - Handle user-submitted questions and convert to FAQs

### 🎨 User Interface
- **Responsive Design** - Works on all device sizes
- **Tabbed Navigation** - Easy switching between management sections
- **Modal Interfaces** - Streamlined editing experience
- **Real-time Updates** - Instant content synchronization

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router DOM 6.8.0** - Client-side routing and navigation
- **Axios 1.3.0** - HTTP client for API communication
- **CSS3** - Custom styling with modern features
- **JavaScript ES6+** - Modern JavaScript features

### Development Tools
- **Create React App** - Development environment and build tools
- **React Scripts 5.0.1** - Build and development scripts
- **ESLint** - Code quality and consistency
- **Proxy Configuration** - Backend API integration

## 📁 Project Structure

```
HeraldBuilds-admin/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── Heraldbuilds-logo.png
│   ├── components/
│   │   ├── AdminDashboard.jsx      # Main dashboard component
│   │   ├── FAQManager.jsx          # FAQ management interface
│   │   ├── GuidesManager.jsx       # Guides management interface
│   │   ├── ToolsManager.jsx        # Tools management interface
│   │   ├── UserQuestionsManager.jsx # User questions handler
│   │   ├── LoginForm.jsx           # Admin authentication
│   │   └── ProtectedRoute.jsx      # Route protection
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   └── LoginPage.jsx
│   ├── App.jsx                     # Main application component
│   ├── index.js                    # Application entry point
│   └── index.css                   # Global styles
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **XAMPP** (for local PHP/MySQL development)
- **Git** (for version control)

### Installation Steps

1. **Navigate to the admin directory**
   ```bash
   cd HeraldBuilds-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the backend (XAMPP)**
   - Start XAMPP (Apache + MySQL)
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create database `heraldbuilds`
   - Import the database structure from the API examples

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Access the admin dashboard**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Login Credentials
- **Username**: `admin`
- **Password**: `password123`

## 📊 Dashboard Features

### 🙋‍♂️ User Questions Management
- **View Submissions** - All user-submitted questions from the main site
- **Status Filtering** - Filter by pending, answered, or all questions
- **Quick FAQ Creation** - Convert questions to FAQs with one click
- **Status Updates** - Mark questions as answered or resolved
- **Content Moderation** - Delete inappropriate or spam questions

### ❓ FAQ Management
- **Create FAQs** - Add new frequently asked questions
- **Category Organization** - Organize FAQs by categories
- **Content Editing** - Rich text editing for answers
- **Bulk Operations** - Manage multiple FAQs efficiently
- **Search & Filter** - Find specific FAQs quickly

### 🔧 Tools Management
- **Tool Database** - Comprehensive tools and components catalog
- **Category Management** - Organize by tools, components, hardware
- **Detailed Descriptions** - Add specifications and usage tips
- **Image Management** - Upload and manage tool images
- **Recommendation System** - Mark essential vs optional tools

### 📚 Guides Management
- **Guide Creation** - Step-by-step PC building guides
- **Difficulty Levels** - Beginner, Intermediate, Advanced, Expert
- **Tag System** - Categorize guides with relevant tags
- **Content Structure** - Organized sections for instructions
- **Media Integration** - Support for images and videos

## 🔌 API Integration

### Backend Endpoints
The admin dashboard integrates with the following API endpoints:

#### Authentication
- `POST /api/admin/login.php` - Admin login verification

#### User Questions
- `GET /api/user-questions/get.php` - Fetch all user questions
- `POST /api/user-questions/update-status.php` - Update question status
- `DELETE /api/user-questions/delete.php` - Delete questions

#### FAQ Management
- `GET /api/faqs/get.php` - Fetch all FAQs
- `POST /api/faqs/create.php` - Create new FAQ
- `PUT /api/faqs/update.php` - Update existing FAQ
- `DELETE /api/faqs/delete.php` - Delete FAQ

#### Tools Management
- `GET /api/tools/get.php` - Fetch all tools
- `POST /api/tools/create.php` - Create new tool
- `PUT /api/tools/update.php` - Update existing tool
- `DELETE /api/tools/delete.php` - Delete tool

#### Guides Management
- `GET /api/guides/get.php` - Fetch all guides
- `POST /api/guides/create.php` - Create new guide
- `PUT /api/guides/update.php` - Update existing guide
- `DELETE /api/guides/delete.php` - Delete guide

## 🎨 User Interface Design

### Design Principles
- **Clean & Intuitive** - Easy-to-use interface for administrators
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Consistent Styling** - Unified design language throughout
- **Accessibility** - Screen reader friendly and keyboard navigable

### Color Scheme
- **Primary**: #3b82f6 (Blue)
- **Secondary**: #1c2433 (Dark Blue)
- **Background**: #0e1320 (Dark)
- **Text**: #ffffff (White)
- **Accent**: #22c55e (Green for success states)

### Components
- **Navigation Tabs** - Easy switching between management sections
- **Data Tables** - Organized display of content with sorting
- **Modal Forms** - Streamlined editing and creation workflows
- **Status Indicators** - Visual feedback for actions and states

## 🔒 Security Features

### Authentication
- **Login Validation** - Secure credential verification
- **Session Management** - Persistent authentication state
- **Route Protection** - Unauthorized access prevention
- **Automatic Logout** - Session timeout handling

### Data Protection
- **Input Validation** - Client-side form validation
- **XSS Prevention** - Safe content rendering
- **CSRF Protection** - Cross-site request forgery prevention
- **SQL Injection Prevention** - Parameterized queries

## 🧪 Testing

### Available Scripts
```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Testing Strategy
- **Component Testing** - Individual component functionality
- **Integration Testing** - API communication testing
- **User Flow Testing** - Complete admin workflows
- **Accessibility Testing** - Screen reader compatibility

## 📦 Building for Production

### Production Build
```bash
npm run build
```

### Deployment Checklist
1. **Environment Variables** - Set production API endpoints
2. **Security Configuration** - Update authentication settings
3. **Database Setup** - Configure production database
4. **SSL Certificate** - Enable HTTPS for security
5. **Backup Strategy** - Implement regular backups

### Recommended Hosting
- **Frontend**: Netlify, Vercel, or AWS S3
- **Backend**: VPS with Apache/Nginx + PHP + MySQL
- **Database**: MySQL or MariaDB
- **CDN**: CloudFlare for static assets

## 🔧 Configuration

### Environment Setup
Create a `.env` file for environment-specific settings:
```env
REACT_APP_API_BASE_URL=http://localhost/api
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_VERSION=1.0.0
```

### Proxy Configuration
The `package.json` includes proxy settings for development:
```json
{
  "proxy": "http://localhost"
}
```

## 🚀 Advanced Features

### Planned Enhancements
- **Rich Text Editor** - WYSIWYG editing for content
- **Image Upload** - Direct image management
- **Bulk Operations** - Mass content management
- **Analytics Dashboard** - Usage statistics and insights
- **User Management** - Multiple admin accounts
- **Audit Logging** - Track all administrative actions

### Performance Optimizations
- **Code Splitting** - Lazy loading of components
- **Caching Strategy** - Efficient data caching
- **Bundle Optimization** - Minimized JavaScript bundles
- **Image Optimization** - Compressed and responsive images

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/admin-enhancement`)
3. **Make changes** with proper testing
4. **Commit changes** (`git commit -m 'Add admin enhancement'`)
5. **Push to branch** (`git push origin feature/admin-enhancement`)
6. **Create Pull Request**

### Code Standards
- **React Best Practices** - Functional components with hooks
- **ES6+ Features** - Modern JavaScript syntax
- **CSS Conventions** - BEM methodology for styling
- **Component Structure** - Reusable and maintainable components
- **Error Handling** - Comprehensive error management

## 📞 Support & Maintenance

### Getting Help
1. **Check Documentation** - Review this README and code comments
2. **Search Issues** - Look for existing solutions
3. **Create Issue** - Report bugs or request features
4. **Contact Team** - Reach out for urgent support

### Maintenance Tasks
- **Regular Updates** - Keep dependencies current
- **Security Patches** - Apply security updates promptly
- **Performance Monitoring** - Track application performance
- **Backup Verification** - Ensure backup integrity

## 📈 Analytics & Monitoring

### Key Metrics
- **Admin Usage** - Track administrative activities
- **Content Updates** - Monitor content modification frequency
- **System Performance** - Response times and error rates
- **User Engagement** - FAQ and guide usage statistics

### Monitoring Tools
- **Error Tracking** - JavaScript error monitoring
- **Performance Monitoring** - Page load time tracking
- **Uptime Monitoring** - System availability tracking
- **Security Monitoring** - Unauthorized access attempts

## 🔄 Version History

### v1.0.0 (Current)
- **Initial Release** - Complete admin dashboard
- **Authentication System** - Secure login functionality
- **Content Management** - Full CRUD operations
- **Responsive Design** - Mobile-friendly interface
- **API Integration** - Backend communication

### Upcoming Versions
- **v1.1.0** - Rich text editor and image uploads
- **v1.2.0** - Analytics dashboard and reporting
- **v1.3.0** - Multi-admin support and permissions
- **v2.0.0** - Complete UI redesign and enhanced features

---

**Herald Builds Admin Dashboard - Empowering Content Management**

*Built with precision and care for seamless content administration.*