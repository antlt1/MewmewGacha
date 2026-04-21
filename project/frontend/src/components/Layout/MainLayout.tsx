import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b0c10]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:ml-64 w-full">
        <MobileHeader onToggleMenu={() => setIsSidebarOpen(true)} />
        <Navbar />
        <main className="flex-1 p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
