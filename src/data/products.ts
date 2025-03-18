
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  image: string;
  featured?: boolean;
  bestSeller?: boolean;
  tags?: string[];
  variants?: {
    id: string;
    name: string;
    price: number;
  }[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Sérum Facial Hidratante",
    brand: "Bem Me Faz",
    category: "skincare",
    description: "Sérum facial de ácido hialurônico para uma hidratação intensa e duradoura. Ideal para todos os tipos de pele.",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=987&auto=format&fit=crop",
    featured: true,
    bestSeller: true,
    tags: ["hidratação", "facial", "ácido hialurônico"]
  },
  {
    id: "2",
    name: "Creme Anti-idade Noturno",
    brand: "Bem Me Faz",
    category: "skincare",
    description: "Creme noturno com fórmula anti-idade que atua durante o sono para uma pele mais firme e rejuvenescida.",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1631730486572-412701d80aae?q=80&w=1025&auto=format&fit=crop",
    tags: ["anti-idade", "noturno", "firmeza"]
  },
  {
    id: "3",
    name: "Máscara Capilar Reparadora",
    brand: "Bem Me Faz",
    category: "cabelo",
    description: "Máscara capilar para cabelos danificados. Repara e fortalece os fios, reduzindo o frizz e aumentando o brilho.",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1626123552399-8bc07c93e0df?q=80&w=987&auto=format&fit=crop",
    bestSeller: true,
    tags: ["capilar", "reparação", "hidratação"]
  },
  {
    id: "4",
    name: "Óleo Corporal Natural",
    brand: "Bem Me Faz",
    category: "corpo",
    description: "Óleo corporal nutritivo feito com ingredientes naturais para uma pele sedosa e profundamente hidratada.",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=986&auto=format&fit=crop",
    featured: true,
    tags: ["óleo", "corporal", "natural"]
  },
  {
    id: "5",
    name: "Protetor Labial com FPS",
    brand: "Bem Me Faz",
    category: "lábios",
    description: "Protetor labial com FPS 30 que hidrata e protege seus lábios dos danos solares. Com manteiga de karité e vitamina E.",
    price: 24.90,
    image: "https://images.unsplash.com/photo-1575330933415-cea1e7ce53eb?q=80&w=1064&auto=format&fit=crop",
    tags: ["labial", "fps", "hidratação"]
  },
  {
    id: "6",
    name: "Água Micelar Suave",
    brand: "Bem Me Faz",
    category: "limpeza",
    description: "Água micelar suave para limpeza facial diária. Remove maquiagem e impurezas sem ressecar a pele.",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1035&auto=format&fit=crop",
    tags: ["limpeza", "facial", "micelar"]
  },
  {
    id: "7",
    name: "Protetor Solar Facial FPS 50",
    brand: "Bem Me Faz",
    category: "proteção solar",
    description: "Protetor solar facial com FPS 50 e proteção UVA/UVB. Fórmula leve e de rápida absorção, ideal para uso diário.",
    price: 69.90,
    image: "https://images.unsplash.com/photo-1556229174-5e42a09e40c3?q=80&w=987&auto=format&fit=crop",
    featured: true,
    tags: ["protetor solar", "facial", "fps 50"]
  },
  {
    id: "8",
    name: "Esfoliante Corporal com Açúcar",
    brand: "Bem Me Faz",
    category: "corpo",
    description: "Esfoliante corporal com açúcar e óleos naturais que removem células mortas e deixam a pele macia e renovada.",
    price: 54.90,
    image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=1170&auto=format&fit=crop",
    tags: ["esfoliante", "corporal", "renovação"]
  }
];

export const categories = [
  { id: "all", name: "Todos" },
  { id: "skincare", name: "Cuidados Faciais" },
  { id: "cabelo", name: "Cabelo" },
  { id: "corpo", name: "Corpo" },
  { id: "lábios", name: "Lábios" },
  { id: "limpeza", name: "Limpeza" },
  { id: "proteção solar", name: "Proteção Solar" }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getBestSellerProducts(): Product[] {
  return products.filter(product => product.bestSeller);
}
