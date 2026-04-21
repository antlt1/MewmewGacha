# 🔥 Firebase Setup Guide

## Bước 1: Tạo Firebase Project

1. Vào [Firebase Console](https://console.firebase.google.com/)
2. Nhấn **"Create Project"** hoặc **"Add Project"**
3. Nhập tên project (ví dụ: `MewmewGenshin`)
4. Chọn cấu hình theo ý thích
5. Tạo Firebase project

---

## Bước 2: Tạo Web App

1. Trong Firebase Console, chọn project vừa tạo
2. Nhấn biểu tượng **`</>`** (Web) để thêm ứng dụng web
3. Nhập tên app (ví dụ: `MewmewGenshin Frontend`)
4. Firebase sẽ hiển thị **Firebase SDK config**
5. **COPY các giá trị này** - bạn sẽ cần dùng

---

## Bước 3: Setup Authentication

### Bật Email/Password Authentication
1. Vào **Authentication** (trong sidebar)
2. Chọn tab **Sign-in method**
3. Nhấn **Email/Password**
4. Bật **Enable** cho "Email/Password"
5. Nhấn **Save**

### (Optional) Bật Google Sign-in
1. Chọn **Google** trong sign-in methods
2. Nhấn **Enable**
3. Chọn email project
4. Nhấn **Save**

---

## Bước 4: Setup Firestore Database

1. Vào **Firestore Database** (trong sidebar)
2. Nhấn **Create Database**
3. Chọn location (ví dụ: `asia-southeast1`)
4. Chọn **Start in production mode**
5. Nhấn **Create**

### Cấu hình Security Rules
1. Vào tab **Rules**
2. Thay đổi mã sang:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public pages - ai cũng có thể đọc
    match /{document=**} {
      allow read: if true;
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId || isAdmin();
      allow create: if request.auth != null;
    }

    // Authenticated users
    match /accGenshin/{document=**} {
      allow create, update, delete: if request.auth != null;
    }
    
    match /transactions/{document=**} {
      allow create, update: if request.auth != null;
    }

    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.position == 'admin';
    }
  }
}
```

3. Nhấn **Publish**

---

## Bước 5: Cấu hình môi trường (.env)

1. Tìm file `.env` trong project frontend
2. Copy các giá trị từ Firebase Config bạn lấy ở Bước 2

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

VITE_USE_FIREBASE_EMULATOR=false
```

3. Lưu file

---

## Bước 6: Test Setup

Chạy dev server:
```bash
cd project/frontend
npm run dev
```

Tester:
1. Vào `http://localhost:5173/hi3/register`
2. Đăng ký tài khoản mới
3. Nếu thành công → Được redirect đến login
4. Đăng nhập với tài khoản vừa tạo
5. Nếu thành công → Được redirect về `/hi3/home`

---

## 🧪 Test Credentials

Sau khi setup, bạn có thể tạo test account:
- **Email:** test@example.com
- **Password:** test123456

---

## Troubleshooting

### ❌ "Firebase API key not found"
- Kiểm tra `.env` file đúng chưa
- Restart dev server (`npm run dev`)

### ❌ "Cannot create user - Invalid credentials"
- Email đã được dùng rồi
- Password phải ít nhất 8 ký tự
- Check lại Network tab để xem error details

### ❌ "Firestore not connected"
- Kiểm tra Project ID trong `.env`
- Restart dev server
- Kiểm tra internet connection

### ❌ "User profile not found"
- Firestore chưa được setup đúng
- Kiểm tra Security Rules

---

## 📚 Tài liệu tham khảo

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

**Done! ✨ Giờ bạn có thể sử dụng Authentication đầy đủ!**
