# HEVA Entrepreneur Support Data Management System

## Overview

HEVA Management is a comprehensive data management platform designed to support entrepreneurs by providing access to funding, mentorship, and a vibrant network. The system allows entrepreneurs to apply for support, while administrators can manage applications, track funding, and monitor support activities.

## Problem Statement

Lack of a clear data management tool to manage entrepreneurs and get real-time updates on fund usage and startup support.

## Solution

A complete data management platform that allows HEVA to:
- Collect and store data from various sources/activities
- Analyze data to make strategic decisions
- Manage entrepreneur applications and approvals
- Track funding distribution and usage
- Monitor support activities and outcomes

## Features

### For Entrepreneurs
- **Application System**: Apply to join HEVA through a comprehensive application form
- **Public Profile**: Approved entrepreneurs get featured on the public entrepreneurs page
- **Dashboard Access**: Login to view their profile and status (no self-registration)

### For Administrators
- **Application Management**: Review, approve, or reject entrepreneur applications
- **Automatic Account Creation**: System creates accounts for approved entrepreneurs
- **Email Notifications**: Automatic emails sent with login credentials upon approval
- **Fund Tracking**: Add, edit, and monitor funding provided to entrepreneurs
- **Support Activity Logging**: Track mentorship and support activities
- **Data Analytics**: Real-time insights into fund usage and support effectiveness

### Public Features
- **Home Page**: Information about HEVA and benefits of joining
- **Entrepreneur Showcase**: Public display of approved entrepreneurs
- **Contact Form**: Way for interested parties to get in touch

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Nodemailer** for email notifications
- **bcryptjs** for password hashing

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Tailwind CSS** with DaisyUI for styling
- **Responsive Design** for all devices

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Gmail account for email notifications

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/heva-management
JWT_SECRET=your-super-secret-jwt-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
PORT=5000
```

4. Create uploads directory:
```bash
mkdir uploads
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage Flow

1. **Home Page**: Visitors learn about HEVA and can apply to join
2. **Application**: Entrepreneurs submit detailed applications with business information
3. **Admin Review**: Administrators review applications and make approval decisions
4. **Account Creation**: Approved entrepreneurs automatically get user accounts
5. **Email Notification**: Login credentials are sent via email
6. **Dashboard Access**: Entrepreneurs can login to view their profile
7. **Public Display**: Approved entrepreneurs appear on the public showcase
8. **Ongoing Management**: Admins track funding and support activities

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (admin only)

### Applications
- `POST /api/applications` - Submit application (public)
- `GET /api/applications` - List applications (admin only)
- `PATCH /api/applications/:id/approve` - Approve application (admin only)
- `PATCH /api/applications/:id/reject` - Reject application (admin only)

### Entrepreneurs
- `GET /api/entrepreneurs/approved` - Get approved entrepreneurs (public)
- `GET /api/entrepreneurs` - List all entrepreneurs (admin only)
- `GET /api/entrepreneurs/:id` - Get entrepreneur details (admin only)
- `POST /api/entrepreneurs` - Create entrepreneur (admin only)
- `PUT /api/entrepreneurs/:id` - Update entrepreneur (admin only)
- `DELETE /api/entrepreneurs/:id` - Delete entrepreneur (admin only)

### Fund Management
- `POST /api/entrepreneurs/:id/funds` - Add fund record
- `PUT /api/entrepreneurs/:id/funds/:fundId` - Update fund record
- `DELETE /api/entrepreneurs/:id/funds/:fundId` - Delete fund record

### Support Activities
- `POST /api/entrepreneurs/:id/support` - Add support activity
- `PUT /api/entrepreneurs/:id/support/:activityId` - Update support activity
- `DELETE /api/entrepreneurs/:id/support/:activityId` - Delete support activity

## Security Features

- JWT-based authentication
- Role-based access control (admin, entrepreneur)
- Password hashing with bcrypt
- File upload validation
- Protected routes and API endpoints

## Email Configuration

The system uses Gmail SMTP for sending emails. To set this up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Use the App Password in the `EMAIL_PASS` environment variable

## File Structure

```
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── public/
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## Git Commands for Deployment

After downloading the code to your local machine:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Updates"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the HEVA team or create an issue in the repository.

---

**Happy Hacking!** 🚀