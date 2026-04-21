import { Archive, BarChart2, Book, Home, Map, Sword } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type GameNavigationItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

export const gameNavigation: Record<string, GameNavigationItem[]> = {
  genshin: [
    { name: 'Trang chu', path: '/genshin/home', icon: Home },
    { name: 'Shop Acc', path: '/genshin/acc-marketplace', icon: Archive },
    { name: 'Build Nhan Vat', path: '/genshin/character-builds', icon: Book },
    { name: 'Loot Map', path: '/genshin/loot-map', icon: Map },
    { name: 'Tin tuc', path: '/genshin/news', icon: BarChart2 },
  ],
  hi3: [
    { name: 'Trang chu HI3', path: '/hi3/home', icon: Home },
    { name: 'Shop Valkyrie', path: '/hi3/acc-marketplace', icon: Sword },
    { name: 'Huong dan Elysian', path: '/hi3/guide', icon: Book },
    { name: 'Thue cay', path: '/hi3/loot-map', icon: Map },
  ],
};

export const routes = [
  {
    path: '/',
  },
  {
    path: '/:gameId',
    children: [
      {
        path: 'home',
      },
      {
        path: 'acc-marketplace',
      },
    ],
  },
  {
    path: '/admin',
    children: [{ path: 'dashboard' }, { path: 'manage-acc' }],
  },
];
