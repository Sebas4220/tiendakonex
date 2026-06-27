<template>
  <div class="admin-container bg-light min-vh-100 pb-5">
    
    <nav class="navbar bg-dark navbar-dark shadow-sm sticky-top px-3">
      <div class="d-flex align-items-center justify-content-between w-100">
        <span class="fw-bold text-white fs-5">⚙️ Panel Administrativo</span>
        <NuxtLink to="/" class="btn btn-sm btn-outline-light rounded-pill px-3">
          👁️ Ver Tienda
        </NuxtLink>
      </div>
    </nav>

    <div v-if="!pinVerificado" class="container px-4 text-center mt-5">
      <div class="card border-0 shadow-sm rounded-4 p-4 mx-auto" style="max-width: 360px;">
        <span class="fs-1 mb-2">🔒</span>
        <h5 class="fw-bold text-dark mb-1">Confirmar Identidad</h5>
        <p class="small text-muted mb-4">Introduce tu PIN de seguridad para gestionar el inventario.</p>
        
        <div class="d-flex justify-content-center gap-2 mb-4">
          <input 
            v-for="(n, i) in 4" :key="i"
            :id="`pin-${i}`"
            type="password" 
            maxlength="1" 
            class="form-control text-center fw-bold fs-4 rounded-3" 
            style="width: 50px; height: 50px; background-color: #f8f9fa;"
            v-model="pinArray[i]"
            @input="alEscribirPin(i)"
            @keydown.delete="alBorrarPin(i)"
          >
        </div>

        <button class="btn btn-primary w-100 rounded-pill py-2 fw-bold" @click="verificarPIN">
          Ingresar al Panel
        </button>
      </div>
    </div>

    <div v-else class="container px-3 mt-3">
      
      <div class="row g-2 mb-4">
        <div class="col-4">
          <div class="bg-white p-2.5 rounded-4 shadow-sm text-center border-0 card">
            <span class="fs-4">📦</span>
            <div class="fw-bold text-dark mt-1" style="font-size: 1.1rem;">{{ datos.productos?.length || 0 }}</div>
            <div class="text-muted" style="font-size: 0.65rem; font-weight: 500;">Productos</div>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-white p-2.5 rounded-4 shadow-sm text-center border-0 card">
            <span class="fs-4">🏷️</span>
            <div class="fw-bold text-primary mt-1" style="font-size: 1.1rem;">{{ datos.categorias?.length || 0 }}</div>
            <div class="text-muted" style="font-size: 0.65rem; font-weight: 500;">Categorías</div>
          </div>
        </div>
        <div class="col-4">
          <div class="bg-white p-2.5 rounded-4 shadow-sm text-center border-0 card">
            <span class="fs-4">🖼️</span>
            <div class="fw-bold text-danger mt-1" style="font-size: 1.1rem;">{{ datos.banners?.length || 0 }}</div>
            <div class="text-muted" style="font-size: 0.65rem; font-weight: 500;">Banners</div>
          </div>
        </div>
      </div>

      <ul class="nav nav-pills nav-fill bg-white p-1 rounded-pill shadow-sm mb-4" id="adminTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active rounded-pill small py-2" id="prod-tab" data-bs-toggle="tab" data-bs-target="#prod-pane" type="button" role="tab">+ Producto</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link rounded-pill small py-2" id="cat-tab" data-bs-toggle="tab" data-bs-target="#cat-pane" type="button" role="tab">+ Categoría</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link rounded-pill small py-2" id="banner-tab" data-bs-toggle="tab" data-bs-target="#banner-pane" type="button" role="tab">+ Banner</button>
        </li>
      </ul>

      <div class="tab-content" id="adminTabsContent">
        
        <div class="tab-pane fade show active" id="prod-pane" role="tabpanel" aria-labelledby="prod-tab" tabindex="0">
          <div class="card border-0 shadow-sm rounded-4 p-3">
            <h6 class="fw-bold text-dark mb-3">Nuevo Artículo para el Catálogo</h6>
            <form @submit.prevent="guardarProducto" enctype="multipart/form-data">
              <div class="mb-2">
                <label class="form-label small fw-semibold text-secondary">Nombre del Producto</label>
                <input type="text" v-model="formProducto.nombre" class="form-control form-control-sm rounded-3" required placeholder="Ej: Control PS5 Original">
              </div>
              
              <div class="mb-2">
                <label class="form-label small fw-semibold text-secondary">Categoría</label>
                <select v-model="formProducto.categoria_id" class="form-select form-select-sm rounded-3" required>
                  <option disabled value="">Selecciona una categoría</option>
                  <option v-for="cat in datos.categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
                </select>
              </div>

              <div class="row g-2 mb-2">
                <div class="col-6">
                  <label class="form-label small fw-semibold text-secondary">Precio Mayor ($)</label>
                  <input type="number" step="0.01" v-model="formProducto.precio_mayor" class="form-control form-control-sm rounded-3" required placeholder="0.00">
                </div>
                <div class="col-6">
                  <label class="form-label small fw-semibold text-secondary">Mínimo Mayor (Unidades)</label>
                  <input type="number" v-model="formProducto.minimo_mayor" class="form-control form-control-sm rounded-3" required placeholder="Ej: 6">
                </div>
              </div>

              <div class="mb-2">
                <label class="form-label small fw-semibold text-secondary">Precio Detal ($)</label>
                <input type="number" step="0.01" v-model="formProducto.precio_detal" class="form-control form-control-sm rounded-3" required placeholder="0.00">
              </div>

              <div class="mb-3">
                <label class="form-label small fw-semibold text-secondary">Imagen del Producto</label>
                <input type="file" @change="subirImagenProducto" class="form-control form-control-sm rounded-3" accept="image/*" required>
              </div>

              <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold" :disabled="cargando">
                {{ cargando ? 'Guardando...' : '🚀 Publicar Producto' }}
              </button>
            </form>
          </div>
        </div>

        <div class="tab-pane fade" id="cat-pane" role="tabpanel" aria-labelledby="cat-tab" tabindex="0">
          <div class="card border-0 shadow-sm rounded-4 p-3">
            <h6 class="fw-bold text-dark mb-3">Nueva Categoría de Artículos</h6>
            <form @submit.prevent="guardarCategoria">
              <div class="mb-3">
                <label class="form-label small fw-semibold text-secondary">Nombre de la Categoría</label>
                <input type="text" v-model="formCategoria.nombre" class="form-control form-control-sm rounded-3" required placeholder="Ej: Controles, Audífonos, Cables">
              </div>
              <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold" :disabled="cargando">
                {{ cargando ? 'Guardando...' : '💾 Registrar Categoría' }}
              </button>
            </form>
          </div>
        </div>

        <div class="tab-pane fade" id="banner-pane" role="tabpanel" aria-labelledby="banner-tab" tabindex="0">
          <div class="card border-0 shadow-sm rounded-4 p-3">
            <h6 class="fw-bold text-dark mb-3">Nuevo Banner Promocional</h6>
            <form @submit.prevent="guardarBanner" enctype="multipart/form-data">
              <div class="mb-2">
                <label class="form-label small fw-semibold text-secondary">Título Comercial del Banner</label>
                <input type="text" v-model="formBanner.titulo" class="form-control form-control-sm rounded-3" required placeholder="Ej: Ofertas de la Semana - 20% OFF">
              </div>
              <div class="mb-3">
                <label class="form-label small fw-semibold text-secondary">Imagen Publicitaria (Horizontal)</label>
                <input type="file" @change="subirImagenBanner" class="form-control form-control-sm rounded-3" accept="image/*" required>
              </div>
              <button type="submit" class="btn btn-primary w-100 rounded-pill py-2 fw-bold" :disabled="cargando">
                {{ cargando ? 'Guardando...' : '🖼️ Subir Publicidad' }}
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const pinVerificado = ref(false)
const pinArray = ref(['', '', '', ''])

const datos = ref({ banners: [], categorias: [], productos: [] })
const cargando = ref(false)

// Estructuras de los formularios
const formProducto = ref({ nombre: '', categoria_id: '', precio_mayor: '', minimo_mayor: '', precio_detal: '', file: null })
const formCategoria = ref({ nombre: '' })
const formBanner = ref({ titulo: '', file: null })

// Cargar métricas iniciales del backend-php
const cargarDatosPanel = async () => {
  try {
    const response = await $fetch('http://localhost/backend-php/api.php?action=get_inicio')
    if (response.success) {
      datos.value = response
    }
  } catch (error) {
    console.error("Error conectando con la API del admin:", error)
  }
}

// Lógica del teclado numérico virtual del PIN
const alEscribirPin = (index) => {
  if (pinArray.value[index] && index < 3) {
    document.getElementById(`pin-${index + 1}`).focus()
  }
}

const alBorrarPin = (index) => {
  if (!pinArray.value[index] && index > 0) {
    document.getElementById(`pin-${index - 1}`).focus()
  }
}

const verificarPIN = () => {
  const pinCompleto = pinArray.value.join('')
  if (pinCompleto === '1234') { // <- Cambia aquí tu PIN maestro de seguridad
    pinVerificado.value = true
    cargarDatosPanel()
  } else {
    alert("PIN Incorrecto. Acceso denegado.")
    pinArray.value = ['', '', '', '']
    document.getElementById('pin-0').focus()
  }
}

// Controladores de archivos binarios (Imágenes)
const subirImagenProducto = (e) => { formProducto.value.file = e.target.files[0] }
const subirImagenBanner = (e) => { formBanner.value.file = e.target.files[0] }

// ENVÍO DE FORMULARIOS MEDIANTE FORM_DATA A PHP

const guardarProducto = async () => {
  cargando.value = true
  const formData = new FormData()
  formData.append('nombre', formProducto.value.nombre)
  formData.append('categoria_id', formProducto.value.categoria_id)
  formData.append('precio_mayor', formProducto.value.precio_mayor)
  formData.append('minimo_mayor', formProducto.value.minimo_mayor)
  formData.append('precio_detal', formProducto.value.precio_detal)
  formData.append('imagen', formProducto.value.file)

  try {
    const res = await $fetch('http://localhost/backend-php/admin_api.php?action=add_producto', {
      method: 'POST',
      body: formData
    })
    if (res.success) {
      alert("¡Producto publicado con éxito! 🚀")
      formProducto.value = { nombre: '', categoria_id: '', precio_mayor: '', minimo_mayor: '', precio_detal: '', file: null }
      cargarDatosPanel()
    }
  } catch (err) {
    alert("Error al guardar el producto.")
  } finally {
    cargando.value = false
  }
}

const guardarCategoria = async () => {
  cargando.value = true
  try {
    const res = await $fetch('http://localhost/backend-php/admin_api.php?action=add_categoria', {
      method: 'POST',
      body: formCategoria.value
    })
    if (res.success) {
      alert("¡Categoría guardada correctamente! 🏷️")
      formCategoria.value.nombre = ''
      cargarDatosPanel()
    }
  } catch (err) {
    alert("Error al guardar la categoría.")
  } finally {
    cargando.value = false
  }
}

const guardarBanner = async () => {
  cargando.value = true
  const formData = new FormData()
  formData.append('titulo', formBanner.value.titulo)
  formData.append('imagen', formBanner.value.file)

  try {
    const res = await $fetch('http://localhost/backend-php/admin_api.php?action=add_banner', {
      method: 'POST',
      body: formData
    })
    if (res.success) {
      alert("¡Banner subido e indexado con éxito! 🖼️")
      formBanner.value = { titulo: '', file: null }
      cargarDatosPanel()
    }
  } catch (err) {
    alert("Error al subir el banner publicitario.")
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
/* Transición suave para las pestañas de Bootstrap */
.nav-pills .nav-link.active {
  background-color: #0d6efd !important;
  color: white !important;
}
.nav-pills .nav-link {
  color: #6c757d;
  font-weight: 500;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.card {
  border-radius: 16px;
}
</style>