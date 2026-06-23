import { Bell, Menu } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { usuario } = useAuthStore();

  const initials = usuario?.nombre
    ?.split(' ')
    .map((n) => n[0])
    .join('') ?? '?';

  return (
    <header className="h-14 bg-white border-b border-red-200 flex items-center justify-between px-4 shrink-0">
      <button
        onClick={onToggleSidebar}
        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
      >
        <Menu size={22} />
      </button>

      <div className="flex items-center gap-4">
        <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white text-xs font-medium">
          {initials}
        </div>
      </div>
    </header>
  );
}
