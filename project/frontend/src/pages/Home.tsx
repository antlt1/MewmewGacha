import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      <div className="bg-[#15171c] border border-white/5 rounded-2xl md:p-12 p-6 shadow-xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center overflow-hidden">
            <img src="https://i.imgur.com/k2RtzcQ.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
            <span className="text-white">MEWMEW GACHA</span> IS NOW A
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-[#f5b041] mb-2 leading-[1.1] font-serif">Gacha Games Account Marketplace.</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#a855f7] mb-6">The complete toolkit.</h2>
        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed mb-10">
          Tai khoan da dang cac dong game Gacha, tim kiem nguoi cay thue loot map, huong dan build nhan vat theo meta, va he thong tin tuc da vu tru
          Game. Duoc xay dung vi cong dong de dem lai su minh bach, bao mat va thong tin chinh xac nhat. Maintained with care by MewMew Team.
        </p>
      </div>
    </div>
  );
}
