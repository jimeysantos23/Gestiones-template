# Plan de Desarrollo — BAC: Gestión de Solicitudes

## Prioridad Visual-First

---

## Sprint 1: Login + Menú Principal (6 pts)

### Tarea 1 — Login visual (2 pts)
- Tarjeta blanca centrada sobre fondo gris claro
- Logo león rojo geométrico (SVG)
- Input "Usuario" con borde rojo + icono de usuario
- Input "Contraseña" solo con línea inferior roja (sin bordes laterales)
- Botón azul "Ingresar"
- Botón rojo "SSO"
- Links "¿Has olvidado la contraseña?" y "Crear una cuenta nueva"

### Tarea 2 — Login responsive (1 pt)
- Adaptación a móvil, tablet y desktop

### Tarea 3 — Menú principal visual (2 pts)
- Bienvenida con nombre de usuario
- 3 tarjetas (Contabilidad, Seguros, Operaciones) con iconos
- Hover: flecha "Ingresar" animada

### Tarea 4 — Menú responsive (1 pt)
- Grid adaptable, tarjetas apiladas en móvil

---

## Sprint 2: Layout General + Módulo Seguros (9 pts)

### Tarea 5 — Sidebar visual (2 pts)
- Fondo rojo intenso corporativo
- Logo león geométrico + texto "BAC" en blanco
- Items: Inicio, Seguros (activo), Contabilidad, Operaciones, Configuración
- Cada item con icono + label + chevron derecho
- Avatar con iniciales + nombre al pie
- Cerrar sesión

### Tarea 6 — Header visual (1 pt)
- Hamburguesa roja a la izquierda
- Línea roja horizontal fina inferior
- Campana de notificación roja + punto indicador
- Avatar circular rosa claro con iniciales

### Tarea 7 — MainLayout + Sidebar responsive (2 pts)
- Overlay oscuro en móvil al abrir sidebar
- Toggle con botón hamburguesa
- Animación de transición slide (translate-x)

### Tarea 8 — Módulo Seguros: cabecera (1 pt)
- Título "Bienvenido al modulo de Seguros"
- Tarjeta con nombre de usuario + subtítulo

### Tarea 9 — Módulo Seguros: controles (1 pt)
- Botón "Filtros" gris claro con icono de embudo
- Barra de búsqueda gris claro con lupa
- Botón rojo "Nueva solicitud"

### Tarea 10 — Módulo Seguros: tabla (2 pts)
- 12 columnas: ID, Estado, tipo de solicitud, solicitudes, Detalle de solicitud, Creado por, Fecha creación, Adjuntos, Disclaimer, Modificado por, Observaciones, Fecha cierre
- Badges de estado: verde (Finalizada), rojo (Rechazada), amarillo/limón (Proceso)
- Icono clip en Adjuntos, icono check en Disclaimer
- Scroll horizontal

---

## Sprint 3: Modales + Módulos Restantes (8 pts)

### Tarea 11 — Modal ingreso de solicitud (1 pt)
- Campos: tipo de solicitud, título, descripción
- Botones Cancelar / Enviar

### Tarea 12 — Modal detalle/resumen (2 pts)
- Toda la información de la solicitud (12 campos)
- Sección de evaluación si existe
- Badge de estado

### Tarea 13 — Modal evaluación owner (1 pt)
- Selector de estado (En Proceso, Finalizada, Rechazada)
- Campo de comentario
- Botón Guardar

### Tarea 14 — Módulo Contabilidad (1 pt)
- Copiar estructura visual del módulo Seguros

### Tarea 15 — Módulo Operaciones (1 pt)
- Copiar estructura visual del módulo Seguros

### Tarea 16 — Modal filtros con checkboxes (1 pt)
- Checkboxes por estado (Pendiente, Proceso, Finalizada, Rechazada)
- Botón Limpiar
- Botón Aplicar

### Tarea 17 — Página Configuración placeholder (1 pt)
- Icono + "Módulo en construcción"

---

## Sprint 4: Funcionalidad — Auth + CRUD (~20 pts)

### Tarea 18 — Error Boundary global (1 pt)
### Tarea 19 — Sistema de Toast/Snackbar (2 pts)
### Tarea 20 — Loading states en login, tabla, modales, botones (2 pts)
### Tarea 21 — Implementar react-hook-form + Zod en Login, crear solicitud, evaluar (2 pts)
### Tarea 22 — Validación por campo con mensajes de error (1 pt)
### Tarea 23 — Confirmación al cerrar sesión, rechazar solicitud (1 pt)
### Tarea 24 — Autenticación real: login/logout funcional con store (1 pt)
### Tarea 25 — Crear solicitud funcional con datos mock (1 pt)
### Tarea 26 — Evaluar solicitud: cambiar estado + comentario (1 pt)
### Tarea 27 — Editar solicitud (creador modifica título, tipo, descripción) (2 pts)
### Tarea 28 — Disclaimer toggle funcional (1 pt)
### Tarea 29 — Store de notificaciones + dropdown en campana (2 pts)
### Tarea 30 — Título dinámico en el navegador (1 pt)
### Tarea 31 — Dead buttons: SSO, forgot password, create account (1 pt)
### Tarea 32 — StatusBadge centralizado (1 pt)
### Tarea 33 — Persistencia de sesión (zustand persist) (2 pts)

---

## Sprint 5: Datos — Paginación, Ordenamiento, Export (~20 pts)

### Tarea 34 — Paginación en tabla (10, 25, 50 por página) (2 pts)
### Tarea 35 — Ordenamiento por columnas (click en header) (2 pts)
### Tarea 36 — Búsqueda con debounce (300ms) (1 pt)
### Tarea 37 — Filtro modal: contar resultados, mantener estado (1 pt)
### Tarea 38 — Exportar a CSV desde tabla filtrada (2 pts)
### Tarea 39 — Eliminar solicitud con confirmación (1 pt)
### Tarea 40 — API Service Layer (fetch/axios preparado) (2 pts)
### Tarea 41 — Manejo de errores de red + retry (1 pt)
### Tarea 42 — Estados vacíos con ilustraciones (1 pt)
### Tarea 43 — Observaciones editables por owner (1 pt)
### Tarea 44 — Bulk actions con checkboxes (2 pts)
### Tarea 45 — Sidebar full-width en móvil (1 pt)
### Tarea 46 — Animaciones suaves en modales y transiciones (1 pt)
### Tarea 47 — Breadcrumbs en header (1 pt)
### Tarea 48 — Refactor: hooks personalizados (1 pt)

---

## Sprint 6: Features Avanzadas — Dashboard, Kanban, Adjuntos (~18 pts)

### Tarea 49 — Dashboard con métricas (2 pts)
### Tarea 50 — Gráficos (Recharts: pastel por estado, barras por mes) (2 pts)
### Tarea 51 — Vista Kanban (drag & drop por estados) (2 pts)
### Tarea 52 — Subida de archivos (adjuntos reales) (2 pts)
### Tarea 53 — Configuración completa: perfil + preferencias (2 pts)
### Tarea 54 — Accesibilidad (a11y): roles ARIA, focus trap, Escape (2 pts)
### Tarea 55 — Modo oscuro con toggle y persistencia (2 pts)
### Tarea 56 — Virtualización de tabla (react-window) (2 pts)
### Tarea 57 — React.memo + useCallback en componentes clave (1 pt)
### Tarea 58 — Página 404 personalizada (1 pt)

---

## Sprint 7: Calidad — Tests, CI/CD, Deploy (~16 pts opcional)

### Tarea 59 — Vitest + Testing Library config (1 pt)
### Tarea 60 — Tests unitarios de stores (2 pts)
### Tarea 61 — Tests de componentes (Button, Modal, Table, Login) (2 pts)
### Tarea 62 — Tests de integración (flujo crear → evaluar) (2 pts)
### Tarea 63 — Dockerfile + docker-compose (1 pt)
### Tarea 64 — GitHub Actions (CI) (2 pts)
### Tarea 65 — README con documentación (1 pt)
### Tarea 66 — husky + lint-staged (1 pt)
### Tarea 67 — Variables de entorno (.env.example) (1 pt)
### Tarea 68 — Auditoría de seguridad (1 pt)
### Tarea 69 — Sentry para monitoreo (2 pts)

---

## Resumen de Sprints

| Sprint | Enfoque | Pts | Semana |
|--------|---------|:---:|:------:|
| 1 | Login + Menú (visual) | 6 | 1 |
| 2 | Layout + Módulo Seguros (visual) | 9 | 1-2 |
| 3 | Modales + Módulos restantes (visual) | 8 | 2 |
| 4 | Funcionalidad: Auth + CRUD | ~20 | 3-4 |
| 5 | Datos: Paginación, ordenamiento, export | ~20 | 5-6 |
| 6 | Features Avanzadas: Dashboard, Kanban, adjuntos | ~18 | 7-8 |
| 7 | Calidad: Tests, CI/CD, Deploy | ~16 | 9-10 |
