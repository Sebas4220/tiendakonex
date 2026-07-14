<template>
  <div class="app-container bg-light min-vh-100 pb-5">
    <header class="sticky-top shadow-sm">
      <nav class="navbar bg-black text-white px-3 py-3 border-bottom border-dark">
        <div
          class="d-flex align-items-center justify-content-between w-100 gap-3 flex-wrap flex-md-nowrap"
        >
          <div class="d-flex flex-column lh-1" style="min-width: 120px">
            <span
              class="text-white-50 fw-bold text-center"
              style="font-size: 0.65rem; letter-spacing: 4px; margin-top: -3px"
            >
              TIENDA
            </span>
            <span
              class="fw-black text-warning m-0 p-0 tracking-wider text-center"
              style="
                font-size: 1.6rem;
                font-family: 'Arial Black', sans-serif;
                cursor: pointer;
              "
              @click="categoriaSeleccionada = null"
            >
              KONEX
            </span>
          </div>

          <div
            class="input-group bg-white rounded-2 overflow-hidden border-0 flex-grow-1 mx-md-4 order-3 order-md-2"
            style="max-width: 800px"
          >
            <input
              type="text"
              v-model="busqueda"
              @focus="verBuscadorModal = true"
              @input="verBuscadorModal = true"
              class="form-control bg-white border-0 ps-3 py-1 shadow-none text-dark"
              placeholder="Buscar..."
              style="font-size: 0.9rem"
            />
            <button
              v-if="busqueda"
              class="btn bg-white border-0 text-muted px-2 py-2"
              type="button"
              @click="limpiarBusqueda"
            >
              ✕
            </button>
            <span class="input-group-text bg-white border-0 pe-3 text-muted fs-5">
              <i class="bi bi-search" style="font-size: 0.95rem"></i>
            </span>
          </div>

          <div class="d-flex align-items-center gap-4 order-2 order-md-3 ms-auto ms-md-0">
            <div
              class="btn-group btn-group-sm border border-secondary overflow-hidden bg-dark"
              role="group"
            >
              <button
                type="button"
                class="btn btn-sm px-2.5 py-2 fw-bold border-0"
                style="font-size: 0.7rem"
                :class="
                  monedaActiva === 'USD'
                    ? 'btn-warning text-black shadow-sm'
                    : 'btn-dark text-white'
                "
                @click="monedaActiva = 'USD'"
              >
                $ USD
              </button>
              <button
                type="button"
                class="btn btn-sm px-2.5 py-1 fw-bold border-0"
                style="font-size: 0.7rem"
                :class="
                  monedaActiva === 'VES'
                    ? 'btn-warning text-black shadow-sm'
                    : 'btn-dark text-white'
                "
                @click="monedaActiva = 'VES'"
              >
                Bs VES
              </button>
            </div>

            <a
              href="#"
              @click.prevent="verFavoritosModal = true"
              class="d-flex align-items-center gap-4 text-decoration-none text-white fw-bold fs-6 d-md-block d-none"
            >
              <i class="bi bi-heart" style="font-size: 1.2rem"></i>
              <span class="ms-2" style="font-size: 0.8rem">Favoritos</span>
            </a>

            <button
              class="btn text-white position-relative p-1 border-0 d-none d-md-block"
              @click="verCarrito = true"
            >
              <i class="bi bi-cart3" style="font-size: 1.2rem"></i>

              <span
                v-if="carritoStore.totalItems > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                style="font-size: 0.65rem"
              >
                {{ carritoStore.totalItems }}
              </span>
              <span class="ms-2" style="font-size: 0.8rem">Carrito</span>
            </button>
          </div>
        </div>
      </nav>

      <div class="bg-white py-2 border-bottom overflow-x-auto text-nowrap hide-scrollbar scroll-categorias">
  <div class="container-fluid" style="font-size: 0.8rem">
    <!-- Agregamos flex-nowrap para forzar una sola fila y activar el scroll horizontal en móvil -->
    <ul class="nav flex-nowrap align-items-center justify-content-start justify-content-md-center">
      <li v-for="cat in datos.categorias" :key="cat.id" class="nav-item">
        <button
          class="nav-link ps-1 pe-3 py-1 fw-semibold border-0 bg-transparent"
          :class="
            categoriaSeleccionada === cat.id
              ? 'text-dark fw-bold border-bottom border-dark'
              : 'text-muted'
          "
          @click="
            categoriaSeleccionada = cat.id;
            verCategoriaModal = true;
          "
        >
          {{ cat.nombre }}
        </button>
      </li>
    </ul>
  </div>
</div>

    </header>

    <!-- MODAL DE VISTA DEDICADA POR CATEGORÍA -->
    <div
      v-if="verCategoriaModal"
      class="custom-modal-backdrop"
      @click="verCategoriaModal = false"
      style="z-index: 1080"
    ></div>

    <div
      :class="['detalle-modal bg-white rounded-t-4  p-3', { open: verCategoriaModal }]"
      style="z-index: 1081"
    >
      <!-- Cabecera dinámica -->
      <div
        class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3"
      >
        <h6
          class="fw-bold mb-0 text-dark text-uppercase small d-flex align-items-center gap-2"
        >
          <i class="bi bi-grid-fill text-primary"></i> {{ nombreCategoriaSeleccionada }}
        </h6>
        <button class="btn-close" @click="verCategoriaModal = false"></button>
      </div>

      <!-- Contenedor Scrolleable de Productos -->
      <div class="overflow-y-auto pe-1" style="max-height: 75vh">
        <!-- Si la categoría no tiene productos asignados -->
        <div
          v-if="productosFiltradosCategoria.length === 0"
          class="text-center py-5 text-muted"
        >
          <i class="bi bi-box-seam fs-1 d-block mb-2 text-secondary-subtle"></i>
          <p class="small mb-0">No hay productos en esta categoría por ahora.</p>
        </div>

        <!-- Lista de Productos Filtrados -->
        <div v-else class="d-flex flex-column gap-3">
          <div
            v-for="prod in productosFiltradosCategoria"
            :key="prod.id"
            class="d-flex align-items-center gap-2 p-2 rounded-4 border bg-light position-relative"
            style="height: 90px"
          >
            <!-- Miniatura del Producto -->
            <img
              :src="prod.imagen"
              class="rounded-3 object-fit-cover cursor-pointer flex-shrink-0"
              style="width: 70px; height: 70px"
              @click="
                verCategoriaModal = false;
                abrirDetalle(prod);
              "
            />

            <!-- Info Principal protegida contra desbordamientos -->
            <div
              class="flex-grow-1 min-w-0 cursor-pointer px-1"
              @click="
                verCategoriaModal = false;
                abrirDetalle(prod);
              "
              style="max-width: calc(100% - 170px)"
            >
              <h6 class="text-dark text-truncate mb-1 fw-bold" style="font-size: 0.85rem">
                {{ prod.nombre }}
              </h6>

              <div class="lh-sm">
                <!-- Precio Mayor -->
                <div
                  class="text-success fw-bold text-truncate"
                  style="font-size: 0.85rem"
                >
                  {{ formatearPrecio(prod.precio_mayor) }}
                  <span
                    class="badge bg-success-subtle text-success p-1 ms-0.5"
                    style="font-size: 0.55rem"
                    >Mayor</span
                  >
                </div>
                <!-- Precio Detal -->
                <div class="text-secondary text-truncate" style="font-size: 0.75rem">
                  {{ formatearPrecio(prod.precio_detal) }}
                  <span class="small text-muted" style="font-size: 0.65rem">Detal</span>
                </div>
              </div>
            </div>

            <!-- Acciones Laterales (Botón Corazón de Favoritos + Incrementador) -->
            <div
              class="d-flex flex-column align-items-end justify-content-between h-100 py-1 flex-shrink-0 ms-auto"
              style="width: 95px"
            >
              <!-- Switch rápido de Favoritos -->
              <button
                class="btn p-0 border-0 bg-transparent text-danger"
                @click="prod.esFavorito = !prod.esFavorito"
              >
                <i :class="prod.esFavorito ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
              </button>

              <!-- Control de Cantidades -->
              <div class="w-100">
                <!-- Incrementador de Unidades si ya existe en carrito -->
                <div
                  v-if="obtenerCantidadEnCarrito(prod.id) > 0"
                  class="d-flex align-items-center justify-content-between border rounded-pill bg-white p-1 shadow-sm"
                >
                  <button
                    class="btn btn-sm btn-light border-0 rounded-circle fw-bold d-flex align-items-center justify-content-center"
                    style="width: 22px; height: 22px; font-size: 0.75rem"
                    @click="
                      carritoStore.modificarCantidad(
                        prod.id,
                        obtenerCantidadEnCarrito(prod.id) - 1
                      )
                    "
                  >
                    -
                  </button>
                  <span
                    class="fw-bold small px-1 text-primary"
                    style="font-size: 0.75rem"
                  >
                    {{ obtenerCantidadEnCarrito(prod.id) }}
                  </span>
                  <button
                    class="btn btn-sm btn-light border-0 rounded-circle fw-bold d-flex align-items-center justify-content-center"
                    style="width: 22px; height: 22px; font-size: 0.75rem"
                    @click="
                      carritoStore.modificarCantidad(
                        prod.id,
                        obtenerCantidadEnCarrito(prod.id) + 1
                      )
                    "
                  >
                    +
                  </button>
                </div>

                <!-- Botón Agregar si no está en carrito -->
                <button
                  v-else
                  class="btn btn-warning btn-sm w-100 rounded-pill fw-bold text-dark shadow-sm py-1"
                  style="font-size: 0.72rem"
                  @click="carritoStore.agregarProducto(prod)"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="verFavoritosModal"
      class="custom-modal-backdrop"
      @click="verFavoritosModal = false"
      style="z-index: 1080"
    ></div>

    <div
      :class="['detalle-modal bg-white rounded-t-4  p-3', { open: verFavoritosModal }]"
      style="z-index: 1081"
    >
      <div
        class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3"
      >
        <h6
          class="fw-bold mb-0 text-dark text-uppercase small d-flex align-items-center gap-2"
        >
          <i class="bi bi-heart-fill text-danger"></i> Mis Favoritos
        </h6>
        <button class="btn-close" @click="verFavoritosModal = false"></button>
      </div>

      <div class="overflow-y-auto pe-1" style="max-height: 75vh">
        <div
          v-if="productos.filter((p) => p.esFavorito).length === 0"
          class="text-center py-5 text-muted"
        >
          <i class="bi bi-heart fs-1 d-block mb-2 text-secondary-subtle"></i>
          <p class="small mb-0">Aún no tienes productos guardados.</p>
        </div>

        <div v-else class="d-flex flex-column gap-3">
          <div
            v-for="prod in productos.filter((p) => p.esFavorito)"
            :key="prod.id"
            class="d-flex align-items-center gap-2 p-2 rounded-4 border bg-light position-relative"
            style="height: 90px"
          >
            <img
              :src="prod.imagen"
              class="rounded-3 object-fit-cover cursor-pointer flex-shrink-0"
              style="width: 70px; height: 70px"
              @click="
                verFavoritosModal = false;
                abrirDetalle(prod);
              "
            />

            <div
              class="flex-grow-1 min-w-0 cursor-pointer px-1"
              @click="
                verFavoritosModal = false;
                abrirDetalle(prod);
              "
              style="max-width: calc(100% - 230px)"
            >
              <h6 class="text-dark text-truncate mb-1 fw-bold" style="font-size: 0.85rem">
                {{ prod.nombre }}
              </h6>

              <div class="lh-sm">
                <div
                  class="text-success fw-bold text-truncate"
                  style="font-size: 0.85rem"
                >
                  {{ formatearPrecio(prod.precio_mayor) }}
                  <span
                    class="badge bg-success-subtle text-success p-1 ms-0.5"
                    style="font-size: 0.55rem"
                    >Mayor</span
                  >
                </div>
                <div class="text-secondary text-truncate" style="font-size: 0.75rem">
                  {{ formatearPrecio(prod.precio_detal) }}
                  <span class="small text-muted" style="font-size: 0.65rem">Detal</span>
                </div>
              </div>
            </div>

            <div
              class="d-flex flex-column align-items-end justify-content-between h-100 py-1 flex-shrink-0 ms-auto"
              style="width: 95px"
            >
              <button
                class="btn p-0 border-0 bg-transparent text-secondary"
                @click="prod.esFavorito = false"
              >
                <i class="bi bi-trash3 fs-6"></i>
              </button>

              <div class="w-100">
                <div
                  v-if="obtenerCantidadEnCarrito(prod.id) > 0"
                  class="d-flex align-items-center justify-content-between border rounded-pill bg-white p-1"
                >
                  <button
                    class="btn btn-sm btn-light border-0 rounded-circle fw-bold d-flex align-items-center justify-content-center"
                    style="width: 22px; height: 22px; font-size: 0.75rem"
                    @click="
                      carritoStore.modificarCantidad(
                        prod.id,
                        obtenerCantidadEnCarrito(prod.id) - 1
                      )
                    "
                  >
                    -
                  </button>
                  <span
                    class="fw-bold small px-1 text-primary"
                    style="font-size: 0.75rem"
                  >
                    {{ obtenerCantidadEnCarrito(prod.id) }}
                  </span>
                  <button
                    class="btn btn-sm btn-light border-0 rounded-circle fw-bold d-flex align-items-center justify-content-center"
                    style="width: 22px; height: 22px; font-size: 0.75rem"
                    @click="
                      carritoStore.modificarCantidad(
                        prod.id,
                        obtenerCantidadEnCarrito(prod.id) + 1
                      )
                    "
                  >
                    +
                  </button>
                </div>

                <button
                  v-else
                  class="btn btn-warning btn-sm w-100 rounded-pill fw-bold text-dark shadow-sm py-1"
                  style="font-size: 0.72rem"
                  @click="carritoStore.agregarProducto(prod)"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="verBuscadorModal"
      class="buscador-modal-backdrop"
      @click="verBuscadorModal = false"
    ></div>
    <div :class="['buscador-modal bg-white p-3 shadow-lg', { open: verBuscadorModal }]">
      <div class="d-flex gap-2 align-items-center mb-3">
        <div
          class="input-group bg-light rounded-pill overflow-hidden border border-light-subtle flex-grow-1"
        >
          <span class="input-group-text bg-light border-0 pe-1 text-muted fs-6"
            ><i class="bi bi-search" style="font-size: 0.95rem"></i
          ></span>
          <input
            type="text"
            v-model="busqueda"
            ref="inputModal"
            class="form-control bg-light border-0 ps-2 py-2 shadow-none"
            placeholder="Escribe para buscar..."
            style="font-size: 0.9rem"
          />
          <button
            v-if="busqueda"
            class="btn bg-light border-0 text-muted px-3"
            type="button"
            @click="busqueda = ''"
          >
            ✕
          </button>
        </div>
        <button
          class="btn btn-sm text-secondary fw-bold px-1 text-nowrap"
          @click="verBuscadorModal = false"
        >
          Cancelar
        </button>
      </div>

      <div class="resultados-container overflow-y-auto" style="max-height: 80vh">
        <p class="small text-muted mb-2 px-1" v-if="busqueda">
          Resultados para "{{ busqueda }}" ({{ productosFiltradosBuscador.length }})
        </p>

        <div
          v-if="productosFiltradosBuscador.length === 0"
          class="text-center py-5 text-muted"
        >
          <span class="fs-1 d-block mb-2"
            ><i class="bi bi-box-seam" style="font-size: 4.5rem"></i
          ></span>
          <p class="small">No encontramos productos que coincidan.</p>
        </div>

        <div
          v-for="prod in productosFiltradosBuscador"
          :key="prod.id"
          class="d-flex gap-3 align-items-center border-bottom py-2 cursor-pointer"
        >
          <div
            class="d-flex gap-3 align-items-center flex-grow-1 min-w-0"
            @click="abrirDetalle(prod)"
          >
            <img
              :src="prod.imagen"
              class="rounded-3 object-fit-cover"
              style="width: 55px; height: 55px"
            />
            <div class="flex-grow-1 min-w-0">
              <h6 class="mb-0 text-dark text-truncate small fw-bold">
                {{ prod.nombre }}
              </h6>
              <div class="d-flex flex-column gap-0.5 mt-1">
                <span class="text-success fw-bold small">
                  {{ formatearPrecio(prod.precio_mayor) }}
                  <span style="font-size: 0.65rem">(Mayor)</span>
                </span>
                <span class="text-secondary small" style="font-size: 0.75rem">
                  {{ formatearPrecio(prod.precio_detal) }}
                  <span style="font-size: 0.65rem">(Detal)</span>
                  <span v-if="monedaActiva === 'USD'" class="text-muted fw-normal ms-1"
                    >≈ {{ formatearBs(prod.precio_detal) }}</span
                  >
                </span>
              </div>
            </div>
          </div>

          <div
            class="d-flex align-items-center gap-2"
            v-if="obtenerCantidadEnCarrito(prod.id) > 0"
          >
            <button
              class="btn btn-sm btn-light border rounded-circle p-1 d-flex align-items-center justify-content-center"
              style="width: 28px; height: 28px"
              @click="
                carritoStore.modificarCantidad(
                  prod.id,
                  obtenerCantidadEnCarrito(prod.id) - 1
                )
              "
            >
              -
            </button>
            <span class="fw-bold small px-1" style="min-width: 15px; text-align: center">
              {{ obtenerCantidadEnCarrito(prod.id) }}
            </span>
            <button
              class="btn btn-sm btn-light border rounded-circle p-1 d-flex align-items-center justify-content-center"
              style="width: 28px; height: 28px"
              @click="
                carritoStore.modificarCantidad(
                  prod.id,
                  obtenerCantidadEnCarrito(prod.id) + 1
                )
              "
            >
              +
            </button>
          </div>
          <button
            v-else
            class="btn btn-dark text-white btn-sm rounded-pill px-3"
            @click="carritoStore.agregarProducto(prod)"
          >
            +
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="verDetalleModal"
      class="custom-modal-backdrop"
      @click="verDetalleModal = false"
      style="z-index: 1070"
    ></div>
    <div :class="['detalle-modal bg-white rounded-t-4 p-3', { open: verDetalleModal }]">
      <div
        class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3"
      >
        <h6 class="fw-bold mb-0 text-muted text-uppercase small">Especificaciones</h6>
        <button class="btn-close" @click="verDetalleModal = false"></button>
      </div>

      <div
        v-if="productoSeleccionado"
        class="d-flex flex-column justify-content-between h-100 pb-4"
      >
        <div class="overflow-y-auto flex-grow-1 pe-1" style="max-height: 70vh">
          <img
            :src="productoSeleccionado.imagen"
            class="w-100 rounded-4 object-fit-cover mb-3 shadow-sm"
            style="height: 220px"
          />

          <h5 class="fw-bold text-dark mb-1">{{ productoSeleccionado.nombre }}</h5>
          <span class="badge bg-primary-subtle text-primary mb-3"
            >ID: #{{ productoSeleccionado.id }}</span
          >

          <p class="text-secondary small mb-3 lh-sm">
            {{
              productoSeleccionado.descripcion ||
              "Garantía oficial del fabricante. Empaque sellado de alta resistencia ideal para distribución y reventa al mayor con márgenes optimizados."
            }}
          </p>

          <div class="card bg-light border-0 p-3 rounded-4 mb-3">
            <div
              class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-white"
            >
              <div>
                <span class="d-block text-success fw-bold fs-4">{{
                  formatearPrecio(productoSeleccionado.precio_mayor)
                }}</span>
                <small v-if="monedaActiva === 'USD'" class="text-muted d-block lh-1 mb-1"
                  >≈ {{ formatearBs(productoSeleccionado.precio_mayor) }}</small
                >
                <span class="text-muted small" style="font-size: 0.75rem"
                  >Precio al Mayor</span
                >
              </div>
              <span
                class="badge bg-success rounded-pill px-2 py-1"
                style="font-size: 0.7rem"
              >
                Mínimo: {{ productoSeleccionado.minimo_mayor }} uds
              </span>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="d-block text-secondary fw-semibold fs-5">{{
                  formatearPrecio(productoSeleccionado.precio_detal)
                }}</span>
                <small v-if="monedaActiva === 'USD'" class="text-muted d-block lh-1 mb-1"
                  >≈ {{ formatearBs(productoSeleccionado.precio_detal) }}</small
                >
                <span class="text-muted small" style="font-size: 0.75rem"
                  >Precio al Detal</span
                >
              </div>
              <span class="text-muted small italic" style="font-size: 0.7rem">
                Menos de {{ productoSeleccionado.minimo_mayor }} uds
              </span>
            </div>
          </div>
        </div>

        <div class="mb-5 bg-white">
          <div
            v-if="obtenerCantidadEnCarrito(productoSeleccionado.id) > 0"
            class="d-flex align-items-center justify-content-between border rounded-pill p-2 bg-light"
          >
            <button
              class="btn btn-white text-dark border rounded-circle fw-bold d-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px"
              @click="
                carritoStore.modificarCantidad(
                  productoSeleccionado.id,
                  obtenerCantidadEnCarrito(productoSeleccionado.id) - 1
                )
              "
            >
              -
            </button>
            <div class="text-center">
              <span class="fw-bold text-dark d-block">
                {{ obtenerCantidadEnCarrito(productoSeleccionado.id) }}
              </span>
            </div>
            <button
              class="btn btn-white text-dark border rounded-circle fw-bold d-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px"
              @click="
                carritoStore.modificarCantidad(
                  productoSeleccionado.id,
                  obtenerCantidadEnCarrito(productoSeleccionado.id) + 1
                )
              "
            >
              +
            </button>
          </div>
          <button
            v-else
            class="btn btn-warning text-dark shadow-sm btn w-100 rounded-pill py-2 fw-bold"
            @click="carritoStore.agregarProducto(productoSeleccionado)"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="datos.banners?.length"
      id="bannerCarousel"
      class="carousel slide my-3 px-3"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner rounded-4 shadow-sm">
        <div
          v-for="(banner, index) in datos.banners"
          :key="banner.id"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <img
            :src="banner.imagen"
            class="d-block w-100 object-fit-cover"
            style="height: 160px"
            :alt="banner.titulo"
          />
        </div>
      </div>
    </div>

    <div class="container-fluid px-3 mb-5">
      <div class="row g-3">
        <!-- CAMBIADO: Ahora recorre 'productos' para mantenerse fijo y sin filtros -->
        <div v-for="prod in productos" :key="prod.id" class="col-6">
          <div
            class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative"
          >
            <button
              class="btn p-0 rounded-circle d-flex align-items-center justify-content-center position-absolute shadow-sm toggle-favorito-btn"
              style="
                top: 10px;
                right: 10px;
                width: 32px;
                height: 32px;
                z-index: 10;
                transition: transform 0.2s ease;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                border: 1px solid rgba(0, 0, 0, 0.08);
              "
              @click.stop="prod.esFavorito = !prod.esFavorito"
            >
              <i
                class="bi"
                :class="
                  prod.esFavorito
                    ? 'bi-heart-fill text-danger fs-5'
                    : 'bi-heart text-dark fs-5'
                "
              ></i>
            </button>

            <div class="cursor-pointer" @click="abrirDetalle(prod)">
              <img
                :src="prod.imagen"
                class="card-img-top object-fit-cover"
                style="height: 130px"
                :alt="prod.nombre"
              />
              <div class="p-2 pb-0">
                <h6
                  class="card-title text-dark text-truncate mb-1"
                  style="font-size: 0.88rem"
                >
                  {{ prod.nombre }}
                </h6>
                <p class="small text-muted mb-1 mb-md-2" style="font-size: 0.72rem">
                  Mín. Mayor: {{ prod.minimo_mayor }}u
                </p>
                <div class="lh-sm">
                  <div class="text-success fw-bold" style="font-size: 0.9rem">
                    {{ formatearPrecio(prod.precio_mayor) }}
                    <span
                      class="badge bg-success-subtle text-success p-1 ms-0.5"
                      style="font-size: 0.6rem"
                      >Mayor</span
                    >
                  </div>
                  <div class="text-secondary" style="font-size: 0.78rem">
                    {{ formatearPrecio(prod.precio_detal) }}
                    <span class="small text-muted" style="font-size: 0.65rem">Detal</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-body p-2 pt-1 d-flex flex-column justify-content-end">
              <div
                v-if="obtenerCantidadEnCarrito(prod.id) > 0"
                class="d-flex align-items-center justify-content-between border rounded-pill mt-2 bg-white p-1 shadow-sm"
              >
                <button
                  class="btn btn-sm btn-light text-dark border-0 rounded-circle fw-bold d-flex align-items-center justify-content-center"
                  style="width: 28px; height: 28px"
                  @click="
                    carritoStore.modificarCantidad(
                      prod.id,
                      obtenerCantidadEnCarrito(prod.id) - 1
                    )
                  "
                >
                  -
                </button>
                <span class="fw-bold small px-1 text-dark">{{
                  obtenerCantidadEnCarrito(prod.id)
                }}</span>
                <button
                  class="btn btn-sm btn-light text-dark border-0 rounded-circle fw-bold d-flex align-items-center justify-content-center"
                  style="width: 28px; height: 28px"
                  @click="
                    carritoStore.modificarCantidad(
                      prod.id,
                      obtenerCantidadEnCarrito(prod.id) + 1
                    )
                  "
                >
                  +
                </button>
              </div>

              <button
                v-else
                class="btn btn-warning btn-sm w-100 rounded-pill mt-2 fw-bold text-dark shadow-sm"
                @click="carritoStore.agregarProducto(prod)"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="verCarrito"
      class="custom-modal-backdrop"
      @click="verCarrito = false"
    ></div>
    <div :class="['carrito-sidebar bg-white p-3', { open: verCarrito }]">
      <!-- CABECERA DEL SIDEBAR -->
      <div
        class="d-flex justify-content-between pb-3 align-items-center border-bottom pb-2.5 mb-3"
      >
        <h5 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
          <i class="bi bi-bag-check-fill text-dark me-1"></i> Tu Pedido
        </h5>
        <button class="btn-close shadow-none" @click="verCarrito = false"></button>
      </div>

      <!-- 1. ESTADO VACÍO MEJORADO VISUALMENTE -->
      <div
        v-if="carritoStore.items.length === 0"
        class="text-center py-5 my-auto text-muted"
      >
        <i class="bi bi-cart-x d-block display-4 mb-2 text-secondary-subtle"></i>
        <p class="fw-bold text-dark mb-1">Tu carrito está vacío</p>
        <p class="small mb-0 text-secondary">Explora el catálogo y añade tus productos</p>
      </div>

      <!-- 2. CONTENIDO DEL CARRITO ACTIVO -->
      <div v-else class="d-flex flex-column h-100 justify-content-between pb-5">
        <!-- Lista de Productos con Scroll Organizado -->
        <div class="overflow-y-auto flex-grow-1 pe-1" style="max-height: 42vh">
          <div
            v-for="item in carritoStore.itemsProcesados"
            :key="item.id"
            class="d-flex gap-3 align-items-center border-bottom py-2.5"
          >
            <!-- Imagen con bordes finos -->
            <img
              :src="item.imagen"
              class="rounded-3 object-fit-cover border flex-shrink-0"
              style="width: 52px; height: 52px"
            />

            <!-- Detalles de Textos y Precios -->
            <div class="flex-grow-1 min-w-0">
              <h6
                class="mb-0 text-dark text-truncate"
                style="
                  max-width: 140px;
                  font-size: 0.88rem;
                  font-weight: 700;
                  line-height: 1.2;
                "
              >
                {{ item.nombre }}
              </h6>

              <div class="mt-0.5">
                <small
                  :class="item.esMayor ? 'text-success fw-bold' : 'text-muted'"
                  style="font-size: 0.75rem"
                >
                  {{ formatearPrecio(item.precioUnitario) }}
                  <span
                    v-if="item.esMayor"
                    class="badge bg-success-subtle text-success p-1 ms-0.5"
                    style="font-size: 0.55rem; font-weight: 700"
                    >Mayor</span
                  >
                </small>
              </div>

              <div class="fw-bold text-dark small mt-0.5" style="font-size: 0.82rem">
                {{ formatearPrecio(item.subtotal) }}
                <span
                  v-if="monedaActiva === 'USD'"
                  class="text-muted fw-normal ms-1"
                  style="font-size: 0.72rem"
                >
                  (≈ {{ formatearBs(item.subtotal) }})
                </span>
              </div>
            </div>

            <!-- Controles de Cantidad Estilizados -->
            <div
              class="d-flex align-items-center border rounded-pill bg-white p-1 shadow-sm flex-shrink-0"
            >
              <button
                type="button"
                class="btn btn-sm btn-light border-0 rounded-circle fw-bold d-flex align-items-center justify-content-center p-0"
                style="width: 24px; height: 24px; font-size: 0.85rem"
                @click="carritoStore.modificarCantidad(item.id, item.cantidad - 1)"
              >
                -
              </button>
              <span
                class="px-2 small fw-bold text-dark text-center"
                style="min-width: 22px"
                >{{ item.cantidad }}</span
              >
              <button
                type="button"
                class="btn btn-sm btn-light border-0 rounded-circle fw-bold d-flex align-items-center justify-content-center p-0"
                style="width: 24px; height: 24px; font-size: 0.85rem"
                @click="carritoStore.modificarCantidad(item.id, item.cantidad + 1)"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <!-- Formularios de Envío / Pago y Totales -->
        <div class="border-top pt-3 mt-2">
          <!-- Sección: Datos de Entrega -->
          <div class="mb-3">
            <h6
              class="fw-bold mb-2 text-dark d-flex align-items-center gap-1.5"
              style="font-size: 0.9rem"
            >
              <i
                class="bi bi-geo-alt-fill text-muted me-1"
                style="font-size: 0.95rem"
              ></i>
              Datos de Entrega
            </h6>

            <div class="d-flex gap-2 mb-2">
              <button
                type="button"
                class="btn btn-sm w-50 rounded-pill py-2 border d-flex align-items-center justify-content-center gap-1.5 fw-bold shadow-sm transition-all"
                :class="
                  form.metodoEntrega === 'delivery'
                    ? 'btn-warning border-warning text-dark'
                    : 'btn-light bg-white text-secondary border-light-subtle'
                "
                @click="form.metodoEntrega = 'delivery'"
              >
                <i class="bi bi-scooter me-1"></i> Delivery Local
              </button>
              <button
                type="button"
                class="btn btn-sm w-50 rounded-pill py-2 border d-flex align-items-center justify-content-center gap-1.5 fw-bold shadow-sm transition-all"
                :class="
                  form.metodoEntrega === 'mrw'
                    ? 'btn-warning border-warning text-dark'
                    : 'btn-light bg-white text-secondary border-light-subtle'
                "
                @click="form.metodoEntrega = 'mrw'"
              >
                <i class="bi bi-box-seam me-1"></i> Envío por MRW
              </button>
            </div>

            <input
              type="text"
              v-model="form.nombre"
              class="form-control form-control-sm mb-2 rounded-3 shadow-sm border-light-subtle"
              placeholder="Nombre completo"
            />

            <!-- Inputs Delivery -->
            <div v-if="form.metodoEntrega === 'delivery'">
              <input
                type="text"
                v-model="form.telefono"
                class="form-control form-control-sm mb-2 rounded-3 shadow-sm border-light-subtle"
                placeholder="Teléfono de contacto"
              />
              <textarea
                v-model="form.direccionDelivery"
                class="form-control form-control-sm mb-2 rounded-3 shadow-sm border-light-subtle"
                rows="2"
                placeholder="Dirección exacta de entrega / Puntos de referencia"
              ></textarea>
            </div>

            <!-- Inputs MRW -->
            <div v-if="form.metodoEntrega === 'mrw'">
              <div class="row g-2 mb-2">
                <div class="col-6">
                  <input
                    type="text"
                    v-model="form.cedula"
                    class="form-control form-control-sm rounded-3 shadow-sm border-light-subtle"
                    placeholder="Cédula de Identidad"
                  />
                </div>
                <div class="col-6">
                  <input
                    type="text"
                    v-model="form.telefono"
                    class="form-control form-control-sm rounded-3 shadow-sm border-light-subtle"
                    placeholder="Teléfono"
                  />
                </div>
              </div>
              <input
                type="text"
                v-model="form.ciudad"
                class="form-control form-control-sm mb-2 rounded-3 shadow-sm border-light-subtle"
                placeholder="Ciudad y Estado destino"
              />
              <input
                type="text"
                v-model="form.agenciaMRW"
                class="form-control form-control-sm mb-2 rounded-3 shadow-sm border-light-subtle"
                placeholder="Nombre o Código de la Oficina MRW"
              />
            </div>
          </div>

          <!-- Sección: Método de Pago -->
          <div class="border-top pt-3 mb-3">
            <h6
              class="fw-bold mb-2 py-2 text-dark d-flex align-items-center gap-1.5"
              style="font-size: 0.9rem"
            >
              <i
                class="bi bi-credit-card-fill text-muted me-2"
                style="font-size: 0.95rem"
              ></i>
              Forma de Pago
            </h6>
            <div class="row g-2">
              <div class="col-12">
                <div class="mb-1">
                  <select
                    id="metodoPago"
                    v-model="form.metodoPago"
                    class="form-select rounded-3 py-2 px-3 border-light-subtle text-dark fw-semibold shadow-sm text-secondary"
                    :class="{ 'text-dark': form.metodoPago }"
                  >
                    <option value="" disabled selected hidden>
                      Selecciona cómo vas a pagar...
                    </option>
                    <option value="pago_movil">📱 Pago Móvil</option>
                    <option value="zinli">💳 Zinli</option>
                    <option value="usdt">🟢 USDT (Binance)</option>
                    <option value="efectivo">💵 Efectivo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Caja de Totales Estilo Ticket -->
          <div
            class="bg-light p-3 rounded-4 my-3 border border-light-subtle shadow-inner"
          >
            <div
              class="d-flex justify-content-between align-items-center fw-medium text-secondary mb-1.5"
              style="font-size: 0.85rem"
            >
              <span>Total Ref USD:</span>
              <span class="text-dark fw-bold"
                >${{ carritoStore.totalPagar.toFixed(2) }}</span
              >
            </div>
            <div
              class="d-flex justify-content-between align-items-center fw-bold border-top pt-2 mt-1.5"
            >
              <span class="text-dark">Total a Pagar:</span>
              <span class="text-dark fs-5 fw-bold">
                {{
                  monedaActiva === "VES"
                    ? totalPagarBs
                    : `$${carritoStore.totalPagar.toFixed(2)}`
                }}
              </span>
            </div>
            <!-- Fila VES (Bolívares) -->
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary fw-small">Monto en BS:</span>
              <span class="text-dark fw-bold">{{ totalPagarBs }}</span>
            </div>
          </div>

          <button
            class="btn btn-success mb-5 w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow"
            @click="enviarAWhatsApp"
          >
            <i class="bi bi-whatsapp"></i> Enviar pedido por WhatsApp
          </button>
        </div>
      </div>
    </div>

    <div
      class="bottom-nav bg-white d-flex justify-content-around align-items-center d-md-none border-top"
    >
      <button
        class="nav-item-btn text-decoration-none border-0 bg-transparent transition-all"
        :class="!categoriaSeleccionada && !busqueda ? 'text-dark' : 'text-dark'"
        @click="
          categoriaSeleccionada = null;
          busqueda = '';
          verBuscadorModal = false;
        "
      >
        <!-- Lista de Favoritos -->
        <a
          href="#"
          @click.prevent="verFavoritosModal = true"
          class="nav-item-btn text-decoration-none border-0 bg-transparent transition-all text-decoration-none text-dark"
        >
          <i class="bi bi-heart fs-4 d-block"></i>
        </a>
      </button>

      <button
        class="nav-item-btn text-decoration-none border-0 bg-transparent position-relative transition-all"
        :class="verCarrito ? 'text-dark' : 'text-dark'"
        @click="verCarrito = true"
      >
        <div class="position-relative d-inline-block">
          <i class="bi bi-cart3 fs-4 d-block"></i>
          <span
            v-if="carritoStore.totalItems > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
            style="font-size: 0.6rem; padding: 0.2rem 0.35rem"
          >
            {{ carritoStore.totalItems }}
          </span>
        </div>
        <!--  
        <span class="nav-label fw-bold mt-1">Mi Carrito</span>
        -->
      </button>

      <button
        class="nav-item-btn text-decoration-none border-0 bg-transparent text-dark transition-all"
        @click="abrirSoporte"
      >
        <i class="bi bi-whatsapp fs-4 d-block"></i>
        <!--  
        <span class="nav-label fw-bold mt-1">Soporte</span>
      --></button>
    </div>
  </div>

  <!-- POPUP DE REDIRECCIÓN EN COLA (B5 FADE / BACKDROP) -->
  <div
    v-if="mostrarPopupSoporte"
    class="modal fade show d-block"
    tabindex="-1"
    style="background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); z-index: 1060"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm px-3">
      <div class="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
        <!-- Barra decorativa superior con tu amarillo de marca -->
        <div class="bg-warning" style="height: 6px"></div>

        <div class="modal-body text-center py-4 px-3">
          <!-- Iconografía Condicional Activa -->
          <div class="position-relative d-inline-block mb-3">
            <i
              class="bi display-4"
              :class="
                mensajePendiente
                  ? 'bi-check-circle-fill text-success'
                  : 'bi-whatsapp text-success'
              "
            ></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark fw-bold shadow-sm"
            >
              {{ contadorSegundos }}s
            </span>
          </div>

          <!-- Título Dinámico -->
          <h5 class="fw-bold text-dark mb-2">
            {{ mensajePendiente ? "¡Pedido Procesado!" : "Contactar Soporte" }}
          </h5>

          <!-- Mensaje Informativo Adaptable -->
          <p class="text-secondary small mb-0 px-1">
            <template v-if="mensajePendiente">
              Tu pedido se procesó con éxito. En
              <span class="fw-bold text-warning-emphasis"
                >{{ contadorSegundos }} segundos</span
              >
              serás redireccionado con un asesor de ventas.
            </template>
            <template v-else>
              Estamos preparando tu canal de atención. En
              <span class="fw-bold text-warning-emphasis"
                >{{ contadorSegundos }} segundos</span
              >
              serás redireccionado para resolver tus dudas.
            </template>
          </p>

          <!-- Spinner de Carga de Bootstrap -->
          <div class="d-flex justify-content-center mt-3">
            <div class="spinner-border spinner-border-sm text-warning" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useCarritoStore } from "~/stores/carrito";

// --- IMPORTACIONES DE LOS ARCHIVOS INDEPENDIENTES ---
import { PRODUCTOS, CATEGORIAS } from "~/constants/tiendaData";
import { BANNERS } from "~/constants/bannersData";

const carritoStore = useCarritoStore();
const categoriaSeleccionada = ref(null);
const verCarrito = ref(false);
const busqueda = ref("");
const verBuscadorModal = ref(false);
const verDetalleModal = ref(false);
const verFavoritosModal = ref(false);
const productoSeleccionado = ref(null);
const verCategoriaModal = ref(false);

// --- ESTADO PARA EL POPUP DE REDIRECCIÓN Y SOPORTE ---
const mostrarPopupSoporte = ref(false);
const contadorSegundos = ref(5);
let intervaloRedireccion = null;
const mensajePendiente = ref(null); 

// --- ESTADO PARA EL SWITCH DE MONEDA ---
const monedaActiva = ref("USD"); 

// Tasa de cambio inicial reactiva (Configurable localmente)
const tasaCambio = ref(741.35);

const form = ref({
  nombre: "",
  metodoEntrega: "delivery",
  telefono: "",
  direccionDelivery: "",
  cedula: "",
  ciudad: "",
  agenciaMRW: "",
  metodoPago: "",
});

// Estructura de almacenamiento reactivo
const datos = ref({
  banners: [],     
  categorias: [],   
  productos: [],    
});

// ==========================================
// MÉTODOS DE CARGA DESDE ARCHIVOS ESTÁTICOS
// ==========================================

const cargarCategorias = () => {
  datos.value.categorias = CATEGORIAS;
};

const cargarBanners = () => {
  // Mapeo directo y limpio desde constants/bannersData.ts
  datos.value.banners = BANNERS.map(b => ({
    id: b.id,
    titulo: b.titulo,
    imagen: b.imagen, 
    link_url: b.link_url
  }));
};

const cargarProductos = () => {
  const favoritosGuardados = JSON.parse(
    localStorage.getItem("mis_favoritos") || "[]"
  );

  // Mapeamos los campos exactos de la estructura estática sincronizada con tu tabla
  datos.value.productos = PRODUCTOS.map((prod) => ({
    id: prod.id,
    categoria_id: prod.categoria_id, 
    nombre: prod.nombre,
    minimo_mayor: prod.minimo_mayor, 
    precio_mayor: prod.precio_mayor,
    precio_detal: prod.precio_detal,
    imagen: prod.imagen_url || "https://placehold.co/400x400?text=No+Image",
    descripcion: prod.descripcion || "",
    esFavorito: favoritosGuardados.includes(prod.id),
  }));
};

// Sincronizador global optimizado para Frontend
const inicializarTienda = () => {
  cargarCategorias();
  cargarBanners();
  cargarProductos();
};

// --- PROPIEDADES COMPUTADAS ---

const nombreCategoriaSeleccionada = computed(() => {
  const cat = datos.value.categorias.find((c) => c.id === categoriaSeleccionada.value);
  return cat ? cat.nombre : "Productos";
});

const productos = computed(() => datos.value.productos);

const totalPagarBs = computed(() => {
  const montoBs = carritoStore.totalPagar * tasaCambio.value;
  return `${montoBs.toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} VES`;
});

const formatearBs = (montoUsd) => {
  const calculo = montoUsd * tasaCambio.value;
  return `${calculo.toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} Bs`;
};

const formatearPrecio = (montoUsd) => {
  if (monedaActiva.value === "VES") {
    return formatearBs(montoUsd);
  }
  return `$${montoUsd.toFixed(2)}`;
};

const obtenerCantidadEnCarrito = (productoId) => {
  const item = carritoStore.items.find((i) => i.id === productoId);
  return item ? item.cantidad : 0;
};

const abrirDetalle = (producto) => {
  productoSeleccionado.value = producto;
  verDetalleModal.value = true;
};

const productosFiltradosCategoria = computed(() => {
  if (!categoriaSeleccionada.value) return datos.value.productos;
  return datos.value.productos.filter(
    (p) => p.categoria_id === categoriaSeleccionada.value
  );
});

const productosFiltradosBuscador = computed(() => {
  const query = busqueda.value.toLowerCase().trim();
  if (!query) return datos.value.productos;
  return datos.value.productos.filter((p) => p.nombre.toLowerCase().includes(query));
});

const limpiarBusqueda = () => {
  busqueda.value = "";
  verBuscadorModal.value = false;
};

const compartirProducto = async (producto) => {
  const textoCompartir = `🔥 ¡Mira este producto!\n\n*${
    producto.nombre
  }*\n🔹 Precio Mayor: ${formatearPrecio(producto.precio_mayor)} (${
    producto.minimo_mayor
  } unds.)\n🔹 Precio Detal: ${formatearPrecio(producto.precio_detal)}\n\n`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: producto.nombre,
        text: textoCompartir,
        url: window.location.origin,
      });
    } catch (error) {
      console.log("Error al compartir", error);
    }
  } else {
    try {
      await navigator.clipboard.writeText(`${textoCompartir} ${window.location.href}`);
      alert("¡Enlace e información del producto copiada al portapapeles!");
    } catch (err) {
      alert("No se pudo compartir el producto de forma automática.");
    }
  }
};

// --- LÓGICA DE TEMPORIZADOR Y REDIRECCIÓN ---
const iniciarRedireccionSoporte = (textoPersonalizado = null) => {
  if (intervaloRedireccion) clearInterval(intervaloRedireccion);

  contadorSegundos.value = 5;
  mostrarPopupSoporte.value = true;
  mensajePendiente.value = textoPersonalizado;

  intervaloRedireccion = setInterval(() => {
    contadorSegundos.value--;

    if (contadorSegundos.value <= 0) {
      clearInterval(intervaloRedireccion);
      mostrarPopupSoporte.value = false;
      ejecutarRedireccionWhatsApp();
    }
  }, 1000);
};

const ejecutarRedireccionWhatsApp = () => {
  let numeroTelefono = "584245542026";
  let textoFinal = "";

  if (mensajePendiente.value) {
    textoFinal = encodeURIComponent(mensajePendiente.value);
    window.location.href = `https://wa.me/${numeroTelefono}?text=${textoFinal}`;

    carritoStore.vaciarCarrito();
    verCarrito.value = false;
  } else {
    textoFinal = encodeURIComponent(
      "¡Hola! Me gustaría hacer una consulta sobre los productos al mayor."
    );
    window.location.href = `https://wa.me/${numeroTelefono}?text=${textoFinal}`;
  }

  mensajePendiente.value = null;
};

const abrirSoporte = () => {
  let numeroTelefono = "584245542026";
  const texto = encodeURIComponent(
    "¡Hola! Me gustaría hacer una consulta sobre los productos al mayor."
  );
  window.open(
    `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${texto}`,
    `_blank`
  );
};

// --- CICLO DE VIDA Y PERSISTENCIA DE FAVORITOS ---
onMounted(() => {
  inicializarTienda();
});

watch(
  () => datos.value.productos,
  (nuevosProductos) => {
    if (nuevosProductos && nuevosProductos.length > 0) {
      const idsFavoritos = nuevosProductos.filter((p) => p.esFavorito).map((p) => p.id);
      localStorage.setItem("mis_favoritos", JSON.stringify(idsFavoritos));
    }
  },
  { deep: true }
);

// --- ENVÍO DIRECTO A WHATSAPP ---
const enviarAWhatsApp = async () => {
  // Validaciones de Formulario
  if (!form.value.nombre) {
    alert("Por favor, ingresa tu nombre completo.");
    return;
  }
  if (form.value.metodoEntrega === "delivery") {
    if (!form.value.telefono || !form.value.direccionDelivery) {
      alert("Por favor, completa el teléfono y la dirección exacta para gestionar tu Delivery.");
      return;
    }
  } else {
    if (!form.value.cedula || !form.value.telefono || !form.value.ciudad || !form.value.agenciaMRW) {
      alert("Por favor, rellena todos los campos de envío nacional de la sucursal MRW.");
      return;
    }
  }

  if (!form.value.metodoPago) {
    alert("Por favor, selecciona un método de pago antes de continuar.");
    return;
  }

  const nombresPagos = {
    pago_movil: "📱 Pago Móvil",
    zinli: "💳 Zinli",
    usdt: "🟢 USDT (Binance)",
    efectivo: "💵 Efectivo",
  };

  const totalFinalBs = carritoStore.totalPagar * tasaCambio.value;

  // CONSTRUIR EL MENSAJE DE TEXTO PARA WHATSAPP
  let texto = `🛒 *¡Nuevo Pedido!*\n----------------------------------\n`;
  texto += `*Tasa de Cambio:* 1 USD = ${tasaCambio.value.toFixed(2)} VES\n`;
  texto += `----------------------------------\n`;
  texto += `*Cliente:* ${form.value.nombre}\n`;

  if (form.value.metodoEntrega === "delivery") {
    texto += `*Despacho:* Delivery Local\n*Teléfono:* ${form.value.telefono}\n*Ubicación:* ${form.value.direccionDelivery}\n`;
  } else {
    texto += `*Despacho:* Envío Nacional por MRW\n*Cédula:* ${form.value.cedula}\n*Teléfono:* ${form.value.telefono}\n*Destino:* ${form.value.ciudad}\n*Oficina MRW:* ${form.value.agenciaMRW}\n`;
  }

  texto += `*Método de Pago:* ${nombresPagos[form.value.metodoPago]}\n`;
  texto += `----------------------------------\n📦 *Detalle del Pedido:*\n`;

  carritoStore.itemsProcesados.forEach((item) => {
    const tipoPrecio = item.esMayor ? "(Al Mayor)" : "(Al Detal)";
    const nombreCorto = item.nombre.length > 25 ? item.nombre.slice(0, 25) + "..." : item.nombre;
    texto += `• x${item.cantidad} ${nombreCorto} ${tipoPrecio}\n`;
    texto += `   Ref: $${item.precioUnitario.toFixed(2)}\n\n`;
  });

  texto += `----------------------------------\n`;
  texto += `💵 *Total Ref:* $${carritoStore.totalPagar.toFixed(2)}\n`;
  texto += `🇻🇪 *Total a Pagar:* ${totalFinalBs.toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} VES`;

  iniciarRedireccionSoporte(texto);
};
</script>


<!-- BLOQUE DE ESTILOS COMPLETOS -->
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

/* ==========================================
   OCULTAR BARRA DE SCROLL (CATEGORÍAS Y NAV)
   ========================================== */
.hide-scrollbar {
  -ms-overflow-style: none;  /* Internet Explorer y Edge */
  scrollbar-width: none;  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari y Opera */
}

.scroll-categorias {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-categorias::-webkit-scrollbar {
  display: none;
}

/* ==========================================
   ESTILOS GENERALES Y INTERFAZ (MODALES Y MENÚ)
   ========================================== */
.cursor-pointer {
  cursor: pointer;
}

.custom-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
}

/* Modal Detalle de Producto (Desliza desde abajo) */
.detalle-modal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-height: 85vh;
  z-index: 1080;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 20px 20px 0 0;
}

.detalle-modal.open {
  transform: translateY(0);
}

.rounded-t-4 {
  border-top-left-radius: 1.5rem !important;
  border-top-right-radius: 1.5rem !important;
}

/* Modal Buscador (Desliza desde arriba) */
.buscador-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1060;
  transform: translateY(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.buscador-modal.open {
  transform: translateY(0);
}

.buscador-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1055;
}

/* Carrito Sidebar (Desliza desde la derecha) */
.carrito-sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 1080px;
  height: 100vh;
  z-index: 1060;
  transition: right 0.3s ease-in-out;
}

.carrito-sidebar.open {
  right: 0;
}

/* Menú de Navegación Inferior Móvil */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75px;
  border-radius: 25px 25px 0px 0px;
  z-index: 1040;
}

.nav-item-btn {
  background: none;
  border: none;
  padding: 5px;
  text-align: center;
}

.nav-label {
  display: block;
  font-size: 0.7rem;
}

/* Estilo utilitario auxiliar para el visor de tasas */
.fs-7 {
  font-size: 0.72rem !important;
}
</style>