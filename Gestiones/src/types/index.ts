export type Rol = 'negocio' | 'owner';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
}

export type EstadoSolicitud = 'pendiente' | 'en_proceso' | 'finalizada' | 'rechazada';

export type Modulo = 'inicio' | 'seguros' | 'contabilidad' | 'operaciones' | 'configuracion';

export interface Solicitud {
  id: string;
  modulo: Modulo;
  tipoSolicitud: string;
  titulo: string;
  descripcion: string;
  estado: EstadoSolicitud;
  creadoPor: string;
  creadoPorNombre: string;
  evaluadoPor?: string;
  evaluadoPorNombre?: string;
  comentarioOwner?: string;
  adjuntos: number;
  disclaimer: boolean;
  modificadoPor?: string;
  observaciones?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaCierre?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
