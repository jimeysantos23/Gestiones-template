import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
