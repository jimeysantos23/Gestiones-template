import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldCheck,
  Calculator,
  Truck,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const navItems = [
  { to: '/menu', icon: LayoutDashboard, label: 'Inicio' },
  { to: '/seguros', icon: ShieldCheck, label: 'Seguros' },
  { to: '/contabilidad', icon: Calculator, label: 'Contabilidad' },
  { to: '/operaciones', icon: Truck, label: 'Operaciones' },
  { to: '/configuracion', icon: Settings, label: 'Configuracion' },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { usuario, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose?.();
  };

  const handleNavClick = () => {
    onClose?.();
  };

  return (
    <aside className="w-64 bg-red-700 flex flex-col h-screen shrink-0">
      <div className="p-5 flex items-center gap-3">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="16" stroke="white" strokeWidth="2" />
          <path
            d="M18 8C14 8 11 11 11 15C11 18 13 20 15 21L11 28H25L21 21C23 20 25 18 25 15C25 11 22 8 18 8Z"
            fill="white"
            opacity="0.9"
          />
          <circle cx="15" cy="14" r="1.5" fill="#DC2626" />
          <circle cx="21" cy="14" r="1.5" fill="#DC2626" />
          <path d="M16 19C16 19 17 20 18 20C19 20 20 19 20 19" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="text-2xl font-bold text-white tracking-tight">BAC</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors group ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon size={18} />
            <span className="flex-1">{item.label}</span>
            <ChevronRight
              size={14}
              className="text-white/40 group-hover:text-white/60 transition-colors"
            />
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/20">
        <div className="flex items-center gap-3 px-4 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white text-xs font-medium">
            {usuario?.nombre?.split(' ').map(n => n[0]).join('') ?? '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {usuario?.nombre}
            </p>
            <p className="text-xs text-white/60 capitalize">{usuario?.rol}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <LogOut size={18} />
          <span className="flex-1">Cerrar sesion</span>
          <ChevronRight size={14} className="text-white/40" />
        </button>
      </div>
    </aside>
  );
}
