# 📝 MewmewGenshin Development Progress Log

File này dùng để ghi lại các bước đã thực hiện, các vấn đề tồn đọng và kế hoạch tiếp theo giữa Developer và Gemini Code Assist.

---

## 🟢 1. Trạng thái Hiện tại (Analysis Phase)
- [x] **Phân tích Tài liệu**: Đã đọc và hiểu cấu trúc `README.md`, `BACKEND.md`, `FRONTEND.md`, `ERD.md`.
- [x] **Thiết kế Database**: Đã chốt cấu trúc Firestore (Users, AccGenshin, LootMap, Transactions, v.v.).
- [x] **Kiến trúc Frontend**: Đã chốt Stack (React + Vite + Tailwind + Zustand).
- [x] **Luồng nghiệp vụ**: Đã xác định luồng Transaction mua Acc và luồng Loot Map Service.
- [x] **Kiến trúc Router**: Chốt phương án Dynamic Mapping dựa trên `gameId` cho Navbar và Routing.

---

## 🟡 2. Các công việc đang thực hiện (In Progress)
- [x] Khởi tạo Project Frontend (Vite) và cấu hình Tailwind.
- [x] Xây dựng file `src/router/index.tsx` và `App.tsx` với cấu trúc nested routes.
- [x] Xây dựng Logic Game Guard để bảo vệ route khi gameId sai.
- [x] Xây dựng component Sidebar và Navbar động theo `gameId`.
- [x] Tạo bản sao tách riêng `frontend/src-ts` và chuyển đổi toàn bộ `src` sang TypeScript (`.ts/.tsx`) để chuẩn bị mở rộng dự án lớn.
- [x] **Firebase Authentication Setup**: Tạo firebaseConfig, firebase auth services, Zustand auth store
- [x] **Login & Register Pages**: Tạo UI đầy đủ với validation, error handling, loading states
- [x] **Protected Routes**: Tạo ProtectedRoute component để bảo vệ routes, hỗ trợ role-based access (admin)

---

## 🔴 3. Các đầu việc tiếp theo (Upcoming Tasks)
### Phase 1: Core Features
- [x] **Authentication**: Login/Register với Firebase Auth + Lưu thông tin user vào Firestore.
- [ ] **User Profile**: Hiển thị thông tin user, chỉnh sửa profile
- [ ] **Acc Marketplace**: Trang danh sách tài khoản, bộ lọc (Server, Price, Level).
- [ ] **Purchase Flow**: Implement Cloud Functions/Transactions để xử lý mua acc an toàn.

### Phase 2: Services & Admin
- [ ] **Loot Map**: Form đăng bài thuê và Dashboard cho Mapper.
- [ ] **Admin Panel**: Dashboard quản lý Acc, duyệt bài, thống kê doanh thu.

### Phase 3: Additional Features
- [ ] **Payment Gateway**: Tích hợp VNPay / Momo
- [ ] **Real-time Notifications**: WebSocket / Firebase Realtime
- [ ] **Image Upload**: Firebase Storage integration

---

## 🧠 4. Ghi chú Kỹ thuật quan trọng
> *Lưu ý từ Gemini Code Assist:*
1. **Security**: Cần đảm bảo `firestore.rules` kiểm tra đúng quyền `isAdmin` trước khi cho phép chỉnh sửa bộ sưu tập `accGenshin`.
2. **Real-time**: Số dư ví của User (`users.price`) nên được đồng bộ realtime ở Frontend qua Zustand listener.
3. **Nested Routing**: Việc sử dụng `/:gameId` giúp mở rộng dự án sau này, cần chú ý quản lý `activeGame` state toàn cục.

---

## 📅 Nhật ký cập nhật

| Ngày | Người cập nhật | Nội dung |
| :--- | :--- | :--- |
| 21/04/2026 | Gemini | Khởi tạo Progress Log dựa trên phân tích tài liệu ban đầu. |
| 21/04/2026 | Gemini | Thống nhất kiến trúc Dynamic Router cho đa nền tảng game. |
| 21/04/2026 | Gemini | Gộp các route public, private, admin vào `appRoutes` và lồng ghép vào `/:gameId` trong `index.tsx`. |
| 21/04/2026 | Gemini | Thêm GameGuard logic để xử lý trường hợp gameId không hợp lệ (ví dụ: hi3333). |
| 21/04/2026 | Gemini | Cập nhật Sidebar động, tự động thay đổi Menu Item dựa theo config của từng game. |
| 21/04/2026 | Gemini | Tối ưu hóa Icon management bằng cách đưa Lucide components vào trực tiếp `gameNavigation` config. |
| 21/04/2026 | Codex | Đọc `project/frontend/src`, copy sang `project/frontend/src-ts`, đổi toàn bộ file chính sang `.ts/.tsx` và cập nhật import/type cơ bản cho lộ trình TypeScript. |
| 21/04/2026 | Codex | Chuyển runtime chính sang `src/*.ts(x)`, cập nhật `index.html` trỏ `main.tsx`, thêm `tsconfig.json`, mở rộng ESLint cho TS và xóa toàn bộ `.jsx/.js` trong `src`. |
| 21/04/2026 | AI Copilot | **Hoàn tất Firebase Authentication**: Tạo firebaseConfig.ts, firebase.ts (auth functions), Zustand authStore.ts, ProtectedRoute component. |
| 21/04/2026 | AI Copilot | **Tạo Login & Register Pages**: UI đầy đủ, form validation, error handling, loading states, role selection. |
| 21/04/2026 | AI Copilot | **Cập nhật Router & App**: Thêm ToastContainer, Auth listener initialization, Protected Routes structure.

---
*Hãy cập nhật file này sau mỗi buổi làm việc để chúng ta luôn "cùng tần số"!* 🚀