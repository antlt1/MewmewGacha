import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'user' | 'loot_mapper';
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark/5">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
          <p className="text-dark/80">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/hi3/login" replace />;
  }

  if (requiredRole && user?.position !== requiredRole) {
    return <Navigate to="/hi3/home" replace />;
  }

  return <Outlet />;
}
