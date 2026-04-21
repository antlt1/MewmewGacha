# 🗺️ Entity Relationship Diagram (ERD) - MewmewGenshin

## 📊 Sơ đồ Quan Hệ Entities

```
┌─────────────────────┐
│      USERS          │
├─────────────────────┤
│ uid (PK)            │
│ email               │
│ username            │
│ position            │
│ price (ví tiền)     │
│ avatar              │
│ status              │
│ createdAt           │
│ updatedAt           │
│ isBanned            │
└─────────────────────┘
        │
        │ 1:M
        ├──────────────────────────────────┐
        │                                  │
        │                         ┌────────────────────────┐
        │                         │   ACC_GENSHIN          │
        │                         ├────────────────────────┤
        │                    (M)◄─┤ accId (PK)             │
        │                         │ usergs                 │
        │                         │ pass                   │
        │                         │ email                  │
        │                         │ useridpost (FK→Users)  │
        │                         │ price                  │
        │                         │ status                 │
        │                         │ level, server          │
        │                         │ buyerId (FK→Users)     │
        │                         │ timepost, soldAt       │
        │                         │ imgabout               │
        │                         │ rating                 │
        │                         │ verified               │
        │                         └────────────────────────┘
        │                                  │
        │                                  │ 1:M
        │                                  │
        │                         ┌────────────────────────┐
        │                         │    REVIEWS (for ACC)   │
        │                         ├────────────────────────┤
        │                         │ reviewId (PK)          │
        │                         │ userId (FK→Users)      │
        │                         │ accId (FK→AccGenshin)  │
        │                         │ rating                 │
        │                         │ comment                │
        │                         │ createdAt              │
        │                         │ helpful                │
        │                         └────────────────────────┘
        │
        │ 1:M
        │
        ├──────────────────────┬──────────────────────────┐
        │                      │                          │
┌──────────────────────┐  ┌─────────────────────────────┐
│   LOOT_MAP           │  │   TRANSACTIONS              │
├──────────────────────┤  ├─────────────────────────────┤
│ mapId (PK)           │  │ transactionId (PK)          │
│ userId (FK→Users)    │  │ userId (FK→Users)           │
│ title                │  │ type                        │
│ mapType              │  │ amount                      │
│ reward               │  │ accId (FK→AccGenshin)       │
│ price (tiền công)    │  │ mapId (FK→LootMap)          │
│ status               │  │ status                      │
│ image                │  │ paymentMethod               │
│ assignedTo           │◄─┤ reference                   │
│ (FK→Users,nullable)  │  │ userBalanceBefore/After     │
│ difficulty           │  │ createdAt, updatedAt        │
│ estimatedDuration    │  └─────────────────────────────┘
│ actualDuration       │           │
│ mapperRating         │           │ 1:M
│ createdAt, updatedAt │           │
│ completedAt          │           │
└──────────────────────┘           │
        │                          │
        │ 1:M                      │
        │                    ┌─────────────────────────────┐
        │                    │  REVIEWS (for Mapper)       │
        │                    ├─────────────────────────────┤
        │                    │ reviewId (PK)               │
        └───────────────────►│ userId (FK→Users-reviewer)  │
                             │ targetId (FK→Users-mapper)  │
                             │ rating                      │
                             │ comment                     │
                             │ createdAt                   │
                             │ helpful                     │
                             └─────────────────────────────┘


┌─────────────────────────────────────────────────────────┐
│      CHARACTER_BUILDS (Admin Content)                   │
├─────────────────────────────────────────────────────────┤
│ buildId (PK)                                            │
│ adminId (FK→Users, where position='admin')             │
│ characterName                                           │
│ characterIcon                                           │
│ title                                                   │
│ content                                                 │
│ weapons, artifacts, stats                               │
│ createdAt, updatedAt                                    │
│ views, rating                                           │
└─────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────┐
│      NEWS (Admin Content)                               │
├─────────────────────────────────────────────────────────┤
│ newsId (PK)                                             │
│ adminId (FK→Users, where position='admin')             │
│ title                                                   │
│ content                                                 │
│ image                                                   │
│ category                                                │
│ featured                                                │
│ createdAt, updatedAt, publishedAt                       │
│ views, status                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Mối Quan Hệ Chi Tiết

### 1. **Users → AccGenshin** (1:M)
- **Mô tả:** 1 User (Admin) có thể đăng bán nhiều Acc
- **FK:** `AccGenshin.useridpost` → `Users.uid`
- **Loại:** One-to-Many
- **Cascade:** Không nên xóa user, set useridpost to null

```javascript
// Get all acc of an admin
const adminAccs = db.collection('accGenshin')
  .where('useridpost', '==', adminId)
  .get();
```

---

### 2. **Users → AccGenshin (Buyer)** (1:M)
- **Mô tả:** 1 User (Buyer) có thể mua nhiều Acc
- **FK:** `AccGenshin.buyerId` → `Users.uid` (nullable)
- **Loại:** One-to-Many (Optional)
- **Điều kiện:** `status == 'sold'`

```javascript
// Get all acc purchased by user
const purchasedAccs = db.collection('accGenshin')
  .where('buyerId', '==', userId)
  .where('status', '==', 'sold')
  .get();
```

---

### 3. **Users → LootMap** (1:M)
- **Mô tả:** 1 User có thể đăng nhiều bài loot map
- **FK:** `LootMap.userId` → `Users.uid`
- **Loại:** One-to-Many
- **Cascade:** Nên soft-delete LootMap khi user bị xóa

```javascript
// Get all loot maps of user
const userLootMaps = db.collection('lootMap')
  .where('userId', '==', userId)
  .get();
```

---

### 4. **Users → LootMap (Mapper)** (1:M)
- **Mô tả:** 1 User (Mapper) có thể nhận nhiều công việc loot map
- **FK:** `LootMap.assignedTo` → `Users.uid` (nullable)
- **Loại:** One-to-Many (Optional)
- **Điều kiện:** `status == 'assigned' OR status == 'completed'`

```javascript
// Get all assigned loot maps for mapper
const mapperJobs = db.collection('lootMap')
  .where('assignedTo', '==', mapperId)
  .get();
```

---

### 5. **Users → Transactions** (1:M)
- **Mô tả:** 1 User có nhiều giao dịch
- **FK:** `Transactions.userId` → `Users.uid`
- **Loại:** One-to-Many
- **Điều kiện:** Lưu lịch sử mọi thao tác tài chính

```javascript
// Get user transaction history
const transactions = db.collection('transactions')
  .where('userId', '==', userId)
  .orderBy('createdAt', 'desc')
  .get();
```

---

### 6. **Users → Reviews** (1:M)
- **Mô tả:** 1 User có thể viết nhiều review
- **FK:** `Reviews.userId` → `Users.uid`
- **Loại:** One-to-Many

```javascript
// Get all reviews from user
const userReviews = db.collection('reviews')
  .where('userId', '==', userId)
  .get();
```

---

### 7. **AccGenshin → Reviews** (1:M)
- **Mô tả:** 1 Acc có nhiều review từ người mua
- **FK:** `Reviews.accId` → `AccGenshin.accId`
- **Loại:** One-to-Many
- **Điều kiện:** `targetType == 'acc'`

```javascript
// Get all reviews for an account
const accReviews = db.collection('reviews')
  .where('accId', '==', accId)
  .where('targetType', '==', 'acc')
  .get();
```

---

### 8. **AccGenshin → Transactions** (1:M)
- **Mô tả:** 1 Acc có thể được mua nhiều lần (không, acc chỉ bán 1 lần)
- **FK:** `Transactions.accId` → `AccGenshin.accId`
- **Loại:** One-to-One (thực tế)
- **Điều kiện:** `type == 'buy_acc'`

```javascript
// Get transaction for account purchase
const accTransaction = db.collection('transactions')
  .where('accId', '==', accId)
  .limit(1)
  .get();
```

---

### 9. **LootMap → Transactions** (1:M)
- **Mô tả:** 1 LootMap có thể có nhiều transaction (mapper được trả tiền)
- **FK:** `Transactions.mapId` → `LootMap.mapId`
- **Loại:** One-to-One (thực tế)
- **Điều kiện:** `type == 'earn_loot'`

```javascript
// Get payment for loot map completion
const mapPayment = db.collection('transactions')
  .where('mapId', '==', mapId)
  .where('type', '==', 'earn_loot')
  .get();
```

---

### 10. **Users → CharacterBuilds** (1:M)
- **Mô tả:** 1 Admin có thể viết nhiều character builds
- **FK:** `CharacterBuilds.adminId` → `Users.uid`
- **Loại:** One-to-Many
- **Điều kiện:** `Users.position == 'admin'`

```javascript
// Get all builds by admin
const adminBuilds = db.collection('characterBuilds')
  .where('adminId', '==', adminId)
  .get();
```

---

### 11. **Users → News** (1:M)
- **Mô tả:** 1 Admin có thể viết nhiều tin tức
- **FK:** `News.adminId` → `Users.uid`
- **Loại:** One-to-Many
- **Điều kiện:** `Users.position == 'admin'`

```javascript
// Get all news by admin
const adminNews = db.collection('news')
  .where('adminId', '==', adminId)
  .get();
```

---

## 🔄 Transaction Flow (Mua Acc)

```
┌─────────────────┐
│  User có tiền   │
└────────┬────────┘
         │ Mua Acc
         ▼
┌──────────────────────┐
│ Kiểm tra số dư       │
│ Users.price >= Acc.price
└────────┬─────────────┘
         │ OK
         ▼
┌──────────────────────────────────┐
│ Tạo Transaction                  │
│ - type: 'buy_acc'                │
│ - status: 'pending'              │
│ - userBalanceBefore              │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Cập nhật AccGenshin              │
│ - status: 'sold'                 │
│ - buyerId: userId                │
│ - buyerEmail, buyerPhone         │
│ - soldAt: now                    │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Cập nhật Users (Buyer)           │
│ - price -= Acc.price             │
│ - userBalanceAfter               │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Transaction                      │
│ - status: 'completed'            │
│ - updatedAt: now                 │
└──────────────────────────────────┘
```

---

## 🔄 Transaction Flow (Loot Map)

```
┌──────────────────────┐
│  User đăng bài loot  │
└────────┬─────────────┘
         │ Tạo LootMap
         ▼
┌──────────────────────────┐
│ LootMap.status: 'open'   │
│ - Gửi notification tới   │
│   tất cả mapper          │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Mapper nhấn "Nhận việc"  │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Cập nhật LootMap             │
│ - status: 'assigned'         │
│ - assignedTo: mapperId       │
│ - Gửi notification tới user  │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Mapper hoàn thành            │
│ LootMap.status: 'completed'  │
│ - actualDuration, rating     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Tạo Transaction              │
│ - type: 'earn_loot'          │
│ - amount: LootMap.price      │
│ - status: 'completed'        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Cập nhật Users (Mapper)      │
│ - price += LootMap.price     │
└──────────────────────────────┘
```

---

## 📊 Indexing Strategy

### Firestore Indexes (Cần tạo)

```
Collection: AccGenshin
Indexes:
  - status, createdAt (DESC)
  - server, price (ASC)
  - status, price (ASC)
  - useridpost, status

Collection: LootMap
Indexes:
  - status, mapType
  - userId, createdAt (DESC)
  - status, difficulty

Collection: Transactions
Indexes:
  - userId, createdAt (DESC)
  - type, status
  - userId, type, status

Collection: Reviews
Indexes:
  - targetId, targetType
  - userId, createdAt (DESC)
```

---

## 🛡️ Cascade Operations

### Delete User
```javascript
// Soft delete - không xóa cứng
await updateUser(userId, { 
  status: 'blocked',
  deletedAt: now
})

// Set all user's acc to suspended
await db.collection('accGenshin')
  .where('useridpost', '==', userId)
  .update({ status: 'suspended' })

// Keep transaction history for audit
```

### Delete AccGenshin
```javascript
// Chỉ có thể xóa nếu status !== 'sold'
// Nếu sold, phải giữ lại để có lịch sử

await db.collection('accGenshin')
  .doc(accId)
  .update({ status: 'deleted' })

// Xóa associated reviews
await db.collection('reviews')
  .where('accId', '==', accId)
  .delete()
```

---

## 🔍 Query Examples

### 1. Tìm acc sắp hết hàng (< 10 acc available)
```javascript
const lowStockAccs = await db.collection('accGenshin')
  .where('status', '==', 'available')
  .orderBy('createdAt')
  .limit(10)
  .get();
```

### 2. Tính doanh thu hôm nay
```javascript
const today = new Date();
today.setHours(0, 0, 0, 0);

const todayRevenue = await db.collection('transactions')
  .where('type', '==', 'buy_acc')
  .where('status', '==', 'completed')
  .where('createdAt', '>=', today)
  .get();
  
const total = docs.reduce((sum, doc) => sum + doc.amount, 0);
```

### 3. Top mapper (dựa trên rating)
```javascript
const topMappers = await db.collection('reviews')
  .where('targetType', '==', 'mapper')
  .orderBy('rating', 'desc')
  .limit(10)
  .get();
```

---

**Last Updated: 2024**
