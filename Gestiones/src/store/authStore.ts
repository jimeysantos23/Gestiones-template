import { create } from 'zustand';
import type { Usuario } from '../types';
import { usuariosMock, credencialesMock } from '../data/mock';

interface AuthState {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  isAuthenticated: false,

  login: (email: string, password: string) => {
    const credencial = credencialesMock[email];
    if (!credencial || credencial.password !== password) {
      return { success: false, error: 'Credenciales inválidas' };
    }
    const usuario = usuariosMock.find((u) => u.id === credencial.usuarioId) ?? null;
    if (!usuario) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    set({ usuario, isAuthenticated: true });
    return { success: true };
  },

  logout: () => {
    set({ usuario: null, isAuthenticated: false });
  },
}));
