# HEVA Tracker - Creative Entrepreneur Impact Platform

![HEVA Tracker](https://img.shields.io/badge/HEVA-Tracker-teal?style=for-the-badge&logo=rocket)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-green?style=flat-square)
![Offline Support](https://img.shields.io/badge/Offline-Support-blue?style=flat-square)
![Multilingual](https://img.shields.io/badge/Multilingual-EN%20|%20FR%20|%20AR-orange?style=flat-square)

## 🚀 Project Overview

HEVA Tracker is a comprehensive web-based platform designed to support creative entrepreneurs across East Africa through funding, capacity building, and research. The application serves as a centralized hub for tracking startup progress, managing fund disbursements, collecting data, and generating strategic insights for program administrators and stakeholders.

### 🎯 Mission
To create a unified, user-friendly platform that empowers HEVA Fund administrators to efficiently track, analyze, and support creative businesses across East Africa while providing entrepreneurs with tools to manage their funding journey and report progress.

## ✨ Key Features

### 🔐 Authentication & User Management
- **Role-based access control** (Super Admin, Country Admin, Viewer)
- **Secure login system** with demo credentials for testing
- **User management interface** for Super Admins
- **Country-specific access restrictions** for Country Admins

### 📊 Dashboard & Analytics
- **Real-time overview** of program metrics
- **Interactive filtering** by country, value chain, data type, support type
- **Key performance indicators**: Total organizations, funding disbursed, countries served
- **Visual charts**: Grants vs financing, value chain distribution, country funding breakdown
- **Employment impact tracking** across sectors

### 🏢 Organization Management
- **Comprehensive startup profiles** with personal and business data
- **Funding history tracking** with disbursement records
- **Support activity logging** (mentorship, training, workshops)
- **Progress milestone tracking** with status indicators
- **Strategic filtering** for data analysis and reporting

### 👥 Individual Tracking
- **Personal journey mapping** from application to graduation
- **Participant progress tracking** with stage-based workflows
- **Skills development monitoring** and training completion
- **Organization linking** for relationship management

### 🔬 Research & Data Collection
- **Multi-format file uploads** (Excel, CSV, Word, PDF, Audio)
- **Three data categories**: Financial Reports, Activities Reports, Impact Data
- **Audio transcription** with automatic data extraction
- **Live survey integration** with Google Forms/Typeform
- **Submission tracking** and audit logs

### 🌟 Outstanding Milestones
- **Achievement tracking** for individuals and organizations
- **Impact metrics**: Revenue growth, job creation, people reached
- **Media uploads**: Images, videos, certificates as proof
- **Category tagging**: Health, Income, Education, Environment, Innovation
- **Newsletter-ready exports** for stakeholder reporting

### 📱 Progressive Web App (PWA)
- **Offline functionality** with local data storage
- **Auto-sync** when connection is restored
- **Install prompts** for mobile and desktop
- **Responsive design** optimized for all devices
- **Touch-friendly interface** for mobile users

### 🌍 Multilingual Support
- **Three languages**: English, French, Arabic
- **RTL support** for Arabic
- **Localized content** and interface elements
- **Cultural adaptations** for different regions

### 🤖 Intelligent Chatbot
- **Natural conversation** handling
- **Context-aware responses** for platform help
- **Human handoff** to HEVA representatives
- **FAQ integration** with quick answers

## 🛠️ Setup Instructions (For Bolt Users)

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for initial setup
- No additional software installation required

### Getting Started
1. **Access the Application**
   ```
   Open the Bolt environment
   The app will automatically start on localhost:5173
   ```

2. **Login Credentials**
   ```
   Demo Password: demo
   (Provides Super Admin access to all features)
   
   Country-specific access:
   - Kenya Admin: kenya
   - Nigeria Admin: nigeria
   ```

3. **First-Time Setup**
   - Navigate to the login page
   - Enter the demo password
   - Explore the dashboard and features
   - Add sample data using the forms

### Development Environment
```bash
# The app runs on Vite with the following stack:
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- PWA capabilities with Vite PWA plugin
```

## 🚀 Deployment & Sharing

### For Stakeholders
1. **Live Demo**: Share the Bolt environment URL directly
2. **Screenshots**: Use browser tools to capture key screens
3. **PDF Reports**: Export data and milestones using built-in export features

### For Production Deployment
1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Hosting Platform**
   - Netlify (recommended)
   - Vercel
   - AWS S3 + CloudFront
   - Any static hosting service

3. **PWA Installation**
   - Users can install directly from browser
   - Works offline after installation
   - Automatic updates when online

### Sharing with Team
- **Demo Mode**: Use provided demo credentials
- **User Management**: Super Admins can create additional users
- **Data Export**: Export all data for backup or migration

## 🔮 Future Improvements

### Phase 2 Features
- [ ] **Real-time notifications** for funding updates
- [ ] **Advanced analytics** with machine learning insights
- [ ] **Multi-language support** expansion (Swahili, Amharic)
- [ ] **Enhanced mobile app** with native features

### Integration Expansions
- [ ] **Payment gateway** integration for disbursements
- [ ] **Email automation** for stakeholder communications
- [ ] **Calendar integration** for event management
- [ ] **Document management** system with version control

### Advanced Analytics
- [ ] **Predictive modeling** for funding success rates
- [ ] **Impact forecasting** based on historical data
- [ ] **Comparative analysis** across regions and sectors
- [ ] **Custom dashboard** creation for stakeholders

### Technical Enhancements
- [ ] **Backend API** integration for real-time data
- [ ] **Database synchronization** with PostgreSQL
- [ ] **Advanced search** with Elasticsearch
- [ ] **Automated reporting** with scheduled exports

### User Experience
- [ ] **Voice input** for data entry
- [ ] **AI-powered insights** and recommendations
- [ ] **Collaborative features** for team workflows
- [ ] **Advanced visualization** with D3.js charts

## 🏗️ Architecture Overview

### Frontend Stack
- **React 18**: Modern React with hooks and context
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server

### Data Management
- **Local Storage**: Offline data persistence
- **Context API**: State management across components
- **Automatic Sync**: Background synchronization when online

### PWA Features
- **Service Worker**: Offline caching and background sync
- **Web App Manifest**: Installation and app-like behavior
- **Responsive Design**: Mobile-first approach

## 📞 Support & Contact

### HEVA Fund Contact
- **Phone**: +254 712 345 678
- **Email**: support@hevafund.org
- **Website**: https://hevafund.org
- **Hours**: Monday-Friday, 9 AM - 5 PM EAT

### Technical Support
- Use the built-in chatbot for immediate help
- Contact HEVA representatives for advanced support
- Check the submission logs for data tracking

## 📄 License

This project is developed for HEVA Fund to support creative entrepreneurs across East Africa. All rights reserved.

---

**Built with ❤️ for Creative Entrepreneurs in East Africa**

*Empowering innovation, tracking impact, driving growth.*