import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Menu } from './pages/Menu';
import { ModulePage } from './pages/ModulePage';
import { ConfigPage } from './pages/ConfigPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/menu" element={<Menu />} />
            <Route path="/contabilidad" element={<ModulePage />} />
            <Route path="/seguros" element={<ModulePage />} />
            <Route path="/operaciones" element={<ModulePage />} />
            <Route path="/configuracion" element={<ConfigPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
