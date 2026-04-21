import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, Loader } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Login() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!email || !password) {
      setLocalError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      await login(email, password);
      toast.success('Đăng nhập thành công!');
      navigate(`/${gameId}/home`);
    } catch (err: any) {
      const errorMessage = err.message || 'Đăng nhập thất bại';
      setLocalError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-dark/5 to-primary/5 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-dark/10 bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-dark">Đăng Nhập</h1>
            <p className="mt-2 text-sm text-dark/60">Chào mừng bạn quay lại MewmewGenshin</p>
          </div>

          {/* Error Message */}
          {(localError || error) && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700">{localError || error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark">
                Email
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-dark/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full rounded-lg border border-dark/10 bg-dark/2 py-2 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-dark">
                Mật Khẩu
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-dark/40" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-dark/10 bg-dark/2 py-2 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary py-2.5 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader className="h-4 w-4 animate-spin" />}
              {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <a href="#" className="text-primary hover:underline">
              Quên mật khẩu?
            </a>
            <span className="text-dark/60">
              Chưa có tài khoản?{' '}
              <a href={`/${gameId}/register`} className="text-primary hover:underline">
                Đăng ký ngay
              </a>
            </span>
          </div>

          {/* Test Credentials */}
          <div className="mt-6 rounded-lg bg-blue-50 p-4 text-xs text-blue-700">
            <p className="font-semibold">🧪 Test Credentials:</p>
            <p className="mt-1 font-mono">Email: test@example.com</p>
            <p className="font-mono">Password: test123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
