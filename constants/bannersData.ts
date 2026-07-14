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
    imagen: "/images/banners/banner_controles.jpg",
    link_url: "#"
  },
  {
    id: 2,
    titulo: "Descuentos en Audio",
    imagen: "/images/banners/banner_audio.jpg",
    link_url: "#"
  }
];