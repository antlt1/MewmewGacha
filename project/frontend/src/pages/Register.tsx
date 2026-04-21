import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, User, Loader, UserCheck } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Register() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [position, setPosition] = useState<'user' | 'loot_mapper'>('user');
  const [localError, setLocalError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validateForm = (): boolean => {
    if (!email || !username || !password || !confirmPassword) {
      setLocalError('Vui lòng nhập đầy đủ thông tin');
      return false;
    }

    if (username.length < 3 || username.length > 50) {
      setLocalError('Tên người dùng phải từ 3 đến 50 ký tự');
      return false;
    }

    if (password.length < 8) {
      setLocalError('Mật khẩu phải ít nhất 8 ký tự');
      return false;
    }

    if (password !== confirmPassword) {
      setLocalError('Mật khẩu không khớp');
      return false;
    }

    if (!agreeTerms) {
      setLocalError('Vui lòng chấp nhận điều khoản sử dụng');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await register(email, password, username, position);
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate(`/${gameId}/login`);
    } catch (err: any) {
      const errorMessage = err.message || 'Đăng ký thất bại';
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
            <h1 className="text-3xl font-bold text-dark">Đăng Ký</h1>
            <p className="mt-2 text-sm text-dark/60">Tạo tài khoản MewmewGenshin của bạn</p>
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

            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-dark">
                Tên Người Dùng
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-5 w-5 text-dark/40" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="mewplayer123"
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

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-dark">
                Xác Nhận Mật Khẩu
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-dark/40" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-dark/10 bg-dark/2 py-2 pl-10 pr-4 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-dark">Loại Tài Khoản</label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center rounded-lg border border-dark/10 p-3 cursor-pointer hover:bg-dark/2">
                  <input
                    type="radio"
                    name="position"
                    value="user"
                    checked={position === 'user'}
                    onChange={(e) => setPosition(e.target.value as 'user' | 'loot_mapper')}
                    disabled={isLoading}
                    className="h-4 w-4"
                  />
                  <span className="ml-3 text-sm">
                    <span className="font-medium text-dark">Người Dùng</span>
                    <span className="block text-xs text-dark/60">Mua/bán tài khoản, nạp tiền</span>
                  </span>
                </label>

                <label className="flex items-center rounded-lg border border-dark/10 p-3 cursor-pointer hover:bg-dark/2">
                  <input
                    type="radio"
                    name="position"
                    value="loot_mapper"
                    checked={position === 'loot_mapper'}
                    onChange={(e) => setPosition(e.target.value as 'user' | 'loot_mapper')}
                    disabled={isLoading}
                    className="h-4 w-4"
                  />
                  <span className="ml-3 text-sm">
                    <span className="font-medium text-dark">Loot Mapper</span>
                    <span className="block text-xs text-dark/60">Nhận việc chơi game, kiếm tiền</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-2">
              <input
                id="agree"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                disabled={isLoading}
                className="mt-1 h-4 w-4 rounded border-dark/20"
              />
              <label htmlFor="agree" className="text-xs text-dark/60">
                Tôi đồng ý với{' '}
                <a href="#" className="text-primary hover:underline">
                  Điều khoản sử dụng
                </a>{' '}
                và{' '}
                <a href="#" className="text-primary hover:underline">
                  Chính sách riêng tư
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary py-2.5 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader className="h-4 w-4 animate-spin" />}
              {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm">
            <span className="text-dark/60">
              Đã có tài khoản?{' '}
              <a href={`/${gameId}/login`} className="text-primary hover:underline">
                Đăng nhập tại đây
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
