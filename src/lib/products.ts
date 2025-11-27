export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  storage: string;
  condition: "Nuevo" | "Usado" | "Como nuevo";
};

export const products: Product[] = [
  {
    id: "s23-ultra",
    name: "Samsung Galaxy S23 Ultra",
    description: "Pantalla AMOLED, cámara brutal y batería de todo el día.",
    price: 820000,
    badge: "Más vendido",
    storage: "256 GB",
    condition: "Como nuevo",
  },
  // ... resto de los productos
];
