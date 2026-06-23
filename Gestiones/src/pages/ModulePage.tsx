import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  Search,
  Filter,
  Paperclip,
  Check,
  ClipboardList,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useSolicitudesStore } from '../store/solicitudesStore';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import type { Modulo, Solicitud, EstadoSolicitud } from '../types';

const moduleLabels: Record<string, string> = {
  seguros: 'Seguros',
  contabilidad: 'Contabilidad',
  operaciones: 'Operaciones',
};

const statusLabels: Record<EstadoSolicitud, string> = {
  pendiente: 'Pendiente',
  en_proceso: 'Proceso',
  finalizada: 'Finalizada',
  rechazada: 'Rechazada',
};

const statusColors: Record<EstadoSolicitud, string> = {
  pendiente: 'bg-yellow-400 text-yellow-900',
  en_proceso: 'bg-lime-400 text-lime-900',
  finalizada: 'bg-green-500 text-white',
  rechazada: 'bg-red-500 text-white',
};

export function ModulePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = useAuthStore();
  const { getByModulo, agregar, evaluar } = useSolicitudesStore();

  const currentModulo = location.pathname.replace('/', '') as Modulo;
  const solicitudes = getByModulo(currentModulo);
  const isOwner = usuario?.rol === 'owner';

  const [search, setSearch] = useState('');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<EstadoSolicitud[]>([]);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalDetalle, setModalDetalle] = useState<Solicitud | null>(null);
  const [modalEvaluar, setModalEvaluar] = useState<Solicitud | null>(null);

  const [formTitulo, setFormTitulo] = useState('');
  const [formTipo, setFormTipo] = useState('');
  const [formDescripcion, setFormDescripcion] = useState('');
  const [formError, setFormError] = useState('');

  const [evalEstado, setEvalEstado] = useState<EstadoSolicitud>('en_proceso');
  const [evalComentario, setEvalComentario] = useState('');

  const toggleStatus = (estado: EstadoSolicitud) => {
    setSelectedStatuses((prev) =>
      prev.includes(estado)
        ? prev.filter((s) => s !== estado)
        : [...prev, estado]
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
  };

  const filtered = solicitudes.filter((s) => {
    const matchSearch =
      s.titulo.toLowerCase().includes(search.toLowerCase()) ||
      s.creadoPorNombre.toLowerCase().includes(search.toLowerCase()) ||
      s.tipoSolicitud.toLowerCase().includes(search.toLowerCase());
    const matchEstado =
      selectedStatuses.length === 0 || selectedStatuses.includes(s.estado);
    if (!isOwner) return matchSearch && matchEstado && s.creadoPor === usuario?.id;
    return matchSearch && matchEstado;
  });

  const handleCrearSolicitud = () => {
    if (!formTitulo.trim() || !formDescripcion.trim() || !formTipo.trim()) {
      setFormError('Todos los campos son obligatorios');
      return;
    }

    const nueva: Solicitud = {
      id: Date.now().toString(),
      modulo: currentModulo,
      tipoSolicitud: formTipo.trim(),
      titulo: formTitulo.trim(),
      descripcion: formDescripcion.trim(),
      estado: 'pendiente',
      creadoPor: usuario!.id,
      creadoPorNombre: usuario!.nombre,
      adjuntos: 0,
      disclaimer: false,
      fechaCreacion: new Date().toISOString().split('T')[0],
      fechaActualizacion: new Date().toISOString().split('T')[0],
    };

    agregar(nueva);
    alert('Solicitud creada correctamente.\n[Simulación] Correo enviado a los owners para evaluación.');
    setModalCrear(false);
    setFormTitulo('');
    setFormTipo('');
    setFormDescripcion('');
    setFormError('');
  };

  const handleEvaluar = () => {
    if (!evalComentario.trim()) return;
    evaluar(modalEvaluar!.id, evalEstado, evalComentario, usuario!.id, usuario!.nombre);
    const estadoLabels: Record<string, string> = {
      pendiente: 'pendiente',
      en_proceso: 'en proceso',
      finalizada: 'finalizada',
      rechazada: 'rechazada',
    };
    alert(`Solicitud actualizada a "${estadoLabels[evalEstado]}".\n[Simulación] Correo enviado al usuario creador.`);
    setModalEvaluar(null);
    setEvalEstado('en_proceso');
    setEvalComentario('');
  };

  if (!['contabilidad', 'seguros', 'operaciones'].includes(currentModulo)) {
    navigate('/menu');
    return null;
  }

  const activeFiltersCount = selectedStatuses.length;

  return (
    <div className="max-w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Bienvenido al modulo de {moduleLabels[currentModulo]}
      </h2>

      <div className="border border-gray-200 rounded-xl bg-white mb-6 overflow-hidden">
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">{usuario?.nombre}</h3>
          <p className="text-sm text-gray-500 lowercase">
            vista del modulo de {moduleLabels[currentModulo].toLowerCase()} que muestra el historial de solicitudes realizadas
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <button
          onClick={() => setFilterModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer relative"
        >
          <Filter size={16} />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Busqueda"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder:text-gray-400"
          />
        </div>

        <div className="flex-1" />

        {!isOwner && (
          <button
            onClick={() => setModalCrear(true)}
            className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Plus size={16} />
            Nueva solicitud
          </button>
        )}
      </div>

      <div className="border border-gray-200 rounded-xl bg-white overflow-x-auto">
        <Table
          columns={[
            { key: 'id', header: 'ID', render: (s) => s.id.padStart(4, '0') },
            {
              key: 'estado',
              header: 'Estado',
              render: (s) => (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[s.estado]}`}
                >
                  {statusLabels[s.estado]}
                </span>
              ),
            },
            { key: 'tipoSolicitud', header: 'tipo de solicitud', render: (s) => s.tipoSolicitud },
            { key: 'titulo', header: 'solicitudes', render: (s) => s.titulo },
            {
              key: 'descripcion',
              header: 'Detalle de solicitud',
              render: (s) => (
                <span className="text-gray-500 max-w-[200px] block truncate">
                  {s.descripcion}
                </span>
              ),
            },
            { key: 'creadoPor', header: 'Creado por', render: (s) => s.creadoPorNombre },
            { key: 'fechaCreacion', header: 'Fecha creacion', render: (s) => s.fechaCreacion },
            {
              key: 'adjuntos',
              header: 'Adjuntos',
              render: (s) =>
                s.adjuntos > 0 ? (
                  <span className="inline-flex items-center gap-1 text-gray-500">
                    <Paperclip size={14} />
                    {s.adjuntos}
                  </span>
                ) : (
                  <span className="text-gray-300">-</span>
                ),
            },
            {
              key: 'disclaimer',
              header: 'Disclaimer',
              render: (s) =>
                s.disclaimer ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">
                    <Check size={14} />
                  </span>
                ) : (
                  <span className="text-gray-300">-</span>
                ),
            },
            {
              key: 'modificadoPor',
              header: 'Modificado por',
              render: (s) => s.modificadoPor ?? <span className="text-gray-300">-</span>,
            },
            {
              key: 'observaciones',
              header: 'Observaciones',
              render: (s) => s.observaciones ?? <span className="text-gray-300">-</span>,
            },
            {
              key: 'fechaCierre',
              header: 'Fecha cierre',
              render: (s) => s.fechaCierre ?? <span className="text-gray-300">-</span>,
            },
            {
              key: 'acciones',
              header: '',
              render: (s) => (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalDetalle(s);
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Ver detalle"
                >
                  <Eye size={16} />
                </button>
              ),
              className: 'w-12',
            },
          ]}
          data={filtered}
          onRowClick={(s) => setModalDetalle(s)}
          emptyMessage={
            isOwner
              ? 'No hay solicitudes en este módulo'
              : 'No has creado solicitudes en este módulo'
          }
        />
      </div>

      <Modal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        title="Filtros"
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Selecciona los estados a filtrar:</p>
          {(['pendiente', 'en_proceso', 'finalizada', 'rechazada'] as EstadoSolicitud[]).map(
            (estado) => (
              <label
                key={estado}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(estado)}
                  onChange={() => toggleStatus(estado)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700">{statusLabels[estado]}</span>
              </label>
            )
          )}
          <div className="flex justify-between pt-3 border-t border-gray-100">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline cursor-pointer"
            >
              Limpiar
            </button>
            <Button size="sm" onClick={() => setFilterModalOpen(false)}>
              Aplicar
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={modalCrear}
        onClose={() => {
          setModalCrear(false);
          setFormError('');
        }}
        title={`Nueva Solicitud - ${moduleLabels[currentModulo]}`}
      >
        <div className="space-y-4">
          <Input
            label="Tipo de solicitud"
            placeholder="Ej: Seguro Vehicular, Póliza..."
            value={formTipo}
            onChange={(e) => setFormTipo(e.target.value)}
          />
          <Input
            label="Título"
            placeholder="Título de la solicitud"
            value={formTitulo}
            onChange={(e) => setFormTitulo(e.target.value)}
          />
          <Textarea
            label="Descripción"
            placeholder="Describe los detalles de tu solicitud..."
            value={formDescripcion}
            onChange={(e) => setFormDescripcion(e.target.value)}
          />
          {formError && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {formError}
            </p>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setModalCrear(false);
                setFormError('');
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleCrearSolicitud}>
              <ClipboardList size={16} />
              Enviar Solicitud
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={modalDetalle !== null}
        onClose={() => setModalDetalle(null)}
        title="Detalle de Solicitud"
        size="lg"
      >
        {modalDetalle && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">ID</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">
                  {modalDetalle.id.padStart(4, '0')}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</p>
                <div className="mt-0.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[modalDetalle.estado]}`}
                  >
                    {statusLabels[modalDetalle.estado]}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</p>
                <p className="text-sm text-gray-900 mt-0.5">{modalDetalle.tipoSolicitud}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitante</p>
                <p className="text-sm text-gray-900 mt-0.5">{modalDetalle.creadoPorNombre}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha creación</p>
                <p className="text-sm text-gray-900 mt-0.5">{modalDetalle.fechaCreacion}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha cierre</p>
                <p className="text-sm text-gray-900 mt-0.5">{modalDetalle.fechaCierre ?? '-'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Título</p>
              <p className="text-sm text-gray-900 mt-0.5">{modalDetalle.titulo}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</p>
              <p className="text-sm text-gray-700 mt-0.5 bg-gray-50 p-3 rounded-lg">
                {modalDetalle.descripcion}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Adjuntos</p>
                <p className="text-sm text-gray-900 mt-0.5">{modalDetalle.adjuntos} archivos</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Disclaimer</p>
                <p className="text-sm text-gray-900 mt-0.5">
                  {modalDetalle.disclaimer ? 'Verificado' : 'Pendiente'}
                </p>
              </div>
            </div>

            {modalDetalle.observaciones && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Observaciones</p>
                <p className="text-sm text-gray-700 mt-0.5">{modalDetalle.observaciones}</p>
              </div>
            )}

            {modalDetalle.evaluadoPor && (
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Evaluación</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Evaluado por</p>
                    <p className="text-sm text-gray-900">{modalDetalle.evaluadoPorNombre}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Modificado por</p>
                    <p className="text-sm text-gray-900">{modalDetalle.modificadoPor ?? '-'}</p>
                  </div>
                </div>
                {modalDetalle.comentarioOwner && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Comentario</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mt-0.5">
                      {modalDetalle.comentarioOwner}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              {isOwner && modalDetalle.estado !== 'finalizada' && modalDetalle.estado !== 'rechazada' && (
                <Button
                  onClick={() => {
                    setModalEvaluar(modalDetalle);
                    setEvalEstado('en_proceso');
                    setEvalComentario('');
                    setModalDetalle(null);
                  }}
                >
                  Evaluar
                </Button>
              )}
              <Button variant="secondary" onClick={() => setModalDetalle(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={modalEvaluar !== null}
        onClose={() => setModalEvaluar(null)}
        title="Evaluar Solicitud"
      >
        {modalEvaluar && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{modalEvaluar.titulo}</p>
              <p className="text-xs text-gray-500 mt-1">
                Solicitante: {modalEvaluar.creadoPorNombre}
              </p>
            </div>

            <Select
              label="Estado"
              value={evalEstado}
              onChange={(e) => setEvalEstado(e.target.value as EstadoSolicitud)}
              options={[
                { value: 'en_proceso', label: 'En Proceso' },
                { value: 'finalizada', label: 'Finalizada' },
                { value: 'rechazada', label: 'Rechazada' },
              ]}
            />

            <Textarea
              label="Comentario"
              placeholder="Añade un comentario sobre tu evaluación..."
              value={evalComentario}
              onChange={(e) => setEvalComentario(e.target.value)}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setModalEvaluar(null)}>
                Cancelar
              </Button>
              <Button onClick={handleEvaluar}>Guardar Evaluación</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
