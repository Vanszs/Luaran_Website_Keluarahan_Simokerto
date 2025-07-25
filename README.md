# 🏛️ Dashboard Pintar Kelurahan Simokerto

<div align="center">
  <img src="./public/logo.png" alt="Dashboard Pintar Logo" width="120" height="120">
  
  **Sistem Manajemen Digital Modern untuk Kelurahan Simokerto**
  
  *Mendigitalkan pelayanan masyarakat dengan teknologi terdepan*

  [![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Material-UI](https://img.shields.io/badge/Material--UI-5.0-0081CB?style=for-the-badge&logo=material-ui)](https://mui.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

</div>

---

## 🚀 Tentang Proyek

**Dashboard Pintar Kelurahan Simokerto** adalah sistem manajemen digital yang revolusioner, dirancang khusus untuk modernisasi pelayanan publik di tingkat kelurahan. Sistem ini menggabungkan antarmuka yang intuitif dengan fungsionalitas yang powerful untuk memberikan pengalaman terbaik bagi administrator dan warga.

### ✨ Fitur Unggulan

#### 🎯 **Dashboard Interaktif**
- **Real-time Analytics** - Statistik laporan dan aktivitas secara langsung
- **Modern UI/UX** - Desain responsif dengan Material Design 3
- **Dark/Light Mode** - Tema yang dapat disesuaikan dengan preferensi pengguna
- **Mobile-First** - Optimized untuk semua perangkat

#### 👥 **Manajemen Pengguna**
- **Multi-Role System** - Admin, Super Admin, dan Warga dengan hak akses berbeda
- **Profile Management** - Kelola data pribadi dan foto profil
- **Activity Tracking** - Riwayat aktivitas pengguna
- **Bulk Operations** - Operasi massal untuk efisiensi

#### 📋 **Sistem Pelaporan**
- **Smart Reporting** - Form pelaporan yang intelligent dan user-friendly
- **Status Tracking** - Pelacakan status laporan secara real-time
- **Document Upload** - Upload bukti dan dokumen pendukung
- **Notification System** - Notifikasi otomatis untuk update status

#### 🔐 **Keamanan Terdepan**
- **Bcrypt Password Hashing** - Password di-hash dengan bcrypt salt 12 rounds
- **Secure Session Management** - Session dengan expiry dan signature validation
- **SQL Injection Protection** - Parameterized queries untuk semua database operations
- **Rate Limiting** - Perlindungan terhadap brute force attacks
- **CSRF Protection** - Token-based CSRF protection untuk form sensitif
- **Role-Based Access Control** - Kontrol akses berdasarkan peran (superadmin, admin1, admin2, petugas)
- **Input Validation** - Validasi dan sanitasi semua input pengguna
- **Secure Headers** - HTTP security headers untuk mencegah XSS dan clickjacking
- **Activity Logging** - Comprehensive audit trail untuk semua aktivitas pengguna

---

## 🏗️ Teknologi Stack

### Frontend
```typescript
Next.js 15.0      // React Framework dengan App Router
TypeScript 5.0    // Type-safe JavaScript
Material-UI 5.0   // Component Library
Emotion           // CSS-in-JS styling
React Hook Form   // Form handling
```

### Backend
```javascript
Next.js API Routes  // Serverless API
MySQL              // Primary Database
bcryptjs           // Password hashing (12 rounds)
crypto             // Session signature validation
Rate Limiting      // Brute force protection
```

### Security & DevOps
```bash
ESLint            # Code linting
Prettier          # Code formatting
bcryptjs          # Password hashing
mysql2            # Database driver
Rate Limiting     # Attack prevention
CSRF Protection   # Cross-site request forgery protection
```

---

## 🚀 Quick Start

### Prasyarat
```bash
Node.js >= 18.0.0
PostgreSQL >= 13.0
npm atau yarn
```

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/dashboard-pintar-simokerto.git
cd dashboard-pintar-simokerto
```

### 2️⃣ Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3️⃣ Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=lapor_maling
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password

# Security
SESSION_SECRET=your-super-secret-session-key-minimum-32-characters
NODE_ENV=development

# Application
NEXT_PUBLIC_APP_NAME="Dashboard Pintar Simokerto"
NEXT_PUBLIC_APP_VERSION="2.0.0"
```

### 4️⃣ Setup Database
```bash
# Import database structure
mysql -u your_username -p lapor_maling < sql/lapor_maling.sql

# Create activity logs table
mysql -u your_username -p lapor_maling < sql/create-activity-logs-table.sql

# Migrate existing passwords to bcrypt hash
npm run migrate:passwords
```

### 5️⃣ Run Development Server
```bash
npm run dev
# atau
yarn dev
```

🎉 **Buka [http://localhost:3000](http://localhost:3000) di browser Anda!**

---

## 🔐 Security Features

### Password Security
- **Bcrypt Hashing**: Semua password di-hash dengan bcrypt salt 12 rounds
- **Password Strength**: Validasi minimum 8 karakter dengan kombinasi huruf, angka, dan simbol
- **Migration Script**: Script otomatis untuk migrasi password lama ke format hash

### Session Management
- **Secure Sessions**: Session dengan timestamp dan signature validation
- **Auto Expiry**: Session otomatis expired setelah 7 hari
- **Edge Runtime Compatible**: Session management yang kompatibel dengan Next.js Edge Runtime

### Input Security
- **SQL Injection Protection**: Semua query menggunakan parameterized statements
- **XSS Prevention**: Input sanitization dan output encoding
- **CSRF Protection**: Token-based protection untuk form sensitif

### Access Control
- **Role-Based Authorization**: 4 level akses (superadmin, admin1, admin2, petugas)
- **Route Protection**: Middleware yang memvalidasi akses berdasarkan role
- **API Security**: Endpoint protection dengan session validation

### Rate Limiting
- **Login Protection**: Rate limiting untuk mencegah brute force attack
- **IP-based Limiting**: Pembatasan request per IP address
- **Configurable Limits**: Rate limits yang dapat dikonfigurasi

---

## 📱 Screenshots

<div align="center">

### 🖥️ Desktop Dashboard
![Desktop Dashboard](./docs/screenshots/desktop-dashboard.png)

### 📱 Mobile Responsive
<img src="./docs/screenshots/mobile-dashboard.png" alt="Mobile Dashboard" width="300">

### 🌙 Dark Mode
![Dark Mode](./docs/screenshots/dark-mode.png)

</div>

---

## 🗂️ Struktur Proyek

```
📦 dashboard-pintar-simokerto/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 admin/             # Admin pages (superadmin)
│   ├── 📁 admin2/            # Admin2 pages (secondary admin)
│   ├── 📁 dashboard/         # Admin1 dashboard
│   ├── 📁 petugas/           # Petugas dashboard
│   ├── 📁 api/              # API routes
│   │   ├── 📁 auth/         # Authentication endpoints
│   │   └── 📁 admin/        # Admin API endpoints
│   └── 📄 layout.tsx        # Root layout
├── 📁 components/            # Reusable components
│   ├── 📁 admin/            # Admin-specific components
│   ├── 📁 layout/           # Layout components
│   └── � ProtectedRoute.tsx # Route protection component
├── 📁 contexts/             # React contexts
│   └── 📄 AuthContext.tsx   # Authentication context
├── 📁 hooks/                # Custom hooks
├── 📁 utils/                # Utility functions
│   ├── � db.ts            # Database utilities
│   ├── 📄 sessionUtils.ts   # Session management
│   ├── 📄 rateLimiter.ts    # Rate limiting
│   └── 📄 activityLogger.ts # Activity logging
├── �📁 scripts/              # Utility scripts
│   └── 📄 migrate-existing-passwords.js # Password migration
├── 📁 sql/                  # Database schemas
├── 📁 styles/               # Global styles
├── 📁 public/               # Static assets
├── � middleware.ts         # Next.js middleware for auth
└── 📄 next.config.js        # Next.js configuration
```

---

## 🔧 Scripts & Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run migrate:passwords # Migrate existing passwords to bcrypt

# Security
npm audit               # Check for security vulnerabilities
npm audit fix           # Fix security issues automatically

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
```

---

## 🎨 Design System

### 🎨 Color Palette
```scss
// Primary Colors
$primary-blue: #3b82f6;
$primary-purple: #8b5cf6;

// Status Colors
$success: #10b981;    // Completed/Active
$warning: #f59e0b;    // Processing/Pending
$error: #ef4444;      // Rejected/Error
$info: #06b6d4;       // Information

// Neutral Colors
$gray-50: #f8fafc;
$gray-900: #0f172a;
```

### 📐 Typography
```scss
// Font Family
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

// Font Weights
font-weight: 400;  // Regular
font-weight: 500;  // Medium
font-weight: 600;  // Semi-bold
font-weight: 700;  // Bold
```

---

## 🔧 Konfigurasi

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | - |
| `NEXTAUTH_SECRET` | JWT secret key | - |
## 🔧 Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `MYSQL_HOST` | Database host | `localhost` |
| `MYSQL_PORT` | Database port | `3306` |
| `MYSQL_DATABASE` | Database name | `lapor_maling` |
| `MYSQL_USER` | Database username | `root` |
| `MYSQL_PASSWORD` | Database password | `` |
| `SESSION_SECRET` | Session encryption key | **Required** (min 32 chars) |
| `NODE_ENV` | Environment mode | `development` |
| `NEXT_PUBLIC_APP_NAME` | Application name | Dashboard Pintar |

### Database Schema
```sql
-- Admin table with bcrypt password hashing
CREATE TABLE admin (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,  -- bcrypt hashed
  name VARCHAR(255) NOT NULL,
  address TEXT,
  role ENUM('superadmin', 'admin1', 'admin2', 'petugas') DEFAULT 'admin1',
  pending BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports table
CREATE TABLE reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  address TEXT NOT NULL,
  description TEXT,
  jenis_laporan VARCHAR(255),
  status ENUM('pending', 'processing', 'completed', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs for security audit
CREATE TABLE activity_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  user_role VARCHAR(50),
  user_name VARCHAR(255),
  action VARCHAR(100),
  table_name VARCHAR(100),
  record_id INT,
  old_data JSON,
  new_data JSON,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛡️ Security Checklist

### ✅ Authentication & Authorization
- [x] Bcrypt password hashing (12 rounds)
- [x] Secure session management with expiry
- [x] Role-based access control (4 levels)
- [x] Protected routes with middleware
- [x] Rate limiting on login attempts

### ✅ Data Protection
- [x] SQL injection prevention (parameterized queries)
- [x] XSS prevention (input sanitization)
- [x] CSRF protection for forms
- [x] Secure HTTP headers
- [x] Environment variables for sensitive data

### ✅ Monitoring & Logging
- [x] Activity logging for all user actions
- [x] Failed login attempt tracking
- [x] Database query error handling
- [x] Session validation logging

---

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker
```dockerfile
# Build image
docker build -t dashboard-pintar .

# Run container
docker run -p 3000:3000 dashboard-pintar
```

### Manual Deployment
```bash
# Build production
npm run build

# Start production server
npm start
```

---

## 🤝 Contributing

Kami sangat menyambut kontribusi dari komunitas! Berikut cara berkontribusi:

### 1️⃣ Fork Repository
```bash
git clone https://github.com/your-username/dashboard-pintar-simokerto.git
```

### 2️⃣ Create Feature Branch
```bash
git checkout -b feature/amazing-feature
```

### 3️⃣ Commit Changes
```bash
git commit -m "feat: add amazing feature"
```

### 4️⃣ Push & Create PR
```bash
git push origin feature/amazing-feature
```

### 📋 Commit Convention
```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Formatting
refactor: # Code refactoring
test:     # Testing
chore:    # Maintenance
```

---

## 📋 TODO Roadmap

### 🎯 Version 1.1
- [ ] 📊 Advanced Analytics Dashboard
- [ ] 📱 Mobile App (React Native)
- [ ] 🔔 Push Notifications
- [ ] 📁 File Management System

### 🎯 Version 1.2
- [ ] 🤖 AI-powered Report Classification
- [ ] 📍 GIS Integration
- [ ] 💬 Real-time Chat Support
- [ ] 📈 Performance Monitoring

### 🎯 Version 2.0
- [ ] 🏗️ Microservices Architecture
- [ ] ☁️ Cloud-native Deployment
- [ ] 🔒 Advanced Security Features
- [ ] 📊 Business Intelligence

---

## 🐛 Issue Reporting

Menemukan bug? Punya saran? Silakan buat issue di GitHub!

### 🐛 Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**Steps to reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 1.0.0]
```

---

## 📞 Support & Contact

### 🏛️ Tim Pengembang
- **Project Manager**: Kelurahan Simokerto
- **Lead Developer**: [Your Name](mailto:your.email@example.com)
- **UI/UX Designer**: [Designer Name](mailto:designer@example.com)

### 📧 Kontak
- **Email**: support@dashboard-pintar.id
- **Website**: https://dashboard-pintar.vercel.app
- **Documentation**: https://docs.dashboard-pintar.id

### 💬 Community
- **Discord**: [Join our Discord](https://discord.gg/dashboard-pintar)
- **Telegram**: [@dashboard_pintar](https://t.me/dashboard_pintar)

---

## 📄 License

Proyek ini dilisensikan under **MIT License** - lihat file [LICENSE](LICENSE) untuk detail.

```
MIT License

Copyright (c) 2025 Dashboard Pintar Kelurahan Simokerto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Acknowledgments

- **Material-UI Team** - untuk component library yang luar biasa
- **Next.js Team** - untuk framework React yang powerful
- **Vercel** - untuk platform deployment yang seamless
- **Kelurahan Simokerto** - untuk kepercayaan dan kolaborasi
- **Open Source Community** - untuk inspirasi dan kontribusi

---

<div align="center">

### 🌟 Jika proyek ini bermanfaat, jangan lupa beri ⭐ di GitHub!

**[⬆ Kembali ke atas](#-dashboard-pintar-kelurahan-simokerto)**

---

*Made with ❤️ by Dashboard Pintar Team*

</div>
