import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { User } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/menu');
    } else {
      setError(result.error ?? 'Error al iniciar sesión');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="#DC2626" strokeWidth="2.5" />
            <path
              d="M32 14C24 14 19 19 19 26C19 31 22 35 26 37L19 50H45L38 37C42 35 45 31 45 26C45 19 40 14 32 14Z"
              fill="#DC2626"
              opacity="0.85"
            />
            <circle cx="27" cy="24" r="2.5" fill="white" />
            <circle cx="37" cy="24" r="2.5" fill="white" />
            <path d="M28 33C28 33 30 35 32 35C34 35 36 33 36 33" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">Usuario</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
              <input
                type="text"
                placeholder="Usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-red-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">Contraseña</label>
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border-0 border-b-2 border-red-400 focus:outline-none focus:border-red-600 bg-transparent placeholder:text-gray-400"
              style={{ borderRadius: 0 }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer text-sm"
          >
            Ingresar
          </button>

          <button
            type="button"
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors cursor-pointer text-sm"
          >
            SSO
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <a href="#" className="block text-xs text-gray-500 hover:text-gray-700 underline">
            ¿Has olvidado la contraseña?
          </a>
          <a href="#" className="block text-xs text-gray-500 hover:text-gray-700 underline">
            Crear una cuenta nueva
          </a>
        </div>

        <div className="mt-4 p-2.5 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-700 mb-1">Credenciales de prueba:</p>
          <p className="text-xs text-gray-500">jimey@negocio.com / 123456</p>
          <p className="text-xs text-gray-500">ana@owner.com / 123456</p>
        </div>
      </div>
    </div>
  );
}
