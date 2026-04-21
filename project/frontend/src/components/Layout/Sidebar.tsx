import { Book, Coffee, X } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { gameNavigation } from '../../router/routes';
import { useAuthStore } from '../../store/authStore';
import storeimg from '../../assets/genshin/img/character/storeimg';

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { gameId } = useParams<{ gameId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleGameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newGame = e.target.value;
    navigate(`/${newGame}/home`);
    if (onClose) onClose();
  };

  const handleLogout = async () => {
    await logout();
    navigate(`/${gameId}/home`);
    if (onClose) onClose();
  };

  const currentMenuItems = (gameId && gameNavigation[gameId]) || gameNavigation.hi3 || [];
  const menuSections = {
    'MAIN MENU': currentMenuItems.slice(0, 2),
    SERVICES: currentMenuItems.slice(2),
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#111216] border-r border-white/5 z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full shadow-lg overflow-hidden relative">
              <img src={storeimg[95].image_avt} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-xl text-white">
              <span className="text-[#a855f7]">MewMew</span> Gacha
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="relative">
            <select
              value={gameId || 'hi3'}
              onChange={handleGameChange}
              className="w-full appearance-none bg-[#15171c] border border-white/10 text-gray-300 text-sm rounded-lg pl-3 pr-8 py-2.5 focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              <option value="hi3">Honkai Impact 3</option>
              <option value="genshin">Genshin Impact</option>
              <option value="wuwa">Wuthering Waves</option>
              <option value="hsr">Honkai: Star Rail</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
          {Object.entries(menuSections).map(([title, items]) => (
            <div key={title} className="mb-6 px-4">
              <div className="px-2 mb-2 text-[11px] font-bold text-gray-500 tracking-wider">{title}</div>
              <div className="flex flex-col gap-1">
                {items.map((item) => {
                  const Icon = item.icon || Book;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      to={item.path}
                      key={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                        isActive ? 'bg-primary/10 text-primary' : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={18} className={`${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
                      <span className="text-[15px] font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5 mt-auto flex flex-col gap-3">
          {isAuthenticated && (
            <button
              onClick={() => {
                navigate(`/${gameId}/profile`);
                if (onClose) onClose();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[#f5b041] hover:bg-[#f5b041]/10 transition-colors border border-[#f5b041]/20 font-medium text-sm"
            >
              <Coffee size={16} />
              Profile
            </button>
          )}
          <button
            onClick={() => {
              if (isAuthenticated) {
                handleLogout();
              } else {
                navigate(`/${gameId}/login`);
                if (onClose) onClose();
              }
            }}
            className="flex items-center justify-center w-full py-2.5 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors font-medium text-sm"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </aside>
    </>
  );
}
