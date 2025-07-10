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
- **JWT Authentication** - Sistem autentikasi yang aman
- **Role-Based Access Control** - Kontrol akses berdasarkan peran
- **Data Encryption** - Enkripsi data sensitif
- **Audit Trail** - Log aktivitas untuk keperluan audit

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
PostgreSQL         // Primary Database
Prisma ORM         // Database ORM
bcryptjs           // Password hashing
jsonwebtoken       // JWT authentication
```

### DevOps & Tools
```bash
ESLint            # Code linting
Prettier          # Code formatting
Husky             # Git hooks
Docker            # Containerization
Vercel            # Deployment platform
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
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dashboard_pintar"

# Authentication
NEXTAUTH_SECRET="your-super-secret-jwt-key"
NEXTAUTH_URL="http://localhost:3000"

# Application
NEXT_PUBLIC_APP_NAME="Dashboard Pintar Simokerto"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### 4️⃣ Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run db:seed
```

### 5️⃣ Run Development Server
```bash
npm run dev
# atau
yarn dev
```

🎉 **Buka [http://localhost:3000](http://localhost:3000) di browser Anda!**

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
│   ├── 📁 admin/             # Admin pages
│   ├── 📁 dashboard/         # User dashboard
│   ├── 📁 api/              # API routes
│   └── 📄 layout.tsx        # Root layout
├── 📁 components/            # Reusable components
│   ├── 📁 admin/            # Admin-specific components
│   ├── 📁 layout/           # Layout components
│   └── 📁 ui/               # UI components
├── 📁 contexts/             # React contexts
├── 📁 hooks/                # Custom hooks
├── 📁 utils/                # Utility functions
├── 📁 styles/               # Global styles
├── 📁 public/               # Static assets
├── 📁 prisma/               # Database schema & migrations
└── 📁 docs/                 # Documentation
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
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_NAME` | Application name | Dashboard Pintar |

### Database Schema
```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🧪 Testing

### Unit Tests
```bash
npm run test
# atau
yarn test
```

### E2E Tests
```bash
npm run test:e2e
# atau
yarn test:e2e
```

### Coverage Report
```bash
npm run test:coverage
# atau
yarn test:coverage
```

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
