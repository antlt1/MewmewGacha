# 📋 Database Columns Specification - MewmewGenshin

## 🗂️ Collection: Users

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| uid | string | ✅ | Firebase Auth UID | `a1b2c3d4e5f6` |
| email | string | ✅ | Email đăng nhập | `user@gmail.com` |
| username | string | ✅ | Tên hiển thị | `MewPlayer123` |
| password | string | ✅ | Hash password (Firebase Auth) | - |
| position | enum | ✅ | Vị trí user [admin, user, loot_mapper] | `user` |
| price | number | ✅ | Số tiền trong ví (VND) | `500000` |
| avatar | string | ❌ | URL ảnh đại diện | `https://...` |
| phone | string | ❌ | Số điện thoại | `0987654321` |
| address | string | ❌ | Địa chỉ | `123 Đường ABC` |
| status | enum | ✅ | Trạng thái [active, blocked, suspended] | `active` |
| createdAt | timestamp | ✅ | Thời điểm tạo | `2024-01-15 10:30:00` |
| updatedAt | timestamp | ✅ | Lần cập nhật cuối | `2024-01-20 14:45:00` |
| lastLogin | timestamp | ❌ | Lần đăng nhập cuối | `2024-01-20 09:30:00` |
| totalPurchase | number | ❌ | Tổng số acc đã mua | `5` |
| totalDeposit | number | ❌ | Tổng tiền nạp | `2000000` |
| isBanned | boolean | ✅ | Bị ban không | `false` |
| banReason | string | ❌ | Lý do bị ban | `Lừa đảo` |

---

## 🎮 Collection: AccGenshin

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| accId | string | ✅ | ID acc duy nhất | `acc_1a2b3c4d` |
| usergs | string | ✅ | Username Genshin | `MewMewPlayer` |
| pass | string | ✅ | Password (encrypted) | `encrypted_pass_123` |
| email | string | ✅ | Email tài khoản | `acc@genshin.com` |
| useridpost | string | ✅ | ID admin đăng bán | `admin_uid_123` |
| timepost | timestamp | ✅ | Thời gian đăng bán | `2024-01-15 10:30:00` |
| price | number | ✅ | Giá bán (VND) | `2500000` |
| status | enum | ✅ | [available, sold, suspended] | `available` |
| showhide | boolean | ✅ | Hiển thị công khai | `true` |
| imgabout | array | ✅ | Mảng URL ảnh | `["url1", "url2"]` |
| level | number | ✅ | Level acc Genshin | `55` |
| server | enum | ✅ | Server [NA, EU, AS, CN] | `AS` |
| characters | array | ✅ | Danh sách nhân vật | `["Nahida", "Xingqiu"]` |
| description | string | ❌ | Mô tả chi tiết | `Acc 5 star, AR57...` |
| buyerId | string | ❌ | ID người mua | `user_uid_456` |
| buyerEmail | string | ❌ | Email người mua | `buyer@gmail.com` |
| buyerPhone | string | ❌ | SĐT người mua | `0912345678` |
| soldAt | timestamp | ❌ | Thời gian bán | `2024-01-18 15:20:00` |
| views | number | ✅ | Lượt xem | `150` |
| rating | number | ❌ | Đánh giá (1-5) | `4.5` |
| verified | boolean | ✅ | Đã xác minh | `true` |

---

## 🗺️ Collection: LootMap

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| mapId | string | ✅ | ID bài đăng duy nhất | `loot_1a2b3c4d` |
| userId | string | ✅ | ID người đăng yêu cầu | `user_uid_123` |
| title | string | ✅ | Tiêu đề bài đăng | `Farm Crimson Wish` |
| description | string | ✅ | Mô tả chi tiết | `Cần người giúp farm...` |
| mapType | enum | ✅ | Loại map [Domain, Abyss, WorldBoss, Farming] | `Farming` |
| reward | string | ✅ | Phần thưởng trong game | `Crimson Wishes x20` |
| price | number | ✅ | Tiền công (VND) | `100000` |
| status | enum | ✅ | [open, assigned, completed, cancelled] | `open` |
| image | string | ❌ | URL ảnh minh họa | `https://...` |
| assignedTo | string | ❌ | ID mapper nhận việc | `mapper_uid_789` |
| estimatedDuration | number | ✅ | Thời gian dự kiến (phút) | `30` |
| difficulty | enum | ✅ | Độ khó [easy, medium, hard] | `medium` |
| createdAt | timestamp | ✅ | Thời điểm tạo | `2024-01-15 10:30:00` |
| updatedAt | timestamp | ✅ | Lần cập nhật | `2024-01-15 14:45:00` |
| completedAt | timestamp | ❌ | Thời điểm hoàn thành | `2024-01-15 11:00:00` |
| views | number | ✅ | Lượt xem | `45` |
| actualDuration | number | ❌ | Thời gian thực tế (phút) | `28` |
| mapperRating | number | ❌ | Đánh giá mapper (1-5) | `5` |

---

## 💳 Collection: Transactions

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| transactionId | string | ✅ | ID giao dịch duy nhất | `txn_1a2b3c4d` |
| userId | string | ✅ | ID user thực hiện | `user_uid_123` |
| type | enum | ✅ | Loại [buy_acc, deposit, withdraw, earn_loot] | `buy_acc` |
| amount | number | ✅ | Số tiền (VND) | `2500000` |
| accId | string | ❌ | ID acc nếu mua acc | `acc_5f6g7h8i` |
| mapId | string | ❌ | ID loot map nếu là earn | `loot_9j0k1l2m` |
| status | enum | ✅ | [pending, completed, failed, cancelled] | `completed` |
| paymentMethod | string | ❌ | Phương thức thanh toán [bank, momo, zalopay, card] | `bank` |
| paymentGateway | string | ❌ | Cổng thanh toán | `VNPay` |
| reference | string | ❌ | Mã tham chiếu từ gateway | `VNP_TXN_123456` |
| description | string | ❌ | Mô tả giao dịch | `Mua acc Genshin` |
| createdAt | timestamp | ✅ | Thời điểm tạo | `2024-01-15 10:30:00` |
| updatedAt | timestamp | ✅ | Lần cập nhật | `2024-01-15 10:35:00` |
| userBalanceBefore | number | ✅ | Số dư trước giao dịch | `3000000` |
| userBalanceAfter | number | ✅ | Số dư sau giao dịch | `500000` |
| receiptUrl | string | ❌ | URL hóa đơn/chứng từ | `https://...` |

---

## 📚 Collection: CharacterBuilds

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| buildId | string | ✅ | ID build duy nhất | `build_1a2b3c4d` |
| adminId | string | ✅ | ID admin tạo bài | `admin_uid_123` |
| characterName | string | ✅ | Tên nhân vật | `Nahida` |
| characterIcon | string | ✅ | URL icon nhân vật | `https://...` |
| characterElement | enum | ✅ | Nguyên tố [Pyro, Hydro, Electro...] | `Dendro` |
| title | string | ✅ | Tiêu đề bài build | `DPS Nahida Dendro` |
| content | string | ✅ | Nội dung HTML/Markdown | `<h2>Weapon...</h2>` |
| weapons | array | ✅ | Danh sách vũ khí recommend | `["Kagura", "Lost Prayer"]` |
| artifacts | array | ✅ | Danh sách artifact set | `["Emblem of Severed Fate", "Tenacity"]` |
| stats | object | ✅ | Chỉ số tối ưu | `{ATK: 2000, Crit: 70, CritDMG: 150}` |
| mainDPS | string | ✅ | Nguồn DPS chính | `Dendro Reaction` |
| supportCharacters | array | ❌ | Nhân vật support tốt | `["Fischl", "Kazuha"]` |
| createdAt | timestamp | ✅ | Thời điểm tạo | `2024-01-15 10:30:00` |
| updatedAt | timestamp | ✅ | Lần cập nhật | `2024-01-20 14:45:00` |
| views | number | ✅ | Lượt xem | `5420` |
| rating | number | ❌ | Đánh giá (1-5) | `4.8` |
| difficulty | enum | ✅ | Độ khó [Beginner, Intermediate, Advanced] | `Intermediate` |
| cost | enum | ✅ | Chi phí [F2P, Low, Medium, High] | `Medium` |
| version | string | ❌ | Phiên bản game | `4.5` |

---

## 📰 Collection: News

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| newsId | string | ✅ | ID tin tức duy nhất | `news_1a2b3c4d` |
| adminId | string | ✅ | ID admin tạo | `admin_uid_123` |
| title | string | ✅ | Tiêu đề tin | `Genshin 4.5 Update` |
| content | string | ✅ | Nội dung HTML/Markdown | `<p>Phiên bản mới...</p>` |
| image | string | ✅ | URL ảnh đại diện | `https://...` |
| category | enum | ✅ | Danh mục [Update, Event, Guide, Maintenance] | `Update` |
| summary | string | ❌ | Tóm tắt ngắn | `Phát hành phiên bản 4.5...` |
| featured | boolean | ✅ | Tin nổi bật | `true` |
| createdAt | timestamp | ✅ | Thời điểm tạo | `2024-01-15 10:30:00` |
| updatedAt | timestamp | ✅ | Lần cập nhật | `2024-01-20 14:45:00` |
| publishedAt | timestamp | ❌ | Thời điểm công bố | `2024-01-15 08:00:00` |
| views | number | ✅ | Lượt xem | `12500` |
| tags | array | ❌ | Tags tin tức | `["Update", "Nahida", "Dendro"]` |
| status | enum | ✅ | [draft, published, archived] | `published` |

---

## ⭐ Collection: Reviews

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| reviewId | string | ✅ | ID review duy nhất | `review_1a2b3c4d` |
| userId | string | ✅ | ID người đánh giá | `user_uid_123` |
| targetId | string | ✅ | ID mục tiêu (acc/mapper) | `acc_5f6g7h8i` |
| targetType | enum | ✅ | Loại [acc, mapper] | `acc` |
| rating | number | ✅ | Điểm (1-5) | `5` |
| comment | string | ❌ | Bình luận | `Tài khoản rất tốt, đáng mua!` |
| verifiedPurchase | boolean | ✅ | Đã xác minh mua | `true` |
| createdAt | timestamp | ✅ | Thời điểm tạo | `2024-01-18 16:30:00` |
| updatedAt | timestamp | ✅ | Lần cập nhật | `2024-01-19 10:00:00` |
| helpful | number | ✅ | Số lượt useful | `12` |
| reported | boolean | ✅ | Bị report | `false` |
| reportReason | string | ❌ | Lý do report | `Bình luận spam` |

---

## 📊 Collection: System Settings (Optional)

| Column | Type | Required | Description | Example |
|--------|------|----------|-------------|---------|
| key | string | ✅ | Khóa cài đặt | `commission_rate` |
| value | any | ✅ | Giá trị | `0.1` |
| description | string | ❌ | Mô tả | `Tỷ lệ hoa hồng` |
| updatedAt | timestamp | ✅ | Lần cập nhật | `2024-01-15 10:30:00` |
| updatedBy | string | ✅ | ID admin cập nhật | `admin_uid_123` |

---

## 🔑 Key Relationships & Indexes

### Important Relationships:
```
Users (1) -----> (M) Transactions
         -----> (M) AccGenshin (as buyer)
         -----> (M) Reviews
         -----> (M) LootMap (as creator)
         
AccGenshin (1) ----> (M) Reviews
           -----> (1) Users (as buyer)
           -----> (1) Users (as seller)

LootMap (1) ------> (1) Users (creator)
        ------> (1) Users (mapper - assignedTo)
        ------> (M) Reviews

Transactions (1) ---> (1) AccGenshin (nullable)
             ----> (1) LootMap (nullable)
```

### Recommended Indexes:
```
AccGenshin: status, server, createdAt
LootMap: status, userId, mapType, createdAt
Transactions: userId, type, status, createdAt
Reviews: targetId, targetType, rating, createdAt
Users: position, status, createdAt
```

---

## 📏 Data Validation Rules

| Field | Validation |
|-------|-----------|
| email | Valid email format |
| price/amount | >= 0, max 1,000,000,000 |
| rating | 1-5 (integer) |
| level | 1-90 (for Genshin) |
| difficulty | Must be in enum |
| status | Must be in enum |
| username | 3-50 characters, alphanumeric + underscore |
| password | Min 8 characters, hash required |

---

**Last Updated: 2024**
