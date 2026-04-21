import { Outlet, Navigate, useParams } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import Home from '../pages/Home'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import { gameNavigation } from './routes'

function PlaceholderPage({ title, subtitle, children }) {
  return (
    <div className="w-full">
      <div className="bg-[#15171c] border border-white/5 rounded-2xl p-6 shadow-xl w-full">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {subtitle ? <p className="mt-2 text-gray-400">{subtitle}</p> : null}
        <div className="mt-6 text-sm text-gray-500">{children}</div>
      </div>
    </div>
  )
}

// Component bảo vệ: Nếu gameId không tồn tại trong danh sách config thì redirect về 404 hoặc trang chính
function GameRouteGuard() {
  const { gameId } = useParams();
  const isValidGame = Object.keys(gameNavigation).includes(gameId);

  if (!isValidGame) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export const appRoutes = [ // Đổi tên từ publicRoutes thành appRoutes và gộp tất cả các route
  { // Route redirect từ gốc '/' đến trang chủ game mặc định (ví dụ: HI3)
    path: '/',
    element: <Navigate to="/hi3/home" replace />
  },
  {
    path: '/:gameId',
    element: <MainLayout />,
    children: [
      {
        element: <GameRouteGuard />, // Bọc tất cả con bằng Guard
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'login',
            element: <PlaceholderPage title="Login" subtitle="Đăng nhập user (placeholder)" />,
          },
          {
            path: 'register',
            element: <PlaceholderPage title="Register" subtitle="Đăng ký tài khoản (placeholder)" />,
          },
          {
            path: 'acc-marketplace',
            element: <PlaceholderPage title="Acc Marketplace" subtitle="Danh sách acc bán (placeholder)" />,
          },
          {
            path: 'acc/:id',
            element: <PlaceholderPage title="Acc Detail" subtitle="Chi tiết 1 acc (placeholder)" />,
          },
          {
            path: 'loot-map',
            element: <PlaceholderPage title="Loot Map" subtitle="Danh sách bài loot map (placeholder)" />,
          },
          {
            path: 'character-builds',
            element: <PlaceholderPage title="Character Builds" subtitle="Hướng dẫn build nhân vật (placeholder)" />,
          },
          {
            path: 'news',
            element: <PlaceholderPage title="News" subtitle="Tin tức Genshin (placeholder)" />,
          },
          {
            path: 'dashboard',
            element: <PlaceholderPage title="Dashboard" subtitle="Dashboard người dùng (placeholder)" />,
          },
          {
            path: 'profile',
            element: <PlaceholderPage title="User Profile" subtitle="Hồ sơ user (placeholder)" />,
          },
          {
            path: 'admin',
            element: <AdminDashboard />,
            children: [
              { path: 'builds', element: <PlaceholderPage title="Manage Builds" subtitle="Danh sách & Chỉnh sửa bài build" /> },
              { path: 'accounts', element: <PlaceholderPage title="Manage Accounts" subtitle="Quản lý kho acc" /> }
            ]
          },
        ]
      }
    ],
  },
]
