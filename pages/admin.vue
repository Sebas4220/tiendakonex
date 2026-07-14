<template>
  <div class="container py-4" style="max-width: 1200px">
    <div class="row justify-content-center my-5 d-none">
      <div class="col-md-5 text-center">
        <div class="card border-0 shadow-sm p-4 rounded-4 bg-white">
          <i class="bi bi-shield-lock text-warning display-4 mb-3"></i>
          <h5 class="fw-bold text-dark">Acceso Administrativo</h5>
          <p class="text-muted small">Introduce tu PIN de seguridad para continuar.</p>
          <input
            type="password"
            class="form-control form-control-lg text-center fw-bold rounded-3 mb-3"
            placeholder="••••"
            maxlength="4"
          />
          <button class="btn btn-warning w-100 fw-bold rounded-pill py-2 text-dark shadow-sm">
            Ingresar
          </button>
        </div>
      </div>
    </div>

    <div>
      <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 border-bottom pb-3">
        <div>
          <h4 class="fw-bold text-dark mb-0">🛠️ Panel Administrativo Konex</h4>
          <p class="text-muted small mb-0">
            Gestión centralizada de productos, categorías, pedidos y banners publicitarios.
          </p>
        </div>
        <div class="d-flex gap-2 mt-2 mt-md-0">
          <button @click="inicializarDatos" class="btn btn-sm btn-light border rounded-pill px-3">
            <i class="bi bi-arrow-clockwise"></i> Actualizar Vista
          </button>
          <button class="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold">
            Salir del Panel
          </button>
        </div>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 rounded-3 bg-white border-start border-warning border-3">
            <label class="form-label fw-bold text-dark small mb-2">🔄 Tasa del Dólar (Monitor)</label>
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-light fw-bold text-muted">1 USD =</span>
              <input v-model="tasaDolar" type="number" step="0.01" class="form-control fw-bold text-dark" />
              <button @click="actualizarTasa" class="btn btn-warning fw-bold text-dark">Fijar</button>
            </div>
            <small class="text-muted mt-2 d-block" style="font-size: 0.72rem">Tasa activa en el sistema</small>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 rounded-3 bg-white h-100 d-flex flex-row align-items-center justify-content-between">
            <div>
              <small class="text-muted fw-bold text-uppercase d-block mb-1" style="font-size: 0.7rem">Items en Catálogo</small>
              <h3 class="fw-bold text-dark mb-0">{{ listaProductos.length }}</h3>
            </div>
            <i class="bi bi-boxes text-warning display-6 opacity-75"></i>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 rounded-3 bg-white h-100 d-flex flex-row align-items-center justify-content-between">
            <div>
              <small class="text-muted fw-bold text-uppercase d-block mb-1" style="font-size: 0.7rem">Pedidos Totales</small>
              <h3 class="fw-bold text-dark mb-0">{{ listaPedidos.length }}</h3>
            </div>
            <i class="bi bi-receipt text-warning display-6 opacity-75"></i>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 rounded-3 bg-white h-100 d-flex flex-row align-items-center justify-content-between">
            <div>
              <small class="text-muted fw-bold text-uppercase d-block mb-1" style="font-size: 0.7rem">Banners Activos</small>
              <h3 class="fw-bold text-dark mb-0">{{ listaBanners.length }}</h3>
            </div>
            <i class="bi bi-images text-warning display-6 opacity-75"></i>
          </div>
        </div>
      </div>

      <ul class="nav nav-tabs mb-4 border-bottom-0">
        <li class="nav-item">
          <button :class="['nav-link fw-bold px-4', vistaActiva === 'productos' ? 'active text-warning border-bottom border-warning border-3' : 'text-muted']" @click="vistaActiva = 'productos'">
            Productos
          </button>
        </li>
        <li class="nav-item">
          <button :class="['nav-link fw-bold px-4', vistaActiva === 'categorias' ? 'active text-warning border-bottom border-warning border-3' : 'text-muted']" @click="vistaActiva = 'categorias'">
            Categorías
          </button>
        </li>
        <li class="nav-item">
          <button :class="['nav-link fw-bold px-4', vistaActiva === 'pedidos' ? 'active text-warning border-bottom border-warning border-3' : 'text-muted']" @click="vistaActiva = 'pedidos'">
            Pedidos
          </button>
        </li>
        <li class="nav-item">
          <button :class="['nav-link fw-bold px-4', vistaActiva === 'banners' ? 'active text-warning border-bottom border-warning border-3' : 'text-muted']" @click="vistaActiva = 'banners'">
            Banners Promocionales
          </button>
        </li>
      </ul>

      <div class="tab-content">
        
        <div v-if="vistaActiva === 'productos'" class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
              <h5 class="fw-bold text-dark mb-3">📦 Agregar Producto</h5>
              <form ref="formProducto" @submit.prevent="guardarProducto">
                <div class="mb-2">
                  <label class="form-label small fw-semibold text-muted mb-1">Nombre del artículo *</label>
                  <input v-model="nuevoProducto.nombre" type="text" class="form-control form-control-sm rounded-2" placeholder="Ej. Control PS5 Camuflado" required />
                </div>
                <div class="mb-2">
                  <label class="form-label small fw-semibold text-muted mb-1">Categoría *</label>
                  <select v-model="nuevoProducto.id_categoria" class="form-select form-select-sm rounded-2" required>
                    <option value="">Selecciona una opción</option>
                    <option v-for="cat in listaCategorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
                  </select>
                </div>
                <div class="row g-2 mb-2">
                  <div class="col-6">
                    <label class="form-label small fw-semibold text-muted mb-1">Precio Detal ($) *</label>
                    <input v-model="nuevoProducto.precio_detal" type="number" step="0.01" class="form-control form-control-sm rounded-2" placeholder="0.00" required />
                  </div>
                  <div class="col-6">
                    <label class="form-label small fw-semibold text-muted mb-1">Precio Mayor ($) *</label>
                    <input v-model="nuevoProducto.precio_mayor" type="number" step="0.01" class="form-control form-control-sm rounded-2" placeholder="0.00" required />
                  </div>
                </div>
                <div class="row g-2 mb-2">
                  <div class="col-6">
                    <label class="form-label small fw-semibold text-muted mb-1">Mín. Mayor *</label>
                    <input v-model="nuevoProducto.min_mayor" type="number" class="form-control form-control-sm rounded-2" />
                  </div>
                  <div class="col-6">
                    <label class="form-label small fw-semibold text-muted mb-1">Stock Inicial *</label>
                    <input v-model="nuevoProducto.stock" type="number" class="form-control form-control-sm rounded-2" />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="form-label small fw-semibold text-muted mb-1">Imagen del Producto</label>
                  <input type="file" accept="image/*" class="form-control form-control-sm rounded-2" @change="manejarSeleccionImagen" />
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold text-muted mb-1">Descripción</label>
                  <textarea v-model="nuevoProducto.descripcion" rows="2" class="form-control form-control-sm rounded-2" placeholder="Breve descripción..."></textarea>
                </div>
                <button type="submit" class="btn btn-warning w-100 fw-bold text-dark rounded-pill">Guardar Producto</button>
              </form>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0" style="font-size: 0.9rem">
                  <thead>
                    <tr class="table-light">
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Detal</th>
                      <th>Mayor</th>
                      <th class="text-center">Existencia</th>
                      <th class="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prod in listaProductos" :key="prod.id">
                      <td>
                        <div class="d-flex align-items-center gap-2">
                          <img :src="prod.imagen_url || 'https://placehold.co/45x45?text=No+Img'" class="rounded border object-fit-cover shadow-sm bg-light" style="width: 42px; height: 42px" alt="Foto" />
                          <div>
                            <strong class="d-block">{{ prod.nombre }}</strong>
                            <small v-if="prod.descripcion" class="text-muted text-truncate d-block" style="max-width: 250px">{{ prod.descripcion }}</small>
                          </div>
                        </div>
                      </td>
                      <td><span class="badge bg-light text-dark border">{{ prod.categoria_nombre || "Sin categoría" }}</span></td>
                      <td>${{ parseFloat(prod.precio_detal).toFixed(2) }}</td>
                      <td>${{ parseFloat(prod.precio_mayor).toFixed(2) }} <small class="text-muted">(x{{ prod.min_mayor }})</small></td>
                      <td class="text-center">
                        <span :class="['badge', prod.stock > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger']">
                          {{ prod.stock }} unds
                        </span>
                      </td>
                      <td class="text-center">
                        <button class="btn btn-sm btn-link text-primary p-1"><i class="bi bi-pencil-square"></i></button>
                        <button @click="eliminarProducto(prod.id)" class="btn btn-sm btn-link text-danger p-1"><i class="bi bi-trash3-fill"></i></button>
                      </td>
                    </tr>
                    <tr v-if="listaProductos.length === 0">
                      <td colspan="6" class="text-center text-muted small py-4">No hay productos registrados en el catálogo.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div v-if="vistaActiva === 'categorias'" class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
              <h5 class="fw-bold text-dark mb-3">🏷️ Nueva Categoría</h5>
              <form @submit.prevent="guardarCategoria">
                <div class="mb-3">
                  <label class="form-label small fw-semibold text-muted mb-1">Nombre de la Categoría *</label>
                  <input v-model="nuevaCategoria.nombre" type="text" class="form-control form-control-sm rounded-2" placeholder="Ej. Audio, Gaming" required />
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold text-muted mb-1">Orden / Posición</label>
                  <input v-model="nuevaCategoria.orden" type="number" class="form-control form-control-sm rounded-2" />
                </div>
                <button type="submit" class="btn btn-dark w-100 fw-bold rounded-pill">Registrar Categoría</button>
              </form>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0" style="font-size: 0.9rem">
                  <thead>
                    <tr class="table-light">
                      <th>ID</th>
                      <th>Nombre de Categoría</th>
                      <th class="text-center">Prioridad</th>
                      <th class="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cat in listaCategorias" :key="cat.id">
                      <td>#{{ cat.id }}</td>
                      <td><strong>{{ cat.nombre }}</strong></td>
                      <td class="text-center">{{ cat.orden }}</td>
                      <td class="text-center">
                        <button @click="eliminarCategoria(cat.id)" class="btn btn-sm btn-link text-danger"><i class="bi bi-trash3-fill"></i></button>
                      </td>
                    </tr>
                    <tr v-if="listaCategorias.length === 0">
                      <td colspan="4" class="text-center text-muted small py-3">No hay categorías registradas aún.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div v-if="vistaActiva === 'pedidos'" class="row g-4">
          <div class="col-12">
            <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
              <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
                <h5 class="fw-bold text-dark mb-0">📦 Órdenes y Pedidos Recibidos</h5>
                <div style="max-width: 300px;" class="w-100">
                  <input v-model="filtroPedido" type="text" class="form-control form-control-sm rounded-pill" placeholder="🔍 Buscar por cliente..." />
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0" style="font-size: 0.88rem">
                  <thead>
                    <tr class="table-light">
                      <th>ID / Fecha</th>
                      <th>Cliente</th>
                      <th>Despacho / Datos</th>
                      <th>Método de Pago</th>
                      <th class="text-end">Total Ref</th>
                      <th class="text-end">Total VES</th>
                      <th class="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="pedido in pedidosFiltrados" :key="pedido.id">
                      <td>
                        <span class="fw-bold text-dark">#{{ pedido.id }}</span>
                        <small class="text-muted d-block" style="font-size: 0.75rem">{{ pedido.fecha }}</small>
                      </td>
                      <td>
                        <strong class="text-dark">{{ pedido.nombre_cliente }}</strong>
                        <small class="text-muted d-block"><i class="bi bi-telephone"></i> {{ pedido.telefono }}</small>
                      </td>
                      <td>
                        <span :class="['badge mb-1 d-inline-block', pedido.metodo_entrega === 'delivery' ? 'bg-primary-subtle text-primary' : 'bg-info-subtle text-info']">
                          {{ pedido.metodo_entrega === 'delivery' ? '🚗 Delivery' : '📦 MRW Nacional' }}
                        </span>
                        <small class="text-muted d-block text-truncate" style="max-width: 220px;">
                          {{ pedido.metodo_entrega === 'delivery' ? pedido.direccion_delivery : `${pedido.ciudad} - ${pedido.agencia_mrw}` }}
                        </small>
                      </td>
                      <td>
                        <span class="badge bg-light text-dark border">{{ pedido.metodo_pago.toUpperCase() }}</span>
                      </td>
                      <td class="text-end fw-semibold text-dark">${{ parseFloat(pedido.total_usd).toFixed(2) }}</td>
                      <td class="text-end fw-bold text-success">Bs. {{ parseFloat(pedido.total_ves).toLocaleString('es-VE', {minimumFractionDigits: 2}) }}</td>
                      <td class="text-center">
                        <button @click="verDetallesPedido(pedido)" class="btn btn-sm btn-warning rounded-pill px-2 fw-semibold" style="font-size: 0.75rem">
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                    <tr v-if="pedidosFiltrados.length === 0">
                      <td colspan="7" class="text-center text-muted small py-4">No se encontraron pedidos en la base de datos.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div v-if="vistaActiva === 'banners'" class="row g-4">
          <div class="col-lg-4">
            <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
              <h5 class="fw-bold text-dark mb-3">🖼️ Subir Banner de Campaña</h5>
              <form ref="formBanner" @submit.prevent="guardarBanner">
                <div class="mb-3">
                  <label class="form-label small fw-semibold text-muted mb-1">Título / Nombre Interno</label>
                  <input v-model="nuevoBanner.titulo" type="text" class="form-control form-control-sm rounded-2" placeholder="Ej. Promoción Día del Padre" required />
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold text-muted mb-1">Enlace / Destino URL (Opcional)</label>
                  <input v-model="nuevoBanner.link_url" type="text" class="form-control form-control-sm rounded-2" placeholder="Ej. /categoria/gaming" />
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold text-muted mb-1">Imagen del Banner *</label>
                  <input type="file" accept="image/*" class="form-control form-control-sm rounded-2" @change="manejarSeleccionBanner" required />
                  <small class="text-muted d-block mt-1" style="font-size: 0.7rem">Recomendado: Formato apaisado de alta resolución.</small>
                </div>
                <div class="mb-3">
                  <label class="form-label small fw-semibold text-muted mb-1">Prioridad / Orden</label>
                  <input v-model="nuevoBanner.orden" type="number" class="form-control form-control-sm rounded-2" />
                </div>
                <button type="submit" class="btn btn-warning w-100 fw-bold text-dark rounded-pill">Subir Banner</button>
              </form>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="card border-0 shadow-sm p-4 rounded-3 bg-white">
              <h5 class="fw-bold text-dark mb-3">Carrusel Principal Activo</h5>
              <div class="row g-3">
                <div v-for="banner in listaBanners" :key="banner.id" class="col-md-6">
                  <div class="card border shadow-sm rounded-3 overflow-hidden position-relative h-100 bg-light">
                    <img :src="banner.imagen_url" class="w-100 object-fit-cover" style="height: 140px;" alt="Banner" />
                    <div class="p-3 bg-white">
                      <div class="d-flex justify-content-between align-items-start">
                        <div>
                          <strong class="d-block text-dark text-truncate" style="max-width: 180px;">{{ banner.titulo }}</strong>
                          <span class="badge bg-dark rounded-pill mt-1" style="font-size: 0.7rem">Prioridad: {{ banner.orden }}</span>
                        </div>
                        <button @click="eliminarBanner(banner.id)" class="btn btn-sm btn-outline-danger border-0 rounded-circle">
                          <i class="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="listaBanners.length === 0" class="col-12 text-center text-muted small py-5">
                  No hay banners subidos para el carrusel de inicio.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-if="pedidoSeleccionado" class="modal fade show d-block bg-dark bg-opacity-50" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow rounded-4">
          <div class="modal-header bg-light border-0 py-3">
            <h6 class="modal-title fw-bold text-dark mb-0">Detalle Orden #{{ pedidoSeleccionado.id }}</h6>
            <button type="button" class="btn-close" @click="pedidoSeleccionado = null"></button>
          </div>
          <div class="modal-body p-4" style="font-size: 0.9rem">
            <p class="mb-1"><strong>Cliente:</strong> {{ pedidoSeleccionado.nombre_cliente }}</p>
            <p class="mb-1"><strong>Contacto:</strong> {{ pedidoSeleccionado.telefono }}</p>
            <p class="mb-3"><strong>Despacho:</strong> {{ pedidoSeleccionado.metodo_entrega === 'delivery' ? `Delivery en: ${pedidoSeleccionado.direccion_delivery}` : `Envío por MRW a: ${pedidoSeleccionado.ciudad} (${pedidoSeleccionado.agencia_mrw})` }}</p>
            <hr />
            <h6 class="fw-bold mb-2">Artículos del Pedido:</h6>
            <ul class="list-group list-group-flush mb-3">
              <li v-for="item in pedidoSeleccionado.productos" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center px-0 py-1 border-0">
                <span>x{{ item.cantidad }} {{ item.nombre }}</span>
                <span class="text-muted">${{ parseFloat(item.precio).toFixed(2) }}</span>
              </li>
            </ul>
            <hr />
            <div class="d-flex justify-content-between mb-1">
              <span>Total USD:</span>
              <strong class="text-dark">${{ parseFloat(pedidoSeleccionado.total_usd).toFixed(2) }}</strong>
            </div>
            <div class="d-flex justify-content-between">
              <span>Total VES:</span>
              <strong class="text-success">Bs. {{ parseFloat(pedidoSeleccionado.total_ves).toLocaleString('es-VE', {minimumFractionDigits: 2}) }}</strong>
            </div>
          </div>
          <div class="modal-footer border-0 bg-light p-2">
            <button type="button" class="btn btn-sm btn-secondary rounded-pill px-3" @click="pedidoSeleccionado = null">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const API_URL = "http://localhost/KonexApp/backend-php/api.php";

// Variables reactivas principales
const vistaActiva = ref("productos");
const listaCategorias = ref([]);
const listaProductos = ref([]);
const listaPedidos = ref([]);
const listaBanners = ref([]);
const tasaDolar = ref("45.00");

// Filtros y modales
const filtroPedido = ref("");
const pedidoSeleccionado = ref(null);

// Formularios
const formProducto = ref(null);
const formBanner = ref(null);

const nuevoProducto = ref({
  nombre: "",
  id_categoria: "",
  precio_detal: "",
  precio_mayor: "",
  min_mayor: 3,
  stock: 0,
  descripcion: "",
});

const nuevaCategoria = ref({
  nombre: "",
  orden: 1,
});

const nuevoBanner = ref({
  titulo: "",
  link_url: "",
  orden: 1
});

// Binarios multimedia
const imagenSeleccionada = ref(null);
const bannerSeleccionado = ref(null);

// ==========================================
// MÉTODOS DE PEDIDOS
// ==========================================
const obtenerPedidos = async () => {
  try {
    const respuesta = await fetch(`${API_URL}?action=get_pedidos`);
    const datos = await respuesta.json();
    if (!datos.error) listaPedidos.value = datos;
  } catch (error) {
    console.error("Error al cargar pedidos:", error);
  }
};

const pedidosFiltrados = computed(() => {
  if (!filtroPedido.value.trim()) return listaPedidos.value;
  return listaPedidos.value.filter(p => 
    p.nombre_cliente.toLowerCase().includes(filtroPedido.value.toLowerCase())
  );
});

const verDetallesPedido = (pedido) => {
  pedidoSeleccionado.value = pedido;
};

// ==========================================
// MÉTODOS DE BANNERS
// ==========================================
const obtenerBanners = async () => {
  try {
    const respuesta = await fetch(`${API_URL}?action=get_banners`);
    const datos = await respuesta.json();
    if (!datos.error) listaBanners.value = datos;
  } catch (error) {
    console.error("Error al cargar banners:", error);
  }
};

const manejarSeleccionBanner = (event) => {
  const archivo = event.target.files[0];
  if (archivo) bannerSeleccionado.value = archivo;
};

const guardarBanner = async () => {
  try {
    const formData = new FormData();
    formData.append("titulo", nuevoBanner.value.titulo);
    formData.append("link_url", nuevoBanner.value.link_url);
    formData.append("orden", nuevoBanner.value.orden);
    if (bannerSeleccionado.value) {
      formData.append("banner", bannerSeleccionado.value);
    }

    const respuesta = await fetch(`${API_URL}?action=add_banner`, {
      method: "POST",
      body: formData,
    });
    const resultado = await respuesta.json();

    if (resultado.status === "success") {
      alert("¡Banner subido con éxito!");
      nuevoBanner.value = { titulo: "", link_url: "", orden: 1 };
      bannerSeleccionado.value = null;
      if (formBanner.value) formBanner.value.reset();
      obtenerBanners();
    }
  } catch (error) {
    console.error("Error al guardar banner:", error);
  }
};

const eliminarBanner = async (id) => {
  if (!confirm("¿Deseas remover este banner del carrusel?")) return;
  try {
    const respuesta = await fetch(`${API_URL}?action=delete_banner`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const resultado = await respuesta.json();
    if (resultado.status === "success") obtenerBanners();
  } catch (error) {
    console.error("Error al eliminar banner:", error);
  }
};

// ==========================================
// MÉTODOS DE PRODUCTOS
// ==========================================
const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(`${API_URL}?action=get_productos`);
    const datos = await respuesta.json();
    if (!datos.error) listaProductos.value = datos;
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

const manejarSeleccionImagen = (event) => {
  const archivo = event.target.files[0];
  if (archivo) imagenSeleccionada.value = archivo;
};

const guardarProducto = async () => {
  try {
    const formData = new FormData();
    formData.append("nombre", nuevoProducto.value.nombre);
    formData.append("id_categoria", nuevoProducto.value.id_categoria);
    formData.append("precio_detal", nuevoProducto.value.precio_detal);
    formData.append("precio_mayor", nuevoProducto.value.precio_mayor);
    formData.append("min_mayor", nuevoProducto.value.min_mayor);
    formData.append("stock", nuevoProducto.value.stock);
    formData.append("descripcion", nuevoProducto.value.descripcion);

    if (imagenSeleccionada.value) {
      formData.append("imagen", imagenSeleccionada.value);
    }

    const respuesta = await fetch(`${API_URL}?action=add_producto`, {
      method: "POST",
      body: formData,
    });
    const resultado = await respuesta.json();

    if (resultado.status === "success") {
      alert("¡Producto registrado exitosamente!");
      nuevoProducto.value = { nombre: "", id_categoria: "", precio_detal: "", precio_mayor: "", min_mayor: 3, stock: 0, descripcion: "" };
      imagenSeleccionada.value = null;
      if (formProducto.value) formProducto.value.reset();
      obtenerProductos();
    }
  } catch (error) {
    console.error("Error al registrar producto:", error);
  }
};

const eliminarProducto = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
  try {
    const respuesta = await fetch(`${API_URL}?action=delete_producto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const resultado = await respuesta.json();
    if (resultado.status === "success") obtenerProductos();
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
};

// ==========================================
// MÉTODOS DE LAS CATEGORÍAS
// ==========================================
const obtenerCategorias = async () => {
  try {
    const respuesta = await fetch(`${API_URL}?action=get_categorias`);
    const datos = await respuesta.json();
    if (!datos.error) listaCategorias.value = datos;
  } catch (error) {
    console.error("Error al cargar categorías:", error);
  }
};

const guardarCategoria = async () => {
  if (!nuevaCategoria.value.nombre.trim()) return;
  try {
    const respuesta = await fetch(`${API_URL}?action=add_categoria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaCategoria.value),
    });
    const resultado = await respuesta.json();
    if (resultado.status === "success") {
      alert("¡Categoría registrada con éxito!");
      nuevaCategoria.value = { nombre: "", orden: 1 };
      obtenerCategorias();
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
  }
};

const eliminarCategoria = async (id) => {
  if (!confirm("¿Deseas eliminar esta categoría?")) return;
  try {
    const respuesta = await fetch(`${API_URL}?action=delete_categoria`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const resultado = await respuesta.json();
    if (resultado.status === "success") obtenerCategorias();
  } catch (error) {
    console.error("Error al borrar categoría:", error);
  }
};

// ==========================================
// MÉTODOS DE LA TASA DE CAMBIO
// ==========================================
const obtenerTasa = async () => {
  try {
    const respuesta = await fetch(`${API_URL}?action=get_tasa`);
    const datos = await respuesta.json();
    if (datos.tasa) tasaDolar.value = datos.tasa;
  } catch (error) {
    console.error("Error al cargar la tasa:", error);
  }
};

const actualizarTasa = async () => {
  try {
    const respuesta = await fetch(`${API_URL}?action=update_tasa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasa: tasaDolar.value }),
    });
    const resultado = await respuesta.json();
    if (resultado.status === "success") alert("¡Tasa del dólar fijada con éxito!");
  } catch (error) {
    console.error("Error al actualizar tasa:", error);
  }
};

// Sincronización inicial
const inicializarDatos = () => {
  obtenerCategorias();
  obtenerProductos();
  obtenerTasa();
  obtenerPedidos();
  obtenerBanners();
};

onMounted(() => {
  inicializarDatos();
});
</script>

<style scoped>
.nav-tabs .nav-link {
  border: none;
  background: transparent;
}
.nav-tabs .nav-link.active {
  background: transparent;
}
</style>