// constants/bannersData.ts

export interface Banner {
  id: number;
  titulo: string;
  imagen: string;
  link_url: string;
}

export const BANNERS: Banner[] = [
  {
    id: 1,
    titulo: "Controles Gaming Pro",
    imagen: "/bannerp.png",
    link_url: "#"
  },
  {
    id: 2,
    titulo: "Descuentos en Audio",
    imagen: "/bannerp.png",
    link_url: "#"
  }
];