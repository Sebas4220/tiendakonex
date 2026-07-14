<template>

</template>

<script setup>
import { ref, computed } from "vue";
import { useCarritoStore } from "~/stores/carrito";

const carritoStore = useCarritoStore();
const categoriaSeleccionada = ref(null);
const verCarrito = ref(false);
const busqueda = ref("");
const verBuscadorModal = ref(false);
const verDetalleModal = ref(false);
const productoSeleccionado = ref(null);

// --- ESTADO PARA EL SWITCH DE MONEDA ---
const monedaActiva = ref("USD"); // Puede ser 'USD' o 'VES'

// 1. Tasa de cambio definida de manera reactiva
const tasaCambio = ref(800);

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

const datos = ref({
  banners: [
    {
      id: 1,
      titulo: "Especial de Controles",
      imagen: "https://picsum.photos/id/180/800/250",
    },
    {
      id: 2,
      titulo: "Accesorios al Mayor",
      imagen: "https://picsum.photos/id/367/800/250",
    },
  ],
  categorias: [
    { id: 1, nombre: "Controles y Mandos", slug: "controles-y-mandos" },
    { id: 2, nombre: "Audio y Audífonos", slug: "audio-y-audifonos" },
    { id: 3, nombre: "Cables y Accesorios", slug: "cables-y-accesorios" },
  ],
  productos: [
    {
      id: 101,
      categoria_id: 1,
      nombre: "Control DualSense PS5 Blanco",
      minimo_mayor: 4,
      precio_mayor: 55.0,
      precio_detal: 69.99,
      imagen:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&auto=format&fit=crop&q=60",
    },
    {
      id: 102,
      categoria_id: 1,
      nombre: "Control Xbox Carbon Black",
      minimo_mayor: 4,
      precio_mayor: 52.0,
      precio_detal: 65.0,
      imagen:
        "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&auto=format&fit=crop&q=60",
    },
    {
      id: 103,
      categoria_id: 2,
      nombre: "Audífonos Diadema Gamer RGB",
      minimo_mayor: 6,
      precio_mayor: 12.5,
      precio_detal: 20.0,
      imagen:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=60",
    },
    {
      id: 104,
      categoria_id: 2,
      nombre: "Audífonos Inalámbricos Pro",
      minimo_mayor: 10,
      precio_mayor: 8.5,
      precio_detal: 15.0,
      imagen:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=60",
    },
    {
      id: 105,
      categoria_id: 3,
      nombre: "Cable Carga Rápida Tipo C 2m",
      minimo_mayor: 24,
      precio_mayor: 1.8,
      precio_detal: 4.5,
      imagen:
        "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=400&auto=format&fit=crop&q=60",
    },
    {
      id: 106,
      categoria_id: 3,
      nombre: "Cargador de Pared 20W USB-C",
      minimo_mayor: 12,
      precio_mayor: 3.2,
      precio_detal: 7.5,
      imagen:
        "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=400&auto=format&fit=crop&q=60",
    },
  ],
});

// 2. Computados y formateadores para la tasa en Bs
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

// Formateador dinámico basado en el switch de la Navbar
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

const enviarAWhatsApp = () => {
  if (!form.value.nombre) {
    alert("Por favor, ingresa tu nombre completo.");
    return;
  }
  if (form.value.metodoEntrega === "delivery") {
    if (!form.value.telefono || !form.value.direccionDelivery) {
      alert(
        "Por favor, completa el teléfono y la dirección exacta para gestionar tu Delivery."
      );
      return;
    }
  } else {
    if (
      !form.value.cedula ||
      !form.value.telefono ||
      !form.value.ciudad ||
      !form.value.agenciaMRW
    ) {
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

  let numeroTelefono = "584245542026";

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
    const subtotalBs = item.subtotal * tasaCambio.value;

    texto += `• ${item.cantidad}x ${item.nombre} ${tipoPrecio}\n`;
    texto += `  Ref: $${item.precioUnitario.toFixed(
      2
    )} c/u → Subtotal: $${item.subtotal.toFixed(2)} (${subtotalBs.toFixed(2)} Bs)\n`;
  });

  const totalFinalBs = carritoStore.totalPagar * tasaCambio.value;
  texto += `----------------------------------\n`;
  texto += `💵 *Total Ref:* $${carritoStore.totalPagar.toFixed(2)}\n`;
  texto += `🇻🇪 *Total a Pagar:* ${totalFinalBs.toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} VES`;

  window.open(
    `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(
      texto
    )}`,
    `_blank`
  );

  carritoStore.vaciarCarrito();
  verCarrito.value = false;
};
</script>

<style scoped>
.scroll-categorias::-webkit-scrollbar {
  display: none;
}
.scroll-categorias {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
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
.carrito-sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  z-index: 1060;
  transition: right 0.3s ease-in-out;
}
.carrito-sidebar.open {
  right: 0;
}

/* Estilo utilitario auxiliar para el visor de tasas */
.fs-7 {
  font-size: 0.72rem !important;
}
</style>
