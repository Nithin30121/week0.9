import { default as chairImageOne } from "../assets/C1.png";
import { default as chairImageTwo } from "../assets/C2.png";

export const products = [
  {
    id: "p1",
    name: "linea",
    price: 420,
    category: "chairs",
    material: "Oak",
    inStock: true,
    imageUrl: chairImageOne,
  },
  {
    id: "p2",
    name: "heritage",
    price: 560,
    category: "armchairs",
    material: "Walnut",
    inStock: true,
    imageUrl: "https://via.placeholder.com/500x380?text=heritage",
  },
  {
    id: "p3",
    name: "frame",
    price: 450,
    category: "chairs",
    material: "Ash",
    inStock: false,
    imageUrl: chairImageTwo,
  },
  {
    id: "p4",
    name: "petal",
    price: 920,
    category: "sofas",
    material: "Beech",
    inStock: true,
    imageUrl: "https://via.placeholder.com/500x380?text=petal",
  },
  {
    id: "p5",
    name: "comfa",
    price: 600,
    category: "armchairs",
    material: "Oak",
    inStock: true,
    imageUrl: "https://via.placeholder.com/500x380?text=comfa",
  },
];
