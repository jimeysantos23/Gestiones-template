import { create } from 'zustand';
import type { Solicitud, EstadoSolicitud, Modulo } from '../types';
import { solicitudesMock } from '../data/mock';

interface SolicitudesState {
  solicitudes: Solicitud[];
  agregar: (s: Solicitud) => void;
  evaluar: (id: string, estado: EstadoSolicitud, comentario: string, evaluadoPor: string, evaluadoPorNombre: string) => void;
  getByModulo: (m: Modulo) => Solicitud[];
  getById: (id: string) => Solicitud | undefined;
}

const today = () => new Date().toISOString().split('T')[0];

export const useSolicitudesStore = create<SolicitudesState>((set, get) => ({
  solicitudes: solicitudesMock,

  agregar: (solicitud) => {
    set((state) => ({
      solicitudes: [solicitud, ...state.solicitudes],
    }));
  },

  evaluar: (id, estado, comentario, evaluadoPor, evaluadoPorNombre) => {
    set((state) => ({
      solicitudes: state.solicitudes.map((s) =>
        s.id === id
          ? {
              ...s,
              estado,
              comentarioOwner: comentario,
              evaluadoPor,
              evaluadoPorNombre,
              modificadoPor: evaluadoPorNombre,
              fechaActualizacion: today(),
              fechaCierre:
                estado === 'finalizada' || estado === 'rechazada' ? today() : s.fechaCierre,
            }
          : s
      ),
    }));
  },

  getByModulo: (modulo) => {
    return get().solicitudes.filter((s) => s.modulo === modulo);
  },

  getById: (id) => {
    return get().solicitudes.find((s) => s.id === id);
  },
}));
