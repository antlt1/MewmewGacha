import { Menu } from 'lucide-react';

type MobileHeaderProps = {
  onToggleMenu: () => void;
};

export default function MobileHeader({ onToggleMenu }: MobileHeaderProps) {
  return (
    <div className="flex z-40 items-center justify-between bg-[#15171c] border-b border-white/5 p-4 lg:hidden sticky top-0">
      <div className="flex items-center gap-3">
        <button onClick={onToggleMenu} className="p-1 hover:bg-white/10 rounded-md text-gray-400">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full shadow-lg overflow-hidden relative">
            <img src="https://i.imgur.com/k2RtzcQ.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg text-white">
            <span className="text-[#a855f7]">MewMew</span> Gacha
          </span>
        </div>
      </div>

      <button className="text-sm font-medium text-gray-300 hover:text-white">Log In</button>
    </div>
  );
}
