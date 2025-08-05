# Entrepreneur Data Management System (EmpowerBridge)

A web-based data management platform designed to help HEVA and similar organizations manage applications, track support activities, and enable entrepreneurs to receive both monetary and volunteer support transparently.

## 🚀 Features

### 👤 Entrepreneur Portal
- Submit startup applications
- Receive approval email with a **one-time password (OTP)**
- Log in with OTP and update it to a personal password
- Edit and update their profile (pending admin approval)
- Track their donations and support received

### 🌍 Public Portal
- View list of approved entrepreneurs
- Donate via **Paystack** (with option for anonymity)
- Volunteer to help entrepreneurs
- Real-time update of raised funds and support activities

### 🛠️ Admin Dashboard
- Review, approve, or reject new applications
- Automatically generate OTP and send to new entrepreneurs
- Review and approve profile edits made by entrepreneurs
- View all entrepreneurs, donations, and support logs
- Export reports for accountability

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS, DaisyUI
- **Routing**: React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, One-Time Password system
- **Payments**: Paystack Integration
- **Image Uploads**: Multer
- **Deployment**: Netlify (Frontend), Render/Railway (Backend)

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/mercyogalo/Entrepreneur-Support-Data-Management-.git
```

├── backend
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── uploads/
├── frontend
│   ├── pages/
│   ├── components/
│   └── utils/

