// stores/carrito.js
import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    items: []
  }),
  
  hydrate(state) {
    if (process.client) {
      state.items = JSON.parse(localStorage.getItem('app_carrito') || '[]')
    }
  },

  actions: {
    agregarProducto(producto, cantidad = 1) {
      const existe = this.items.find(item => item.id === producto.id)
      
      if (existe) {
        existe.cantidad += cantidad
      } else {
        this.items.push({
          id: producto.id,
          nombre: producto.nombre,
          precio_detal: parseFloat(producto.precio_detal),
          precio_mayor: parseFloat(producto.precio_mayor),
          minimo_mayor: parseInt(producto.minimo_mayor),
          imagen: producto.imagen,
          cantidad: cantidad
        })
      }
      this.guardarStorage()
    },

    modificarCantidad(productoId, cantidad) {
      const item = this.items.find(item => item.id === productoId)
      if (item) {
        item.cantidad = cantidad
        if (item.cantidad <= 0) {
          this.eliminarProducto(productoId)
        }
      }
      this.guardarStorage()
    },

    eliminarProducto(productoId) {
      this.items = this.items.filter(item => item.id !== productoId)
      this.guardarStorage()
    },

    guardarStorage() {
      if (process.client) {
        localStorage.setItem('app_carrito', JSON.stringify(this.items))
      }
    },

    vaciarCarrito() {
      this.items = []
      this.guardarStorage()
    }
  },

  getters: {
    // Calcula el precio dinámico por ítem (Si cumple el mínimo, cambia a precio mayor)
    itemsProcesados: (state) => {
      return state.items.map(item => {
        const esMayor = item.cantidad >= item.minimo_mayor
        const precioUnitario = esMayor ? item.precio_mayor : item.precio_detal
        return {
          ...item,
          esMayor,
          precioUnitario,
          subtotal: precioUnitario * item.cantidad
        }
      })
    },

    totalPagar() {
      return this.itemsProcesados.reduce((acc, item) => acc + item.subtotal, 0)
    },

    totalItems() {
      return this.items.reduce((acc, item) => acc + item.cantidad, 0)
    }
  }
})