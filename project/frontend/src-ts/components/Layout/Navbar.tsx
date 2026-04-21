import { Link, useLocation, useParams } from 'react-router-dom';
import { gameNavigation } from '../../router/routes';

export default function Navbar() {
  const { gameId } = useParams<{ gameId: string }>();
  const location = useLocation();
  const currentNav = (gameId && gameNavigation[gameId]) || [];

  return (
    <nav className="bg-[#1a1c23] border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to={`/${gameId}/home`} className="text-xl font-bold text-white tracking-wider">
              MEW<span className="text-indigo-500">MEW</span>
              <span className="ml-1 text-xs uppercase opacity-50">{gameId}</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {currentNav.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to={`/${gameId}/login`} className="text-sm text-gray-400 hover:text-white">
              Dang nhap
            </Link>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Khoi tao
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
