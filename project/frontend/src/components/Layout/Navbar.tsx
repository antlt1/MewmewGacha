import { Link, useLocation, useParams } from 'react-router-dom';
import { gameNavigation } from '../../router/routes';

export default function Navbar() {
  const { gameId } = useParams<{ gameId: string }>();
  const location = useLocation();
  const currentNav = (gameId && gameNavigation[gameId]) || [];
  const isGenshin = gameId === 'genshin';

  if (isGenshin) {
    const genshinTopMenu = [
      { label: 'Characters', path: '/genshin/character-builds', hasDropdown: false },
      { label: 'Builds', path: '/genshin/character-builds', hasDropdown: false },
      { label: 'Teams', path: '/genshin/dashboard', hasDropdown: false },
      { label: 'Blog', path: '/genshin/news', hasDropdown: false },
      { label: 'TCG', path: '/genshin/home', hasDropdown: true },
      { label: 'Leaderboards', path: '/genshin/dashboard', hasDropdown: true },
      { label: 'Tools', path: '/genshin/home', hasDropdown: true },
      { label: 'Tierlist', path: '/genshin/home', hasDropdown: true },
      { label: 'Wiki', path: '/genshin/home', hasDropdown: true },
    ];

    return (
      <nav className="hidden lg:block sticky top-0 z-40 border-b border-white/10 bg-[#0f1d3b]">
        <div className="mx-auto flex h-12 max-w-7xl items-center gap-1 px-4 font-medium tracking-[0.01em]">
          {genshinTopMenu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-1 rounded px-3 py-1.5 text-[13px] leading-none transition-colors ${
                  isActive ? 'text-white bg-white/10' : 'text-slate-200/95 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="antialiased">{item.label}</span>
                {item.hasDropdown ? <span className="text-[10px] opacity-75">▼</span> : null}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="hidden lg:block bg-[#1a1c23] border-b border-white/5 sticky top-0 z-40">
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
