import type { ReactNode } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import { gameNavigation } from './routes';

type PlaceholderPageProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

function PlaceholderPage({ title, subtitle, children }: PlaceholderPageProps) {
  return (
    <div className="w-full">
      <div className="bg-[#15171c] border border-white/5 rounded-2xl p-6 shadow-xl w-full">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {subtitle ? <p className="mt-2 text-gray-400">{subtitle}</p> : null}
        <div className="mt-6 text-sm text-gray-500">{children}</div>
      </div>
    </div>
  );
}

function GameRouteGuard() {
  const { gameId } = useParams<{ gameId: string }>();
  const isValidGame = gameId ? Object.keys(gameNavigation).includes(gameId) : false;

  if (!isValidGame) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export type AppRouteItem = {
  path?: string;
  element?: ReactNode;
  children?: AppRouteItem[];
  index?: boolean;
};

export const appRoutes: AppRouteItem[] = [
  { path: '/', element: <Navigate to="/hi3/home" replace /> },
  {
    path: '/:gameId',
    element: <MainLayout />,
    children: [
      {
        element: <GameRouteGuard />,
        children: [
          { path: 'home', element: <Home /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          {
            element: <ProtectedRoute />,
            children: [
              { path: 'acc-marketplace', element: <PlaceholderPage title="Acc Marketplace" subtitle="Danh sach acc ban (placeholder)" /> },
              { path: 'acc/:id', element: <PlaceholderPage title="Acc Detail" subtitle="Chi tiet 1 acc (placeholder)" /> },
              { path: 'loot-map', element: <PlaceholderPage title="Loot Map" subtitle="Danh sach bai loot map (placeholder)" /> },
              { path: 'character-builds', element: <PlaceholderPage title="Character Builds" subtitle="Huong dan build nhan vat (placeholder)" /> },
              { path: 'news', element: <PlaceholderPage title="News" subtitle="Tin tuc Genshin (placeholder)" /> },
              { path: 'dashboard', element: <PlaceholderPage title="Dashboard" subtitle="Dashboard nguoi dung (placeholder)" /> },
              { path: 'profile', element: <PlaceholderPage title="User Profile" subtitle="Ho so user (placeholder)" /> },
              {
                element: <ProtectedRoute requiredRole="admin" />,
                children: [
                  { path: 'admin', element: <PlaceholderPage title="Admin Dashboard" subtitle="Quan ly toan bo (placeholder)" /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
