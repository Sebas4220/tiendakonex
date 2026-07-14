// constants/tiendaData.ts

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio_detal: number;
  precio_mayor: number;
  minimo_mayor: number;
  stock: number;
  imagen_url: string | null;
  categoria_id: number;
}

export const CATEGORIAS: Categoria[] = [
  { id: 1, nombre: "Controles", slug: "controles" },
  { id: 2, nombre: "Accesorios", slug: "accesorios" },
  { id: 3, nombre: "Audio", slug: "audio" },
  { id: 4, nombre: "Streaming", slug: "streaming" },
  { id: 5, nombre: "Cables", slug: "cables" },
  { id: 6, nombre: "Cargadores", slug: "cargadores" },
  { id: 7, nombre: "Computación", slug: "computacion" },
  { id: 8, nombre: "Videojuegos", slug: "videojuegos" },
  { id: 9, nombre: "Comunicación", slug: "comunicacion" }
];

export const PRODUCTOS: Producto[] = [
{
  id: 1, // Puedes cambiar el ID según tu secuencia
  nombre: "Reloj h08",
  descripcion: "Smartwatch deportivo diseñado para exteriores. Cuenta con alta resistencia al agua, monitoreo de actividad física y notificaciones inteligentes. Compatible con sistemas iOS y Android.",
  precio_detal: 40.00, // Ajustado estimando el margen de ganancia al detal
  precio_mayor: 36.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 20,
  imagen_url: "/Productos/Reloj h08.png",
  categoria_id: 2 // Asignar el ID de categoría correspondiente (ej. Accesorios o Relojes)
},
{
  id: 2, // Ajusta el ID según el orden de tu lista
  nombre: "Cable c a c",
  descripcion: "Cable USB-C a USB-C trenzado de alta calidad con certificación para transferencia de datos estable y carga rápida. Longitud de 1 metro, ideal para dispositivos móviles de última generación.",
  precio_detal: 3.50, // Estimado al detal para mantener un buen margen
  precio_mayor: 2.80, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 100,
  imagen_url: "/Productos/Cable c a c.png",
  categoria_id: 5 // Categoría: Cables
},
{
  id: 3, // Ajusta el ID según tu secuencia
  nombre: "Cable c a Lightning",
  descripcion: "Cable USB-C a Lightning de 1 metro con certificación para carga rápida y transferencia de datos segura. Diseñado con materiales de alta resistencia para garantizar una excelente durabilidad.",
  precio_detal: 3.50, // Estimado al detal
  precio_mayor: 2.80, // Precio exacto reflejado en la imagen
  minimo_mayor: 10,
  stock: 100,
  imagen_url: "/Productos/Cable c a Lightning.png",
  categoria_id: 5 // Categoría: Cables
},
{
  id: 4, // Ajusta el ID según tu secuencia
  nombre: "AirPods Pro 2 ANC",
  descripcion: "Auriculares inalámbricos de alta fidelidad con cancelación activa de ruido (ANC). Ofrecen un ajuste ergonómico con almohadillas intercambiables y estuche de carga inteligente. Compatibles con iOS y Android.",
  precio_detal: 18.00, // Estimado al detal
  precio_mayor: 15.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 4,
  stock: 0, // Marcado como "Agotado" en la tarjeta
  imagen_url: "/Productos/AirPods Pro 2 ANC.png",
  categoria_id: 3 // Categoría: Audio
},
{
  id: 5, // Ajusta el ID según tu secuencia
  nombre: "Powerbank romoss 10.000mah",
  descripcion: "Batería portátil de alta capacidad con tecnología de carga rápida. Su diseño compacto y seguro la hace ideal para viajes, permitiendo recargar tus dispositivos múltiples veces de forma eficiente.",
  precio_detal: 32.00, // Estimado al detal
  precio_mayor: 27.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 0, // Marcado como "Agotado" en la tarjeta
  imagen_url: "/Productos/Powerbank romoss 10.000mah.png",
  categoria_id: 6 // Categoría: Cargadores
},
{
  id: 6, // Ajusta el ID según tu secuencia
  nombre: "Audífono gamer x33",
  descripcion: "Auriculares diadema Onikuma x33 con iluminación RGB dinámica y micrófono flexible omnidireccional. Diseñados para largas sesiones de juego gracias a sus almohadillas ergonómicas y ultra cómodas. Conectividad versátil mediante cable USB o adaptador USB-C.",
  precio_detal: 35.00, // Estimado al detal
  precio_mayor: 27.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 12,
  imagen_url: "/Productos/Audifono gamer x33.png",
  categoria_id: 3 // Categoría: Audio
},
{
  id: 7, // Ajusta el ID según tu secuencia
  nombre: "Reloj kt80",
  descripcion: "Smartwatch con pantalla circular de diseño deportivo y elegante. Cuenta con alta resistencia y protección a prueba de agua, monitoreo inteligente de salud y notificaciones vinculadas en tiempo real. Completamente compatible con sistemas iOS y Android.",
  precio_detal: 40.00, // Estimado al detal
  precio_mayor: 36.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 15,
  imagen_url: "/Productos/Reloj kt80.png",
  categoria_id: 2 // Categoría: Accesorios
},
{
  id: 8, // Ajusta el ID según tu secuencia
  nombre: "Micrófono SX21",
  descripcion: "Sistema de micrófono inalámbrico solapero dual (X2) con tecnología avanzada anti-ruidos y filtros antiviento de felpa incluidos. Ideal para creadores de contenido, entrevistas y transmisiones en vivo con smartphones o cámaras.",
  precio_detal: 38.00, // Estimado al detal
  precio_mayor: 32.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 10,
  imagen_url: "/Productos/Micrófono SX21.png",
  categoria_id: 4 // Categoría: Streaming
},
{
  id: 9, // Ajusta el ID según tu secuencia
  nombre: "Airpods 4ta",
  descripcion: "Auriculares inalámbricos de última generación con diseño semiabierto ergonómico y ajuste cómodo. Ofrecen un audio nítido, emparejamiento rápido y estuche de carga compacto. Totalmente compatibles con iOS y Android.",
  precio_detal: 20.00, // Estimado al detal
  precio_mayor: 15.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 25,
  imagen_url: "/Productos/Airpods 4ta.png",
  categoria_id: 3 // Categoría: Audio
},
{
  id: 10, // Ajusta el ID según tu secuencia
  nombre: "Panel 16” pulgadas",
  descripcion: "Panel de iluminación LED profesional de 16 pulgadas ideal para fotografía, video y streaming. Cuenta con control remoto para ajustar la intensidad del brillo y tres tonos de temperatura de luz (fría, mixta y cálida). Incluye soporte para trípode.",
  precio_detal: 30.00, // Estimado al detal
  precio_mayor: 25.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 15,
  imagen_url: "/Productos/Panel 16 pulgadas.png",
  categoria_id: 4 // Categoría: Streaming
},
{
  id: 11, // Ajusta el ID según tu secuencia
  nombre: "Audífonos gamer B100",
  descripcion: "Auriculares inalámbricos Onikuma B100 con iluminación RGB lateral. Cuentan con un sistema versátil de triple modo de conexión: mediante cable auxiliar de 3.5 mm, dongle USB inalámbrico de baja latencia o Bluetooth. Diseño ergonómico con almohadillas acolchadas de alta comodidad.",
  precio_detal: 45.00, // Estimado al detal
  precio_mayor: 39.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 0, // Marcado como "Agotado" en la tarjeta
  imagen_url: "/Productos/Audifono gamer B100.png",
  categoria_id: 3 // Categoría: Audio
},
{
  id: 12, // Ajusta el ID según tu secuencia
  nombre: "Cargador 35w C a C",
  descripcion: "Combo de carga rápida premium certificado que incluye un adaptador de corriente de pared USB-C de 35W y un cable USB-C a USB-C. Diseñado para un rendimiento eficiente y seguro en dispositivos móviles de alta demanda.",
  precio_detal: 10.00, // Estimado al detal
  precio_mayor: 8.60, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 45,
  imagen_url: "/Productos/Cargador 35w C a C.png",
  categoria_id: 6 // Categoría: Energía
},
{
  id: 13, // Ajusta el ID según tu secuencia
  nombre: "AirPods Pro 2",
  descripcion: "Auriculares inalámbricos premium con diseño ergonómico in-ear y almohadillas adaptables de silicona. Ofrecen un audio envolvente de alta calidad, estuche de carga magnética y conectividad estable de última generación. Compatibles con iOS y Android.",
  precio_detal: 20.00, // Estimado al detal
  precio_mayor: 17.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 0, // Marcado como "Agotado" en la tarjeta
  imagen_url: "/Productos/AirPods Pro 2 ANC.png",
  categoria_id: 3 // Categoría: Audio
},
{
  id: 14, // Ajusta el ID según tu secuencia
  nombre: "Micrófono SX25",
  descripcion: "Micrófono inalámbrico de solapa individual (X1) con diseño compacto tipo clip. Ofrece captación de voz clara, emparejamiento automático plug-and-play y excelente rendimiento de batería para transmisiones, videos y grabaciones en smartphones.",
  precio_detal: 23.00, // Estimado al detal
  precio_mayor: 18.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 0, // Marcado como "Agotado" en la tarjeta
  imagen_url: "/Productos/Micrófono SX25.png",
  categoria_id: 4 // Categoría: Streaming
},
{
  id: 15, // Ajusta el ID según tu secuencia
  nombre: "Trípode L09",
  descripcion: "Estabilizador inteligente tipo gimbal y trípode portátil todo en uno. Cuenta con luz de relleno integrada para grabaciones perfectas, rotación de 360 grados y múltiples modos creativos de captura. Ideal para creadores de contenido que buscan tomas estables y profesionales en movimiento.",
  precio_detal: 45.00, // Estimado al detal
  precio_mayor: 40.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 12,
  imagen_url: "/Productos/Trípode L09.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 16, // Ajusta el ID según tu secuencia
  nombre: "Apple Watch Ultra 3",
  descripcion: "Smartwatch réplica premium con diseño resistente e imponente de pantalla plana. Cuenta con funciones avanzadas de monitoreo deportivo, salud y notificaciones. Compatible con iOS y Android, disponible en colores blanco y negro.",
  precio_detal: 32.00, // Estimado al detal
  precio_mayor: 28.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 18,
  imagen_url: "/Productos/Apple Watch Ultra 3.png",
  categoria_id: 2 // Categoría: Accesorios / Relojes
},
{
  id: 17, // Ajusta el ID según tu secuencia
  nombre: "Cable 4 en 1",
  descripcion: "Cable multifuncional reforzado con conectores intercambiables que permiten configuraciones USB a USB-C, USB a Lightning, USB-C a USB-C y USB-C a Lightning. Ideal para cargar una amplia variedad de dispositivos. Compatible con iOS y Android.",
  precio_detal: 4.00, // Estimado al detal
  precio_mayor: 3.20, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 50,
  imagen_url: "/Productos/Cable 4 en 1.png",
  categoria_id: 5 // Categoría: Cables
},
{
  id: 18, // Ajusta el ID según tu secuencia
  nombre: "Powerbank Xiaomi 33w",
  descripcion: "Batería portátil Xiaomi de alta capacidad con 20.000mAh y carga rápida de 33W. Incorpora un práctico cable USB-C integrado para mayor comodidad en el transporte y un diseño minimalista y compacto.",
  precio_detal: 32.00, // Estimado al detal
  precio_mayor: 28.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 0, // Marcado como "Agotado" en la tarjeta
  imagen_url: "/Productos/Powerbank Xiaomi 33w.png",
  categoria_id: 6 // Categoría: Energía
},
{
  id: 19, // Ajusta el ID según tu secuencia
  nombre: "Micrófono SX23",
  descripcion: "Sistema de micrófono inalámbrico solapero dual (de balita X2) con estuche de carga inteligente que incluye pantalla digital indicadora de batería. Ideal para transmisiones en vivo, entrevistas y grabación de videos cortos en smartphones y cámaras.",
  precio_detal: 40.00, // Estimado al detal
  precio_mayor: 35.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 12,
  imagen_url: "/Productos/Micrófono SX23.png",
  categoria_id: 4 // Categoría: Streaming
},
{
  id: 20, // Ajusta el ID según tu secuencia
  nombre: "Panel Cube light",
  descripcion: "Mini panel LED de iluminación portátil (Cube Light) diseñado para selfies, videollamadas y creación de contenido en laptops o smartphones. Cuenta con clip de sujeción integrado y 3 tonos de luz ajustables (cálido, frío y blanco) para una iluminación óptima en cualquier entorno.",
  precio_detal: 10.50, // Estimado al detal
  precio_mayor: 8.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 35,
  imagen_url: "/Productos/Panel Cube light.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 21, // Ajusta el ID según tu secuencia
  nombre: "Micrófono DJI MIC",
  descripcion: "Sistema de micrófono inalámbrico ultra compacto DJI Mic Mini (X2). Ofrece una calidad de audio excepcional de nivel profesional, cancelación de ruido inteligente y un estuche de carga premium de alta autonomía. Perfecto para creadores de contenido exigentes, cineastas y transmisiones en vivo de alta fidelidad.",
  precio_detal: 160.00, // Estimado al detal
  precio_mayor: 150.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 8,
  imagen_url: "/Productos/Micrófono DJI MIC.png",
  categoria_id: 4 // Categoría: Streaming / Audio Profesional
},
{
  id: 22, // Ajusta el ID según tu secuencia
  nombre: "Panel RL900",
  descripcion: "Panel de iluminación LED profesional de 10 pulgadas equipado con aletas (tapas) cortadoras de luz para un control preciso de la dirección del brillo. Incluye trípode ajustable y control integrado en el cable. Perfecto para estudios de grabación, fotografía y sets de streaming.",
  precio_detal: 34.60, // Estimado al detal
  precio_mayor: 30.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 14,
  imagen_url: "/Productos/Panel RL900.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 22, // Ajusta el ID según tu secuencia
  nombre: "Panel RL900",
  descripcion: "Panel de iluminación LED profesional de 10 pulgadas equipado con aletas (tapas) cortadoras de luz para un control preciso de la dirección del brillo. Incluye trípode ajustable y control integrado en el cable. Perfecto para estudios de grabación, fotografía y sets de streaming.",
  precio_detal: 34.00, // Estimado al detal
  precio_mayor: 29.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 14,
  imagen_url: "/Productos/Panel RL900.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 23, // Ajusta el ID según tu secuencia
  nombre: "Powerbank Xiaomi 20000mAh",
  descripcion: "Batería portátil Xiaomi de alta capacidad con 20.000mAh. Equipado con múltiples puertos de salida (USB-A y USB-C) para cargar varios dispositivos de forma simultánea. Cuenta con un diseño texturizado antideslizante, resistente y compacto, ideal para viajes.",
  precio_detal: 32.00, // Estimado al detal
  precio_mayor: 27.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 20,
  imagen_url: "/Productos/Powerbank Xiaomi 20000mAh.png",
  categoria_id: 6 // Categoría: Energía
},
{
  id: 24, // Ajusta el ID según tu secuencia
  nombre: "Panel RGB AY-83",
  descripcion: "Mini panel LED de iluminación portátil (LED Pocket Video Light) modelo AY-83, diseñado para selfies, videollamadas y streaming. Cuenta con un clip de sujeción integrado con ángulo ajustable y modos de luz RGB con varios colores configurables para personalizar tus fondos y transmisiones.",
  precio_detal: 12.00, // Estimado al detal
  precio_mayor: 9.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 25,
  imagen_url: "/Productos/Panel RGB AY-83.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 25, // Ajusta el ID según tu secuencia
  nombre: "Base para PS5",
  descripcion: "Base soporte multifuncional diseñada para la consola PlayStation 5. Incluye estaciones de carga dual para controles DualSense con indicadores LED, soporte superior para auriculares gamer y ranuras traseras organizadoras para almacenar estuches de juegos.",
  precio_detal: 45.00, // Estimado al detal
  precio_mayor: 42.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 10,
  imagen_url: "/Productos/Base para PS5.png",
  categoria_id: 1 // Categoría: Videojuegos / Accesorios de Consola
},
{
  id: 26, // Ajusta el ID según tu secuencia
  nombre: "Audífonos gamer k8",
  descripcion: "Auriculares gamer Onikuma K8 con conexión Auxiliar (Jack 3.5mm) y un llamativo diseño de camuflaje militar verde. Equipados con almohadillas acolchadas de alta comodidad, diadema ajustable y micrófono omnidireccional flexible con cancelación de ruido. Ideales para largas sesiones de juego en consolas y PC.",
  precio_detal: 34.00, // Estimado al detal
  precio_mayor: 29.20, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 15,
  imagen_url: "/Productos/Audifonos gamer k8.png",
  categoria_id: 3 // Categoría: Audio / Gaming
},
{
  id: 27, // Ajusta el ID según tu secuencia
  nombre: "Cargador 20w C a Lightning",
  descripcion: "Combo de carga rápida para iPhone que incluye adaptador de corriente de pared USB-C de 20W y cable USB-C a Lightning. Diseñado para ofrecer una carga eficiente, segura y veloz en dispositivos iOS compatibles.",
  precio_detal: 10.00, // Estimado al detal
  precio_mayor: 8.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 40,
  imagen_url: "/Productos/Cargador 20W C a Lightning.png",
  categoria_id: 6 // Categoría: Energía / Cargadores
},
{
  id: 28, // Ajusta el ID según tu secuencia
  nombre: "Panel 19 pulgadas",
  descripcion: "Panel de iluminación LED profesional de gran formato (19 pulgadas) para estudio. Ofrece una distribución de luz suave y uniforme con 3 modos de temperatura de color (blanco frío, blanco cálido y amarillo suave). Incluye trípode ajustable y control remoto para regular el brillo y los tonos a distancia.",
  precio_detal: 29.00, // Estimado al detal
  precio_mayor: 25.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 15,
  imagen_url: "/Productos/Panel 19 pulgadas.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 29, // Ajusta el ID según tu secuencia
  nombre: "Apple Watch serie 11 mini",
  descripcion: "Smartwatch réplica con caja compacta de 42mm, ideal para muñecas delgadas. Cuenta con funciones de monitoreo de actividad física, salud y visualización de notificaciones. Compatible con sistemas operativos iOS y Android, disponible en colores rosado, negro y blanco.",
  precio_detal: 36.00, // Estimado al detal
  precio_mayor: 32.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 0, // Marcado como "Agotado" en la tarjeta
  imagen_url: "/Productos/Apple Watch Serie 11 Mini.png",
  categoria_id: 2 // Categoría: Accesorios / Relojes
},
{
  id: 30, // Ajusta el ID según tu secuencia
  nombre: "Trípode R1-L",
  descripcion: "Trípode sencillo y bastón selfie todo en uno modelo R1-L. Cuenta con un diseño ultra compacto y plegable, brazo extensible y un práctico control remoto Bluetooth integrado y desmontable para capturar fotos a distancia. Ideal para smartphones y viajes.",
  precio_detal: 12.00, // Estimado al detal
  precio_mayor: 9.60, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 30,
  imagen_url: "/Productos/Trípode R1-L.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 31, // Ajusta el ID según tu secuencia
  nombre: "Teclado Xiaomi 2 en 1",
  descripcion: "Combo inalámbrico Xiaomi que incluye teclado de tamaño completo y mouse ergonómico. Cuenta con conexión inalámbrica estable mediante receptor USB de 2.4GHz y funciona con baterías AA. Diseñado con un estilo minimalista, teclas de bajo perfil y reducción de ruido, ideal para oficina y productividad.",
  precio_detal: 40.00, // Estimado al detal
  precio_mayor: 34.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 15,
  imagen_url: "/Productos/Teclado Xiaomi 2 en 1.png",
  categoria_id: 7 // Categoría: Computación / Periféricos
},
{
  id: 32, // Ajusta el ID según tu secuencia
  nombre: "Micrófono SX27",
  descripcion: "Sistema de micrófono inalámbrico solapero dual (X2) modelo SX27 con tecnología avanzada anti-ruido y cancelación de sonido ambiental. Incluye estuche de carga protector y parabrisas de felpa (deadcat) para grabaciones nítidas en exteriores. Ideal para transmisiones en vivo, entrevistas y creación de contenido en smartphones.",
  precio_detal: 45.00, // Estimado al detal
  precio_mayor: 41.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 10,
  imagen_url: "/Productos/Micrófono SX27.png",
  categoria_id: 4 // Categoría: Streaming / Audio
},
{
  id: 33, // Ajusta el ID según tu secuencia
  nombre: "Micrófono sx35 mini",
  descripcion: "Sistema de micrófono inalámbrico solapero dual (X2) modelo SX35 Mini. Cuenta con tecnología Hi-Fi Audio y cancelación activa de ruido (ANC Smart Mic). Incluye estuche de carga inteligente con pantalla digital indicadora de batería y parabrisas de felpa (deadcat). Diseñado para transmisiones en vivo, entrevistas y videos cortos.",
  precio_detal: 38.00, // Estimado al detal
  precio_mayor: 33.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 12,
  imagen_url: "/Productos/Micrófono SX35 Mini.png",
  categoria_id: 4 // Categoría: Streaming / Audio
},
{
  id: 34, // Ajusta el ID según tu secuencia
  nombre: "Micrófono DJI MINI",
  descripcion: "Sistema de micrófono inalámbrico ultra compacto DJI Mic Mini (versión 2+1). Incluye dos transmisores y un receptor con conector directo para smartphone, ofreciendo audio de alta fidelidad, cancelación de ruido inteligente y un diseño extremadamente ligero y discreto. Ideal para creadores de contenido, vlogs y entrevistas móviles.",
  precio_detal: 105.00, // Estimado al detal
  precio_mayor: 98.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 8,
  imagen_url: "/Productos/Micrófono DJI MINI.png",
  categoria_id: 4 // Categoría: Streaming / Audio Profesional
},
{
  id: 35, // Ajusta el ID según tu secuencia
  nombre: "Estabilizador DJI OSMO 7",
  descripcion: "Gimbal estabilizador de tres ejes para smartphones DJI Osmo 7. Cuenta con un diseño ultra portátil con trípode integrado en una sola pieza y tecnología avanzada de seguimiento ActiveTrack 7.0. Ideal para grabaciones fluidas en movimiento, vlogs dinámicos y tomas cinematográficas estables.",
  precio_detal: 115.00, // Estimado al detal
  precio_mayor: 108.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 6,
  imagen_url: "/Productos/Estabilizador DJI OSMO 7.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 36, // Ajusta el ID según tu secuencia
  nombre: "Estabilizador DJI OSMO 7P",
  descripcion: "Gimbal estabilizador premium de tres ejes para smartphones DJI Osmo 7P. Cuenta con un módulo multifuncional avanzado, tecnología de seguimiento ActiveTrack 7.0, mayor potencia de estabilización, función de carga para el dispositivo y encendido instantáneo al desplegar. La herramienta definitiva para creadores de contenido profesional.",
  precio_detal: 180.00, // Estimado al detal
  precio_mayor: 175.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 5,
  imagen_url: "/Productos/Estabilizador DJI OSMO 7P.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 37, // Ajusta el ID según tu secuencia
  nombre: "Taco 20w",
  descripcion: "Adaptador de corriente de pared (taco) USB-C de 20W certificado. Diseñado para ofrecer una carga rápida, estable y segura en dispositivos móviles compatibles, principalmente optimizado para ecosistemas iOS y smartphones de última generación.",
  precio_detal: 7.00, // Estimado al detal
  precio_mayor: 5.60, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 50,
  imagen_url: "/Productos/Taco 20W.png",
  categoria_id: 6 // Categoría: Energía / Cargadores
},
{
  id: 38, // Ajusta el ID según tu secuencia
  nombre: "Taco 25w",
  descripcion: "Adaptador de corriente de pared (taco) USB-C de 25W certificado. Diseñado para ofrecer una carga súper rápida, estable y eficiente, ideal para smartphones de última generación con soporte de carga PD (Power Delivery).",
  precio_detal: 6.50, // Estimado al detal
  precio_mayor: 5.90, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 50,
  imagen_url: "/Productos/Taco 25W.png",
  categoria_id: 6 // Categoría: Energía / Cargadores
},
{
  id: 39, // Ajusta el ID según tu secuencia
  nombre: "Micrófono SX29",
  descripcion: "Sistema de micrófono inalámbrico solapero dual (X2) modelo SX29 con tecnología avanzada anti-ruidos. Incluye un estuche de carga con interior naranja y pantalla digital indicadora de batería, además de parabrisas de felpa (deadcat) para capturar audio de forma nítida. Ideal para grabaciones en exteriores, vlogs y transmisiones en vivo.",
  precio_detal: 39.00, // Estimado al detal
  precio_mayor: 35.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 15,
  imagen_url: "/Productos/Micrófono SX29.png",
  categoria_id: 4 // Categoría: Streaming / Audio
},
{
  id: 40, // Ajusta el ID según tu secuencia
  nombre: "Apple Watch serie 11 nike",
  descripcion: "Smartwatch réplica versión deportiva estilo Nike, compatible con sistemas operativos iOS y Android. Incluye correas perforadas transpirables ideales para actividades físicas y entrenamientos, así como funciones de monitoreo de salud y notificaciones.",
  precio_detal: 29.00, // Estimado al detal
  precio_mayor: 26.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 0, // Marcado como "Agotado" en la tarjeta
  imagen_url: "/Productos/Apple Watch Serie 11 Nike.png",
  categoria_id: 2 // Categoría: Accesorios / Relojes
},
{
  id: 41, // Ajusta el ID según tu secuencia
  nombre: "AirPods Max imantados",
  descripcion: "Auriculares de diadema inalámbricos tipo réplica con almohadillas imantadas intercambiables. Ofrecen un diseño ergonómico, sonido estéreo de alta fidelidad y conectividad inalámbrica estable. Compatibles con sistemas operativos iOS y Android, disponibles en una amplia variedad de colores.",
  precio_detal: 39.00, // Estimado al detal
  precio_mayor: 34.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 12,
  imagen_url: "/Productos/AirPods Max Imantados.png",
  categoria_id: 3 // Categoría: Audio / Auriculares
},
{
  id: 42, // Ajusta el ID según tu secuencia
  nombre: "Base para control PS5",
  descripcion: "Estación de carga dual (Charging Dock) marca DOBE para controles de PS5. Permite cargar hasta dos mandos de forma simultánea, cuenta con indicadores LED de estado de carga y diseño acoplable a la estética de la consola. Incluye cable de alimentación USB.",
  precio_detal: 25.00, // Estimado al detal
  precio_mayor: 21.50, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 15,
  imagen_url: "/Productos/Base para control PS5.png",
  categoria_id: 8 // Categoría: Videojuegos / Accesorios de Consolas
},
{
  id: 43, // Ajusta el ID según tu secuencia
  nombre: "Trípode P180TK",
  descripcion: "Trípode y bastón selfie reforzado marca Glowtech, modelo P180TK. Extensible hasta una altura máxima de 1.8 metros, fabricado en acero inoxidable (Stainless Steel) de alta calidad y equipado con un cabezal giratorio de 360 grados. Incluye control remoto Bluetooth desmontable para capturas a distancia y patas estables de gran apertura.",
  precio_detal: 25.00, // Estimado al detal
  precio_mayor: 20.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 20,
  imagen_url: "/Productos/Trípode P180TK.png",
  categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
id: 44,
nombre: "Micrófono DJI MIC MINI",
descripcion: "Sistema de micrófono inalámbrico ultra compacto DJI Mic Mini (versión X1). Incluye un transmisor y un receptor compacto, ofreciendo una excelente fidelidad de audio, cancelación de ruido inteligente y un diseño ligero perfecto para grabaciones rápidas con smartphones o cámaras.",
precio_detal: 90.00, // Estimado al detal
precio_mayor: 85.00, // Precio exacto reflejado en la imagen
minimo_mayor: 3,
stock: 8,
imagen_url: "/Productos/Micrófono DJI MIC MINI.png",
categoria_id: 4 // Categoría: Streaming / Audio Profesional
},
{
id: 45,
nombre: "Audífono gamer x13",
descripcion: "Auriculares de diadema gamer marca Onikuma, modelo X13 con conexión auxiliar de 3.5mm. Cuenta con sonido estéreo envolvente, micrófono omnidireccional flexible con reducción de ruido, almohadillas acolchadas de gran comodidad y atractiva iluminación LED RGB en los laterales.",
precio_detal: 38.00, // Estimado al detal
precio_mayor: 32.50, // Precio exacto reflejado en la imagen
minimo_mayor: 3,
stock: 15,
imagen_url: "/Productos/Audífono Gamer X13.png",
categoria_id: 3 // Categoría: Audio / Auriculares
},
{
id: 46,
nombre: "MagSafe somostel",
descripcion: "Batería portátil (Power Bank) inalámbrica magnética MagSafe marca Somostel. Cuenta con cables integrados, puertos de salida USB y USB-C para carga simultánea, y una pantalla digital que indica el porcentaje de batería. Diseño ultra compacto con soporte trasero desplegable.",
precio_detal: 35.00,
precio_mayor: 29.00,
minimo_mayor: 3,
stock: 0, // Marcado como "Agotado" en la tarjeta
imagen_url: "/Productos/MagSafe Somostel.png",
categoria_id: 6 // Categoría: Energía / Cargadores y Power Banks
},
{
id: 47,
nombre: "AirPods Pro 3 ANC",
descripcion: "Auriculares inalámbricos in-ear tipo réplica modelo AirPods Pro con cancelación activa de ruido (ANC). Ofrecen un estuche de carga inteligente, almohadillas de silicón intercambiables y conectividad estable de emparejamiento rápido. Compatibles con sistemas operativos iOS y Android.",
precio_detal: 22.00,
precio_mayor: 18.00,
minimo_mayor: 3,
stock: 15,
imagen_url: "/Productos/AirPods Pro 3 ANC.png",
categoria_id: 3 // Categoría: Audio / Auriculares inalámbricos
},
{
id: 48,
nombre: "Buds 3 pro",
descripcion: "Auriculares inalámbricos in-ear tipo réplica estilo Buds 3 Pro con diseño ergonómico de vástago. Cuentan con un estuche compacto de tapa translúcida, sonido estéreo de alta definición y control táctil para reproducción. Compatibles con dispositivos Android y iOS.",
precio_detal: 18.00,
precio_mayor: 15.50,
minimo_mayor: 3,
stock: 20,
imagen_url: "/Productos/Buds 3 Pro.png",
categoria_id: 3 // Categoría: Audio / Auriculares inalámbricos
},
{
id: 49,
nombre: "Teclado keyboards",
descripcion: "Combo portátil de mini teclado inalámbrico y mouse óptico recargables mediante USB. Cuentan con conectividad Bluetooth multiplataforma ideal para tablets, smartphones y laptops. Diseño ultra delgado y ligero disponible en variedad de colores pasteles y clásicos.",
precio_detal: 19.00,
precio_mayor: 15.70,
minimo_mayor: 3,
stock: 25,
imagen_url: "/Productos/Teclado Keyboards.png",
categoria_id: 7 // Categoría: Computación / Periféricos
},
{
id: 50,
nombre: "Teclado onikuma MT706",
descripcion: "Teclado mecánico gamer marca Onikuma, modelo MT706. Cuenta con un diseño compacto de 81 teclas, estructura premium gasket mount para una escritura suave y amortiguada, conectividad triple (Bluetooth, 2.4GHz inalámbrico y cable USB) y retroiluminación RGB dinámica.",
precio_detal: 60.00,
precio_mayor: 58.00,
minimo_mayor: 3,
stock: 12,
imagen_url: "/Productos/Teclado Onikuma MT706.png",
categoria_id: 7 // Categoría: Computación / Periféricos
},
{
id: 51,
nombre: "Mouses onikuma DM02",
descripcion: "Mouse gamer inalámbrico marca Onikuma, modelo DM02. Ofrece conectividad triple para una máxima versatilidad, un diseño ergonómico ultra ligero que reduce la fatiga y retroiluminación RGB personalizable con efectos dinámicos.",
precio_detal: 28.00,
precio_mayor: 25.00,
minimo_mayor: 3,
stock: 15,
imagen_url: "/Productos/Mouses onikuma DM02.png",
categoria_id: 7 // Categoría: Computación / Periféricos
},
{
id: 52,
nombre: "Intercomunicador dual",
descripcion: "Sistema de intercomunicadores duales para cascos de moto. Permite una conexión inalámbrica estable entre dos motociclistas, es totalmente compatible con dispositivos iOS y Android para llamadas o música, e ideal para mantener la comunicación en ruta.",
precio_detal: 49.00,
precio_mayor: 44.00,
minimo_mayor: 3,
stock: 10,
imagen_url: "/Productos/Intercomunicador Dual.png",
categoria_id: 2 // Categoría: Accesorios / Gadgets de Moto
},
{
id: 53,
nombre: "Radio baofeng Bf-888s",
descripcion: "Combo de dos radiotransmisores Walkie-Talkie Baofeng modelo BF-888S. Opera en la banda UHF (400-470MHz), cuenta con una potencia de 5W para un óptimo alcance, linterna integrada de emergencia y un diseño muy fácil de usar. Incluye bases de carga y auriculares.",
precio_detal: 35.00,
precio_mayor: 28.70,
minimo_mayor: 3,
stock: 20,
imagen_url: "/Productos/Radio Baofeng BF-888S.png",
categoria_id: 9 // Categoría: Comunicación / Seguridad
},
{
id: 54,
nombre: "Cable c a c (anaranjado)",
descripcion: "Cable USB-C a USB-C de alta calidad en color anaranjado, diseñado específicamente para la serie 15, 16 y 17. Ofrece carga rápida y transferencia de datos eficiente.",
precio_detal: 5.00,
precio_mayor: 4.00,
minimo_mayor: 3,
stock: 0, // Marcado como "Agotado"
imagen_url: "/Productos/Cable C a C Anaranjado.png",
categoria_id: 6 // Categoría: Energía / Cables
},
{
id: 55,
nombre: "Teclado onikuma G58",
descripcion: "Teclado mecánico gamer marca Onikuma, modelo G58. Presenta un formato compacto de 82 teclas, interruptores hot-swappable para personalización, iluminación RGB y conectividad con cable de 1.8 metros con interfaz dual USB y Tipo-C.",
precio_detal: 42.00,
precio_mayor: 38.00,
minimo_mayor: 3,
stock: 10,
imagen_url: "/Productos/Teclado Onikuma G58.png",
categoria_id: 7 // Categoría: Computación / Periféricos
},
{
id: 56,
nombre: "Mini UPS",
descripcion: "Mini sistema de alimentación ininterrumpida (UPS) con batería de 10.400mAh. Diseñado con múltiples puertos de salida para mantener encendidos equipos esenciales durante cortes de energía.",
precio_detal: 33.00,
precio_mayor: 30.50,
minimo_mayor: 3,
stock: 0, // Marcado como "Agotado"
imagen_url: "/Productos/Mini UPS.png",
categoria_id: 6 // Categoría: Energía / Respaldo Eléctrico
},
{
id: 57,
nombre: "Consola R36S",
descripcion: "Consola de videojuegos portátil R36S. Cuenta con 1GB de RAM, 128GB de almacenamiento, pantalla LCD de 3 pulgadas y capacidad para emular más de 30.000 juegos (PSP, DS, PS1, GameBoy, GBC, MAME, NES, N64). Incluye 2 puertos de memoria extraíble y está disponible en 11 colores.",
precio_detal: 56.00,
precio_mayor: 51.00,
minimo_mayor: 3,
stock: 12,
imagen_url: "/Productos/Consola R36S.png",
categoria_id: 8 // Categoría: Videojuegos / Consolas portátiles
},
{
id: 58,
nombre: "Taco 40w/60w",
descripcion: "Adaptador de corriente de pared (taco) dinámico con una capacidad máxima de 60W. Diseñado para una carga eficiente y compatible con dispositivos del ecosistema iOS.",
precio_detal: 12.00,
precio_mayor: 10.00,
minimo_mayor: 3,
stock: 20,
imagen_url: "/Productos/Taco 40w 60w.png",
categoria_id: 6
},
{
id: 59,
nombre: "Control D11",
descripcion: "Control de juegos tipo 'stretching' (extensible) modelo D11. Compatible con teléfonos inteligentes, tablets, Smart TV, consolas Switch y PC Windows. Ideal para una experiencia de juego móvil inmersiva.",
precio_detal: 35.00,
precio_mayor: 31.50,
minimo_mayor: 3,
stock: 8,
imagen_url: "/Productos/Control D11.png",
categoria_id: 8
},
{
id: 60,
nombre: "Cable usb a 12v",
descripcion: "Cable convertidor de voltaje que permite elevar la salida de un puerto USB a 12V. Ideal para alimentar pequeños dispositivos o equipos que requieran este voltaje desde una fuente de energía USB.",
precio_detal: 5.00,
precio_mayor: 4.00,
minimo_mayor: 3,
stock: 30,
imagen_url: "/Productos/Cable USB a 12V.png",
categoria_id: 6
},
{
id: 61,
nombre: "Mouses onikuma CW935",
descripcion: "Mouse gamer inalámbrico Onikuma CW935 con conectividad triple. Equipado con un sensor de alta precisión para un rendimiento óptimo y botones programables para personalizar la experiencia de juego.",
precio_detal: 30.00,
precio_mayor: 25.60,
minimo_mayor: 3,
stock: 12,
imagen_url: "/Productos/Mouses onikuma CW935.png",
categoria_id: 7
},
{
id: 62,
nombre: "Audífonos akg tipo c",
descripcion: "Audífonos in-ear marca Samsung con conexión Tipo-C, ajustados por AKG para ofrecer un sonido equilibrado y de alta calidad.",
precio_detal: 6.00,
precio_mayor: 5.00,
minimo_mayor: 3,
stock: 40,
imagen_url: "/Productos/Audífonos AKG Tipo C.png",
categoria_id: 3
},
{
id: 63,
nombre: "AirPods Max normales",
descripcion: "Auriculares inalámbricos de diadema (tipo réplica) compatibles con sistemas operativos iOS y Android. Ofrecen un diseño ergonómico y sonido envolvente.",
precio_detal: 30.00,
precio_mayor: 25.80,
minimo_mayor: 3,
stock: 10,
imagen_url: "/Productos/AirPods Max Normales.png",
categoria_id: 3
},

{
id: 68,
nombre: "Control PS5 (Morado)",
descripcion: "Control inalámbrico original para PlayStation 5, color morado. Ofrece respuesta háptica inmersiva, gatillos adaptativos dinámicos y micrófono integrado.",
precio_detal: 75.00,
precio_mayor: 70.00,
minimo_mayor: 3,
stock: 5,
imagen_url: "/Productos/Control PS5 (Morado).png",
categoria_id: 8 // Categoría: Videojuegos
},
{
id: 69,
nombre: "Cargador MagSafe",
descripcion: "Cargador inalámbrico magnético MagSafe certificado. Proporciona una carga inalámbrica rápida, segura y eficiente para dispositivos compatibles.",
precio_detal: 10.00,
precio_mayor: 8.00,
minimo_mayor: 3,
stock: 40,
imagen_url: "/Productos/Cargador MagSafe.png",
categoria_id: 6 // Categoría: Energía
},
{
id: 70,
nombre: "Control PS5 (Camuflaje)",
descripcion: "Control inalámbrico original para PlayStation 5, edición especial con diseño de camuflaje. Incluye todas las funciones estándar como gatillos adaptativos y respuesta háptica.",
precio_detal: 75.00,
precio_mayor: 70.00,
minimo_mayor: 3,
stock: 4,
imagen_url: "/Productos/Control PS5 (Camuflaje).png",
categoria_id: 8 // Categoría: Videojuegos
},
{
id: 71,
nombre: "Control PS5 (Gris)",
descripcion: "Control inalámbrico original para PlayStation 5, color gris. Diseño ergonómico de alta precisión con tecnología háptica avanzada para una experiencia de juego superior.",
precio_detal: 75.00,
precio_mayor: 70.00,
minimo_mayor: 3,
stock: 6,
imagen_url: "/Productos/Control PS5 (Gris).png",
categoria_id: 8 // Categoría: Videojuegos
},
{
  id: 72, // Ajusta el ID según tu secuencia
  nombre: "Control PS5 (Rojo)",
  descripcion: "Control inalámbrico original para PlayStation 5, color rojo vibrante. Cuenta con respuesta háptica avanzada, gatillos adaptativos y diseño ergonómico de alto rendimiento.",
  precio_detal: 75.00, // Estimado al detal
  precio_mayor: 70.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 5,
  imagen_url: "/Productos/Control PS5 (Rojo).png",
  categoria_id: 8 // Categoría: Videojuegos
},

{
id: 73,
nombre: "Panel selfie AY-82",
descripcion: "Panel de luz LED portátil para selfies y video, modelo AY-82. Cuenta con iluminación RGB ajustable, ideal para mejorar la calidad de imagen en transmisiones, vlogs y fotografía móvil.",
precio_detal: 15.00,
precio_mayor: 12.50,
minimo_mayor: 3,
stock: 15,
imagen_url: "/Productos/Panel Selfie AY-82.png",
categoria_id: 4 // Categoría: Streaming / Iluminación
},
{
id: 74,
nombre: "Trípode Q185",
descripcion: "Trípode multifuncional modelo Q185, apto para cámaras y smartphones. Permite rotación de 360 grados, alcanza una altura de 1.8 metros e incluye control remoto para capturas a distancia.",
precio_detal: 42.00,
precio_mayor: 37.00,
minimo_mayor: 3,
stock: 10,
imagen_url: "/Productos/Trípode Q185.png",
categoria_id: 4 // Categoría: Streaming / Accesorios de fotografía
},
{
  id: 75, // Ajusta el ID según tu secuencia
  nombre: "Audífono onikuma GT811",
  descripcion: "Auriculares inalámbricos de diadema marca Onikuma, modelo GT811. Cuentan con tecnología de cancelación de ruido para una experiencia auditiva inmersiva y conectividad Bluetooth de alta estabilidad.",
  precio_detal: 45.00, // Estimado al detal
  precio_mayor: 39.00, // Precio exacto reflejado en la imagen
  minimo_mayor: 3,
  stock: 12,
  imagen_url: "/Productos/Audífono Onikuma GT811.png",
  categoria_id: 3 // Categoría: Audio
},

];