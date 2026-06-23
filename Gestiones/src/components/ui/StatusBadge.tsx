import type { EstadoSolicitud } from '../../types';

const labels: Record<EstadoSolicitud, string> = {
  pendiente: 'Pendiente',
  en_proceso: 'En Proceso',
  finalizada: 'Finalizada',
  rechazada: 'Rechazada',
};

const colors: Record<EstadoSolicitud, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  en_proceso: 'bg-blue-100 text-blue-800',
  finalizada: 'bg-green-100 text-green-800',
  rechazada: 'bg-red-100 text-red-800',
};

export function StatusBadge({ estado }: { estado: EstadoSolicitud }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[estado]}`}
    >
      {labels[estado]}
    </span>
  );
}
