import { Settings } from 'lucide-react';

export function ConfigPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
      <Settings size={48} className="mb-4" />
      <h3 className="text-lg font-semibold text-gray-600">Configuración</h3>
      <p className="text-sm">Módulo en construcción</p>
    </div>
  );
}
