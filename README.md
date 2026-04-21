# 🎮 MewmewGenshin - Genshin Impact Account & Loot Service Platform

## 📋 Mô tả Dự án
**MewmewGacha** là một nền tảng web toàn diện cho cộng đồng gacha nhiều game, cho phép:
- **Admin** đăng bán tài khoản game, viết bài build nhân vật, tạo tin tức
- **User** xem, mua tài khoản game, nạp tiền vào ví
- **Loot Mapper** nhận các yêu cầu thuê người chơi loot map

---

## 🎯 Features Chính

### 👨‍💼 Phần Admin
- ✅ Quản lý icon nhân vật Genshin
- ✅ Viết/chỉnh sửa bài build nhân vật
- ✅ Tạo/quản lý tin tức Genshin
- ✅ Đăng bán tài khoản Genshin
- ✅ Xem dashboard thống kê

### 👤 Phần User
- ✅ Xem danh sách tài khoản Genshin
- ✅ Tìm kiếm/lọc tài khoản theo level, server, giá
- ✅ Mua tài khoản (trừ tiền từ ví)
- ✅ Nạp tiền vào tài khoản
- ✅ Xem lịch sử giao dịch
- ✅ Xem bài build nhân vật
- ✅ Xem tin tức Genshin
- ✅ Đăng bài thuê loot map
- ✅ Rate/Review tài khoản đã mua

### 🗺️ Phần Loot Mapper
- ✅ Nhận thông báo bài đăng thuê loot map
- ✅ Xác nhận nhận việc
- ✅ Đánh dấu hoàn thành
- ✅ Nhận đánh giá từ người thuê

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18+ (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit / Zustand
- **API Client:** Axios / Fetch
- **Routing:** React Router v6

### Backend
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Storage:** Firebase Storage (hình ảnh)
- **Real-time:** Firebase Realtime Database / Socket.io
- **Hosting:** Firebase Hosting / Vercel

### Công cụ
- **Version Control:** Git/GitHub
- **Package Manager:** npm / yarn
- **Build Tool:** Vite

---

## 📁 Cấu trúc Thư mục

```
MewmewGenshin/
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API calls
│   │   ├── store/           # Redux/Zustand
│   │   ├── styles/          # Tailwind config
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── functions/           # Firebase Functions
│   ├── firestore.rules
│   ├── storage.rules
│   └── firebase-config.js
│
├── project/
│   ├── frontend/
│   │   └── FRONTEND.md
│   ├── backend/
│   │   └── BACKEND.md
│   ├── database/
│   │   └── DATABASE_COLUMNS.md
│   └── erd/
│       └── ERD.md
│
└── .gitignore
```

---

## 🚀 Getting Started

### Cài đặt Frontend
```bash
cd frontend
npm install
npm run dev
```

### Cài đặt Backend (Firebase)
```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

---

## 📚 Tài liệu Chi tiết
- 👉 [FRONTEND.md](./project/frontend/FRONTEND.md) - Hướng dẫn frontend, components, styling
- 👉 [BACKEND.md](./project/backend/BACKEND.md) - Firebase setup, API endpoints, functions
- 👉 [DATABASE_COLUMNS.md](./project/database/DATABASE_COLUMNS.md) - Chi tiết từng collection
- 👉 [ERD.md](./project/erd/ERD.md) - Sơ đồ quan hệ database

---

## 👥 Team & Roles
- **Admin:** Quản lý content, tài khoản bán
- **User:** Khách hàng mua acc, nạp tiền
- **Loot Mapper:** Người chơi loot map kiếm tiền

---

## 📅 Timeline Phát Triển

| Phase | Features | Timeline |
|-------|----------|----------|
| Phase 1 | Auth, Core CRUD, Payment | Week 1-2 |
| Phase 2 | Notification, Admin Dashboard | Week 3-4 |
| Phase 3 | Rating, Search, Image Upload | Week 5-6 |
| Phase 4 | Polish, Testing, Deploy | Week 7-8 |

---

## 📞 Liên Hệ & Support
- Email: support@mewmewgenshin.com
- Discord: [Community Link]
- Issues: [GitHub Issues Link]

---

**Happy Coding! 🎮✨**
