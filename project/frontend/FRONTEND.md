# 🎨 Frontend Documentation - MewmewGenshin

## 📱 Overview
Frontend được xây dựng với **React 18+** sử dụng **Vite** cho build tool và **Tailwind CSS** để styling. Ứng dụng hỗ trợ responsive design cho desktop, tablet, mobile.

---

## 🚀 Setup & Installation

### 1. Tạo Project với Vite
```bash
npm create vite@latest mewmew-frontend -- --template react
cd mewmew-frontend
npm install
```

### 2. Cài đặt Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Cấu hình Tailwind (`tailwind.config.js`)
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7B68EE',
        secondary: '#FF6B9D',
        dark: '#1a1a2e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
```

### 4. Cài đặt Dependencies
```bash
npm install react-router-dom axios zustand react-toastify
npm install -D tailwindcss postcss autoprefixer
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── AccCard.jsx
│   ├── LootMapCard.jsx
│   └── Auth/
│       ├── LoginForm.jsx
│       └── RegisterForm.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── AdminDashboard.jsx
│   ├── AccMarketplace.jsx
│   ├── AccDetail.jsx
│   ├── LootMapMarketplace.jsx
│   ├── CharacterBuilds.jsx
│   ├── News.jsx
│   ├── UserProfile.jsx
│   └── NotFound.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── accService.js
│   ├── lootMapService.js
│   ├── userService.js
│   └── transactionService.js
│
├── store/
│   ├── authStore.js
│   ├── userStore.js
│   ├── accStore.js
│   └── lootMapStore.js
│
├── styles/
│   ├── index.css
│   └── tailwind.css
│
├── hooks/
│   ├── useAuth.js
│   ├── useFetch.js
│   └── useLocalStorage.js
│
├── utils/
│   ├── constants.js
│   ├── formatters.js
│   └── validators.js
│
├── App.jsx
└── main.jsx
```

---

## 🎯 Main Pages & Components

### 1️⃣ Authentication Pages
- **Login.jsx** - Đăng nhập user
- **Register.jsx** - Đăng ký tài khoản mới

### 2️⃣ Public Pages
- **Home.jsx** - Trang chủ
- **News.jsx** - Tin tức Genshin
- **CharacterBuilds.jsx** - Hướng dẫn build nhân vật

### 3️⃣ Market Pages
- **AccMarketplace.jsx** - Danh sách acc bán
- **AccDetail.jsx** - Chi tiết 1 acc
- **LootMapMarketplace.jsx** - Danh sách bài loot map

### 4️⃣ User Pages
- **UserProfile.jsx** - Hồ sơ user (ví, lịch sử mua)
- **Dashboard.jsx** - Dashboard người dùng

### 5️⃣ Admin Pages
- **AdminDashboard.jsx** - Quản lý toàn bộ hệ thống
  - Thống kê doanh thu
  - Quản lý user
  - Duyệt bài đăng

---

## 🔗 API Service Layer

### `services/api.js`
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### `services/authService.js`
```javascript
import api from './api';

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => localStorage.removeItem('authToken'),
  getCurrentUser: () => api.get('/auth/me'),
};
```

### `services/accService.js`
```javascript
import api from './api';

export const accService = {
  getAll: (filters) => api.get('/acc', { params: filters }),
  getById: (id) => api.get(`/acc/${id}`),
  create: (accData) => api.post('/acc', accData),
  update: (id, accData) => api.put(`/acc/${id}`, accData),
  delete: (id) => api.delete(`/acc/${id}`),
  purchase: (accId) => api.post(`/acc/${accId}/purchase`),
};
```

---

## 📦 State Management (Zustand)

### `store/authStore.js`
```javascript
import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('authToken'),
  isLoading: false,
  
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('authToken', response.data.token);
      set({ user: response.data.user, token: response.data.token });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  logout: () => {
    authService.logout();
    set({ user: null, token: null });
  },
}));
```

---

## 🎨 Tailwind CSS Usage

### Color Scheme
```tailwind
bg-primary       /* #7B68EE - Main color */
bg-secondary     /* #FF6B9D - Secondary */
bg-dark          /* #1a1a2e - Dark mode */
text-primary     /* Primary text */
```

### Common Patterns
```jsx
// Button
<button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90">
  Click me
</button>

// Card
<div className="bg-white rounded-lg shadow-md p-6">
  Content here
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (...))}
</div>

// Responsive Text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Title
</h1>
```

---

## 🔄 Routing Setup

### `App.jsx`
> [!IMPORTANT]
> **Cấu trúc Router (Quan Trọng):** Hệ thống sử dụng quy tắc nested routing dựa trên Game Platform (ví dụ: `/:gameId/home` -> `/hi3/home` hoặc `/genshin/home`). 
> Bằng cách này, chúng ta dùng được một Layout chung nhưng thay đổi Data và View tùy theo game được chọn ở Sidebar Dropdown.

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AccMarketplace from './pages/AccMarketplace';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/acc-marketplace" element={<AccMarketplace />} />
        <Route path="/acc/:id" element={<AccDetail />} />
        <Route path="/loot-map" element={<LootMapMarketplace />} />
        <Route path="/character-builds" element={<CharacterBuilds />} />
        <Route path="/news" element={<News />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## 🚀 Run Development Server
```bash
npm run dev
```

---

## 📝 Best Practices

✅ **Do's:**
- Tách component nhỏ, reusable
- Sử dụng custom hooks cho logic chung
- Validate input trước khi submit
- Sử dụng lazy loading cho images
- Implement error boundaries

❌ **Don'ts:**
- Không hardcode URL/API endpoints
- Không lưu sensitive data ở localStorage
- Không render list mà không key
- Không fetch data ở component mount quá nhiều lần

---

## 🔐 Environment Variables (`.env`)
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
```

---

## 📦 Build & Deployment
```bash
# Build for production
npm run build

# Preview build
npm run preview

# Deploy to Vercel
npm install -g vercel
vercel
```

---

**Happy Coding! 🎨✨**
