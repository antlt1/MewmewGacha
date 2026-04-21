import { Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-[#15171c] border border-white/5 rounded-2xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-gray-400">Chào mừng quản trị viên. Chọn một mục quản lý bên dưới.</p>
      </div>
      <Outlet />
    </div>
  );
}