# FixNet 🏘️
### Community-Driven Infrastructure Issue Reporting Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)

> **Empowering communities to create positive change through transparent, efficient reporting of local infrastructure issues.**

FixNet is a comprehensive web-based platform that bridges the communication gap between citizens and government agencies, enabling seamless reporting, tracking, and resolution of community infrastructure problems.

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Architecture](#-architecture)
5. [Installation](#-installation)
6. [Usage](#-usage)
7. [API Documentation](#-api-documentation)
8. [Database Schema](#-database-schema)
9. [Contributing](#-contributing)
10. [License](#-license)
11. [Author](#-author)

---

## 🌟 Overview

FixNet solves the critical communication gap between residents and government agencies by providing:

- **Streamlined Reporting**: Citizens can easily report infrastructure issues with photos and location data
- **Transparent Tracking**: Real-time status updates from submission to resolution
- **Efficient Management**: Government agencies get organized dashboards for issue management
- **Community Engagement**: Public visibility into community problems and their resolution

### Problem Statement
Many communities face challenges with:
- Citizens not knowing how to report infrastructure issues
- Reports getting lost in bureaucratic processes
- Lack of transparency in issue resolution
- Inefficient resource allocation by government agencies

### Solution
FixNet creates a transparent, organized system where:
- Reports are automatically categorized and routed to appropriate departments
- Citizens can track progress from submission to completion
- Government agencies can prioritize based on community impact
- The entire process promotes accountability and community engagement

---

## ✨ Features

### For Citizens
- 🖼️ **Visual Reporting**: Upload photos and add location details
- 📍 **GPS Integration**: Automatic location detection with manual override
- 📊 **Progress Tracking**: Real-time status updates and notifications
- 🏘️ **Community View**: Browse local reports and see neighborhood issues
- 👤 **Profile Management**: Track personal reporting history and impact

### For Government Agencies
- 🏢 **Department Dashboards**: Role-based access for different agencies
- 📋 **Issue Management**: Categorized queues with priority sorting
- 📈 **Analytics**: Performance metrics and reporting insights
- 👥 **Team Collaboration**: Assignment and status update workflows
- 📱 **Mobile Responsive**: Access from any device, anywhere

### For Administrators
- 🔧 **System Management**: User roles and permissions control
- 📊 **Comprehensive Analytics**: System-wide performance metrics
- 🛠️ **Category Management**: Configurable issue types and workflows
- 🔍 **Audit Logging**: Complete tracking of system changes
- 📤 **Data Export**: Reporting and compliance features

---

## 🛠️ Tech Stack

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript development
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database with advanced features
- **Row Level Security (RLS)** - Database-level security
- **Real-time subscriptions** - Live data updates

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking
- **Vue DevTools** - Development debugging

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Vue.js SPA    │◄──►│   Supabase API  │◄──►│  PostgreSQL DB  │
│                 │    │                 │    │                 │
│  • Components   │    │  • Auth         │    │  • Users        │
│  • Routing      │    │  • API          │    │  • Reports      │
│  • State Mgmt   │    │  • Real-time    │    │  • Status Logs  │
│  • UI/UX        │    │  • Storage      │    │  • Notifications│
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Key Architectural Decisions

1. **Single Page Application (SPA)**: Vue.js for responsive, interactive user experience
2. **Backend-as-a-Service**: Supabase for rapid development and built-in features
3. **Component-Based Design**: Reusable UI components with claymorphism design system
4. **Role-Based Access Control**: Multi-tier user system (Residents, Agency Staff, Admins, Super Admins)
5. **Real-time Updates**: Live notifications and status updates using Supabase subscriptions

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Supabase Account** (for backend services)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/venopyX/FixNet.git
   cd FixNet
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using yarn
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   ```bash
   # Run the database migration script
   psql -h your_db_host -U your_username -d your_database -f database/schema.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform**
   - **Vercel**: Connect your GitHub repository
   - **Netlify**: Drag and drop the `dist` folder
   - **Custom Server**: Serve the `dist` folder with a web server

---

## 📖 Usage

### Getting Started

1. **Create an Account**
   - Visit the homepage and click "Get Started"
   - Register as a resident with your email and basic information
   - Verify your email address

2. **Report Your First Issue**
   - Click "Report an Issue" from the dashboard
   - Fill in the issue details (title, description, category)
   - Add a photo and location information
   - Submit your report

3. **Track Progress**
   - View your reports in the dashboard
   - Receive email notifications for status updates
   - See resolution details when issues are fixed

### User Roles

#### 👤 Residents
- Report infrastructure issues
- Track personal reports
- View community reports
- Receive notifications

#### 🏢 Agency Staff
- View assigned category reports
- Update report statuses
- Add resolution comments
- Manage department workload

#### 👨‍💼 Administrators
- Manage all reports
- View system analytics
- Configure categories
- Assign staff to departments

#### ⚡ Super Administrators
- Full system access
- User management
- System configuration
- Audit log access

### Key Workflows

#### Reporting Process
```
Citizen Report → Auto-Assignment → Agency Review → Status Updates → Resolution
```

#### Agency Management
```
New Report Alert → Assessment → Assignment → Work Progress → Completion
```

---

## 📡 API Documentation

### Authentication
All API requests require authentication via Supabase Auth.

```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

### Reports API

#### Create Report
```typescript
const { data, error } = await supabase
  .from('reports')
  .insert({
    title: 'Pothole on Main Street',
    description: 'Large pothole causing vehicle damage',
    category: 'roads',
    location: 'Main Street & Oak Avenue',
    latitude: 40.7128,
    longitude: -74.0060,
    priority: 'high'
  })
```

#### Get Reports
```typescript
// Get all reports
const { data, error } = await supabase
  .from('reports')
  .select('*, users(first_name, last_name)')
  .order('created_at', { ascending: false })

// Get user's reports
const { data, error } = await supabase
  .from('reports')
  .select('*')
  .eq('resident_id', userId)
```

#### Update Report Status
```typescript
const { data, error } = await supabase
  .from('reports')
  .update({ 
    status: 'resolved',
    resolution_comment: 'Issue has been fixed'
  })
  .eq('id', reportId)
```

### Real-time Subscriptions

```typescript
// Subscribe to report updates
const subscription = supabase
  .channel('reports')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'reports' },
    (payload) => {
      console.log('Report updated:', payload)
    }
  )
  .subscribe()
```

---

## 🗄️ Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) CHECK (role IN ('resident', 'agency_staff', 'admin', 'super_admin')),
    status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'suspended')),
    agency VARCHAR(255),
    assigned_categories TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Reports
```sql
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    location VARCHAR(500) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(10) DEFAULT 'medium',
    assigned_to UUID REFERENCES users(id),
    longitude DECIMAL(10, 8),
    latitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Status Updates
```sql
CREATE TABLE status_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES reports(id),
    admin_id UUID REFERENCES users(id),
    previous_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    admin_comment TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Relationships
- Users can have multiple Reports (1:N)
- Reports can have multiple Status Updates (1:N)
- Agency Staff are assigned to specific Categories (N:M)
- Reports are assigned to Agency Staff based on Category

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/venopyX/FixNet.git
   cd FixNet
   git remote add upstream https://github.com/venopyX/FixNet.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- **TypeScript**: Use strict typing
- **Vue.js**: Follow Vue 3 Composition API patterns
- **CSS**: Use Tailwind CSS utilities
- **Naming**: Use descriptive, camelCase for variables and functions
- **Components**: Use PascalCase for component names

### Commit Message Format
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Scope: component, page, service, etc. (optional)
```

Examples:
```
feat(reports): add photo upload functionality
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 👨‍💻 Author

**Gemechis Chala**

- 🐙 GitHub: [@venopyX](https://github.com/venopyX)
- 🐦 Twitter: [@venopyx](https://twitter.com/venopyx)
- 📷 Instagram: [@venopyx](https://instagram.com/venopyx)
- 📱 Telegram: [@venopyx](https://t.me/venopyx)

### Project Context
This project was developed as part of the **ALX Software Engineering Specialization Program**, demonstrating full-stack web development skills, database design, and modern software engineering practices.

---

## 🙏 Acknowledgments

- **ALX Africa** - For the comprehensive software engineering program
- **Vue.js Team** - For the excellent frontend framework
- **Supabase** - For providing powerful backend infrastructure
- **Open Source Community** - For the tools and libraries that made this possible
- **Contributors** - Thank you to everyone who helps improve FixNet

---

## 📊 Project Status

- 🟢 **Active Development**: This project is actively maintained
- 📈 **Version**: 1.0.0
- 🚀 **Last Updated**: 2025-07-09
- 📝 **Documentation**: Up to date

### Roadmap
- [ ] AI Integration
- [ ] Mobile app development (Flutter)
- [ ] Advanced analytics dashboard
- [ ] API rate limiting and caching
- [ ] Multi-language support
- [ ] Advanced notification system
- [ ] Integration with municipal systems

---

<div align="center">

**Made with ❤️ for stronger communities**

[Report Bug](https://github.com/venopyX/FixNet/issues) • [Request Feature](https://github.com/venopyX/FixNet/issues) • [View Documentation](https://github.com/venopyX/FixNet/wiki)

</div>