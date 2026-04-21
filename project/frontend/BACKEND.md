# 🔧 Backend Documentation - MewmewGenshin

## 📌 Overview
Backend được xây dựng với **Firebase Firestore** để quản lý dữ liệu, **Firebase Auth** để xác thực, và **Firebase Storage** để lưu trữ hình ảnh.

---

## 🔐 Firebase Setup

### 1. Tạo Firebase Project
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login Firebase account
firebase login

# Initialize project
firebase init
```

### 2. Firebase Configuration (`firebase-config.js`)
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

## 📊 Firestore Collections & Structure

### 1. **Users Collection**
```
/users/{userId}
├── email: string
├── username: string
├── password: string (hashed)
├── position: enum ['admin', 'user', 'loot_mapper']
├── price: number (tiền trong ví)
├── avatar: string (URL)
├── createdAt: timestamp
├── updatedAt: timestamp
├── status: enum ['active', 'blocked']
├── phone: string
└── address: string
```

### 2. **AccGenshin Collection** (Tài khoản bán)
```
/accGenshin/{accId}
├── usergs: string
├── pass: string
├── email: string
├── useridpost: string (adminId - người đăng)
├── timepost: timestamp
├── price: number
├── status: enum ['available', 'sold', 'suspended']
├── showhide: boolean
├── imgabout: array of strings (URLs)
├── level: number
├── server: string (NA, EU, AS, CN)
├── characters: array
├── buyerId: string (nullable)
├── buyerEmail: string (nullable)
├── buyerPhone: string (nullable)
├── soldAt: timestamp (nullable)
└── description: string
```

### 3. **LootMap Collection** (Bài đăng thuê)
```
/lootMap/{mapId}
├── userId: string (người đăng)
├── title: string
├── description: string
├── mapType: string (e.g., 'Domain', 'Abyss', 'World Boss')
├── reward: string
├── price: number (tiền công)
├── status: enum ['open', 'assigned', 'completed', 'cancelled']
├── createdAt: timestamp
├── updatedAt: timestamp
├── image: string (URL)
├── assignedTo: string (nullable - mapper nhận việc)
├── estimatedDuration: number (phút)
├── difficulty: enum ['easy', 'medium', 'hard']
└── completedAt: timestamp (nullable)
```

### 4. **Transactions Collection** (Lịch sử giao dịch)
```
/transactions/{transactionId}
├── userId: string (người mua)
├── type: enum ['buy_acc', 'deposit', 'withdraw']
├── amount: number
├── accId: string (nullable - nếu mua acc)
├── status: enum ['pending', 'completed', 'failed']
├── createdAt: timestamp
├── updatedAt: timestamp
├── paymentMethod: string
├── description: string
└── reference: string (transaction ID từ payment gateway)
```

### 5. **CharacterBuilds Collection** (Bài hướng dẫn)
```
/characterBuilds/{buildId}
├── adminId: string
├── characterName: string
├── characterIcon: string (URL)
├── title: string
├── content: string (HTML/Markdown)
├── weapons: array (recommended weapons)
├── artifacts: array (recommended artifacts)
├── stats: object (ATK, CRIT, etc.)
├── createdAt: timestamp
├── updatedAt: timestamp
├── rating: number (0-5)
└── views: number
```

### 6. **News Collection** (Tin tức)
```
/news/{newsId}
├── adminId: string
├── title: string
├── content: string (HTML/Markdown)
├── image: string (URL)
├── category: string
├── createdAt: timestamp
├── updatedAt: timestamp
├── views: number
└── featured: boolean
```

### 7. **Reviews Collection** (Đánh giá)
```
/reviews/{reviewId}
├── userId: string (người đánh giá)
├── targetId: string (accId hoặc mapperId)
├── type: enum ['acc', 'mapper']
├── rating: number (1-5)
├── comment: string
├── createdAt: timestamp
└── helpful: number (votes)
```

---

## 🔒 Firestore Security Rules (`firestore.rules`)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users - chỉ owner hoặc admin có thể đọc/sửa
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId || isAdmin();
      allow create: if request.auth != null;
    }

    // AccGenshin - ai cũng có thể đọc, admin/owner có thể sửa
    match /accGenshin/{accId} {
      allow read: if true;
      allow create, update, delete: if request.auth.uid == resource.data.useridpost || isAdmin();
    }

    // LootMap - ai cũng có thể đọc
    match /lootMap/{mapId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId || isAdmin();
    }

    // Transactions - chỉ owner có thể xem
    match /transactions/{transactionId} {
      allow read: if request.auth.uid == resource.data.userId || isAdmin();
      allow create: if request.auth != null;
      allow delete: if isAdmin();
    }

    // CharacterBuilds - ai cũng có thể đọc, admin có thể sửa
    match /characterBuilds/{buildId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // News - ai cũng có thể đọc, admin có thể sửa
    match /news/{newsId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Reviews - ai cũng có thể đọc, owner có thể tạo/sửa
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }

    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.position == 'admin';
    }
  }
}
```

---

## 🖼️ Storage Rules (`storage.rules`)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Acc images
    match /acc-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && isOwnerOrAdmin();
    }

    // User avatars
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }

    // News images
    match /news-images/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Loot map images
    match /lootmap-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    function isAdmin() {
      let userDoc = firestore.get(/databases/(default)/documents/users/$(request.auth.uid));
      return userDoc.data.position == 'admin';
    }

    function isOwnerOrAdmin() {
      let userDoc = firestore.get(/databases/(default)/documents/users/$(request.auth.uid));
      return request.auth.uid == resource.metadata.owner || userDoc.data.position == 'admin';
    }
  }
}
```

---

## 🌐 API Endpoints (Cloud Functions)

### Authentication
```
POST   /api/auth/register      - Đăng ký user
POST   /api/auth/login         - Đăng nhập
POST   /api/auth/logout        - Đăng xuất
POST   /api/auth/refresh       - Làm mới token
GET    /api/auth/me            - Lấy thông tin user hiện tại
```

### User Management
```
GET    /api/users/:id          - Lấy thông tin user
PUT    /api/users/:id          - Cập nhật user
POST   /api/users/:id/deposit  - Nạp tiền
GET    /api/users/:id/balance  - Xem số dư
```

### Account Sales
```
GET    /api/acc                - Danh sách acc (có filter)
GET    /api/acc/:id            - Chi tiết acc
POST   /api/acc                - Tạo acc (admin only)
PUT    /api/acc/:id            - Cập nhật acc (admin/owner)
DELETE /api/acc/:id            - Xóa acc (admin only)
POST   /api/acc/:id/purchase   - Mua acc
```

### Loot Map
```
GET    /api/lootmap            - Danh sách loot map
GET    /api/lootmap/:id        - Chi tiết loot map
POST   /api/lootmap            - Tạo bài đăng loot map
PUT    /api/lootmap/:id        - Cập nhật bài loot map
DELETE /api/lootmap/:id        - Xóa bài loot map
POST   /api/lootmap/:id/accept - Mapper nhận việc
POST   /api/lootmap/:id/complete - Hoàn thành
```

### Character Builds
```
GET    /api/builds             - Danh sách build
GET    /api/builds/:id         - Chi tiết build
POST   /api/builds             - Tạo build (admin only)
PUT    /api/builds/:id         - Cập nhật build (admin only)
DELETE /api/builds/:id         - Xóa build (admin only)
```

### News
```
GET    /api/news               - Danh sách tin tức
GET    /api/news/:id           - Chi tiết tin tức
POST   /api/news               - Tạo tin (admin only)
PUT    /api/news/:id           - Cập nhật tin (admin only)
DELETE /api/news/:id           - Xóa tin (admin only)
```

### Transactions
```
GET    /api/transactions       - Lịch sử giao dịch user
GET    /api/transactions/:id   - Chi tiết giao dịch
POST   /api/transactions       - Tạo giao dịch
```

### Reviews
```
GET    /api/reviews/:targetId  - Danh sách review
POST   /api/reviews            - Tạo review
PUT    /api/reviews/:id        - Cập nhật review
DELETE /api/reviews/:id        - Xóa review
```

---

## 📦 Firebase Functions Example

### `functions/createUser.js`
```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User not authenticated');
  }

  const { email, username, position } = data;

  try {
    await admin.firestore().collection('users').doc(context.auth.uid).set({
      email,
      username,
      position: position || 'user',
      price: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'active',
    });

    return { success: true, message: 'User created' };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
```

---

## 🚀 Deploy Backend

```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage

# Deploy Functions
firebase deploy --only functions
```

---

## 🔗 Environment Variables (`.env`)
```
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_PROJECT_ID=xxx
FIREBASE_STORAGE_BUCKET=xxx
FIREBASE_MESSAGING_SENDER_ID=xxx
FIREBASE_APP_ID=xxx
PAYMENT_GATEWAY_KEY=xxx
PAYMENT_GATEWAY_SECRET=xxx
```

---

## 📝 Best Practices

✅ **Do's:**
- Validate dữ liệu trước khi lưu
- Sử dụng transactions cho các thao tác phức tạp
- Index Firestore collections cho tìm kiếm hiệu quả
- Backup dữ liệu định kỳ

❌ **Don'ts:**
- Không lưu sensitive data ở Firestore
- Không để mở rộng kích thước document quá lớn
- Không query trực tiếp từ client mà không security rules

---

**Happy Coding! 🔧✨**
