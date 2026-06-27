# 🛒 TiendaKonex - Catálogo Digital & E-commerce

TiendaKonex es una plataforma de comercio electrónico moderna, rápida y optimizada para dispositivos móviles, construida con **Nuxt 3** y **Bootstrap 5**. Está diseñada específicamente para la comercialización de accesorios tecnológicos y componentes, permitiendo una gestión fluida tanto para ventas al detal como ventas al mayor, conectando directamente al cliente con un asesor a través de WhatsApp.

---

## 🚀 Características Principales

*   **Gestión de Carrito Inteligente (Pinia):** El sistema detecta automáticamente la cantidad de unidades por producto. Si el cliente alcanza el límite mínimo configurado, el precio unitario cambia dinámicamente de precio detal a precio mayorista en tiempo real.
*   **Checkout Adaptativo Dinámico:** Formulario integrado que alterna campos obligatorios dependiendo del método de despacho seleccionado:
    *   *Delivery Local:* Solicita teléfono y dirección exacta.
    *   *Envío Nacional (MRW):* Solicita Cédula, teléfono, ciudad y oficina de destino.
*   **Múltiples Métodos de Pago:** Soporte nativo en el flujo para la selección de Pago Móvil, Zinli, USDT (Binance) y Efectivo.
*   **Conversión de Moneda en Tiempo Real:** Switch global para alternar la visualización de los precios en la tienda entre Dólares (USD) y Bolívares (VES) basado en una tasa de cambio reactiva.
*   **Sistema de Redirección con Temporizador:** Al confirmar el pedido o solicitar soporte, se despliega un modal interactivo con una cuenta regresiva de 5 segundos que prepara la experiencia del usuario antes de abrir la API de WhatsApp.
*   **Formato de Pedido Optimizado:** El mensaje que recibe el asesor incluye el desglose limpio del cliente, la tasa aplicada, el método de pago y una lista de productos formateada con IDs únicos (`[ID101]`) y nombres recortados para facilitar el control de inventario.
*   **Persistencia de Datos:** Uso de `localStorage` para mantener los productos guardados en la sección de favoritos y preservar los artículos del carrito incluso si el usuario refresca la página.

---

## 🛠️ Tecnologías Utilizadas

*   **Framework:** [Nuxt 3](https://nuxt.com/) - SSR & Vue 3 Framework.
*   **Manejador de Estado:** [Pinia](https://pinia.vuejs.org/) - Almacenamiento modular y reactivo para el carrito.
*   **Estilos y UI:** [Bootstrap 5](https://getbootstrap.com/) & [Bootstrap Icons](https://icons.getbootstrap.com/) - Diseño responsivo enfocado en mobile-first.
*   **Plataforma de Salida:** Integración directa con la API de WhatsApp Business.

---

## 📦 Configuración y Desarrollo

Asegúrate de instalar todas las dependencias antes de levantar el servidor local.

### 1. Instalación de dependencias
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
