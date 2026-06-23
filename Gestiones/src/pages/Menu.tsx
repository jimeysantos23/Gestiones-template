import { useNavigate } from 'react-router-dom';
import { Calculator, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const modules = [
  {
    id: 'contabilidad',
    label: 'Contabilidad',
    description: 'Gestión de solicitudes contables',
    icon: Calculator,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'seguros',
    label: 'Seguros',
    description: 'Gestión de solicitudes de seguros',
    icon: ShieldCheck,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'operaciones',
    label: 'Operaciones',
    description: 'Gestión de solicitudes operativas',
    icon: Truck,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
];

export function Menu() {
  const navigate = useNavigate();
  const { usuario } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Bienvenido, {usuario?.nombre}
        </h2>
        <p className="text-gray-500 mt-1">
          Selecciona un módulo para gestionar las solicitudes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => navigate(`/${mod.id}`)}
            className={`group p-6 rounded-xl border ${mod.borderColor} ${mod.lightColor} hover:shadow-md transition-all text-left cursor-pointer`}
          >
            <div
              className={`w-12 h-12 ${mod.color} rounded-xl flex items-center justify-center mb-4`}
            >
              <mod.icon size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {mod.label}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{mod.description}</p>
            <div className="flex items-center gap-1 mt-4 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Ingresar <ArrowRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
