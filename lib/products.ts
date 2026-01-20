// Product data and repository functions
import type { Product, Category } from "./types";

// Categories
export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Latest tech gadgets and devices",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    description: "Trendy clothing and accessories",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    name: "Home & Living",
    slug: "home-living",
    description: "Furniture and home decor",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    description: "Fitness and outdoor gear",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
];

// Product catalog with high-quality placeholder images
export const products: Product[] = [
  // Electronics
  {
    id: "prod-1",
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    longDescription: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, comfortable over-ear design, and exceptional battery life. Perfect for travel, work, or leisure.",
    price: 199.99,
    discountPrice: 149.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    stock: 45,
    rating: 4.8,
    reviewCount: 324,
    tags: ["audio", "wireless", "bluetooth"],
    badges: ["Bestseller", "Sale"],
    featured: true,
    createdAt: "2024-01-15",
  },
  {
    id: "prod-2",
    name: "Smart Watch Pro",
    slug: "smart-watch-pro",
    description: "Advanced fitness tracking and health monitoring",
    longDescription: "Stay connected and healthy with our feature-rich smartwatch. Track your workouts, monitor heart rate, receive notifications, and enjoy a week-long battery life. Water-resistant design perfect for active lifestyles.",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    stock: 32,
    rating: 4.6,
    reviewCount: 189,
    tags: ["wearable", "fitness", "smart"],
    badges: ["New"],
    featured: true,
    createdAt: "2024-02-01",
  },
  {
    id: "prod-3",
    name: "4K Ultra HD TV 55\"",
    slug: "4k-ultra-hd-tv-55",
    description: "Immersive viewing experience with HDR10+",
    longDescription: "Transform your living room with stunning 4K resolution and HDR10+ support. Smart TV features with voice control, streaming apps, and a sleek bezel-less design.",
    price: 699.99,
    discountPrice: 599.99,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    stock: 18,
    rating: 4.7,
    reviewCount: 267,
    tags: ["tv", "4k", "smart"],
    badges: ["Sale"],
    featured: false,
    createdAt: "2024-01-20",
  },
  {
    id: "prod-4",
    name: "Laptop Pro 15\"",
    slug: "laptop-pro-15",
    description: "High-performance laptop for professionals",
    longDescription: "Power through your work with our premium laptop featuring the latest processor, stunning display, and all-day battery life. Perfect for creative professionals and developers.",
    price: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    categorySlug: "electronics",
    stock: 12,
    rating: 4.9,
    reviewCount: 156,
    tags: ["laptop", "computing", "professional"],
    badges: ["Bestseller"],
    featured: true,
    createdAt: "2024-01-10",
  },
  // Fashion
  {
    id: "prod-5",
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    description: "Timeless style with modern comfort",
    longDescription: "A wardrobe essential that never goes out of style. Made from premium denim with a comfortable fit and versatile design. Perfect for layering in any season.",
    price: 79.99,
    discountPrice: 59.99,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=800&fit=crop",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    stock: 67,
    rating: 4.5,
    reviewCount: 98,
    tags: ["jacket", "denim", "casual"],
    badges: ["Sale"],
    featured: true,
    createdAt: "2024-01-25",
  },
  {
    id: "prod-6",
    name: "Leather Sneakers",
    slug: "leather-sneakers",
    description: "Comfortable and stylish everyday sneakers",
    longDescription: "Step out in style with these premium leather sneakers. Featuring cushioned insoles, durable construction, and a sleek design that works for any occasion.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    stock: 54,
    rating: 4.6,
    reviewCount: 143,
    tags: ["shoes", "sneakers", "leather"],
    badges: ["New"],
    featured: false,
    createdAt: "2024-02-05",
  },
  {
    id: "prod-7",
    name: "Designer Handbag",
    slug: "designer-handbag",
    description: "Elegant and spacious designer handbag",
    longDescription: "Carry your essentials in style with this beautifully crafted handbag. Premium materials, multiple compartments, and a timeless design that complements any outfit.",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    stock: 28,
    rating: 4.7,
    reviewCount: 87,
    tags: ["bag", "accessories", "designer"],
    badges: ["Bestseller"],
    featured: true,
    createdAt: "2024-01-18",
  },
  {
    id: "prod-8",
    name: "Cotton T-Shirt Pack",
    slug: "cotton-t-shirt-pack",
    description: "Soft and breathable 3-pack of premium tees",
    longDescription: "Essential basics made from 100% organic cotton. Soft, breathable, and perfect for everyday wear. Available in multiple color combinations.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=800&fit=crop",
    ],
    category: "Fashion",
    categorySlug: "fashion",
    stock: 89,
    rating: 4.4,
    reviewCount: 201,
    tags: ["tshirt", "basics", "cotton"],
    badges: [],
    featured: false,
    createdAt: "2024-01-12",
  },
  // Home & Living
  {
    id: "prod-9",
    name: "Modern Sofa Set",
    slug: "modern-sofa-set",
    description: "Comfortable 3-seater with matching cushions",
    longDescription: "Transform your living space with this elegant sofa set. Premium upholstery, comfortable cushions, and a modern design that fits any decor style.",
    price: 899.99,
    discountPrice: 749.99,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    categorySlug: "home-living",
    stock: 8,
    rating: 4.8,
    reviewCount: 45,
    tags: ["furniture", "sofa", "living"],
    badges: ["Sale"],
    featured: true,
    createdAt: "2024-01-22",
  },
  {
    id: "prod-10",
    name: "Ceramic Dinner Set",
    slug: "ceramic-dinner-set",
    description: "Elegant 16-piece dinnerware set",
    longDescription: "Set a beautiful table with this premium ceramic dinner set. Dishwasher safe, microwave safe, and featuring a timeless design that elevates any meal.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    categorySlug: "home-living",
    stock: 34,
    rating: 4.6,
    reviewCount: 112,
    tags: ["dinnerware", "ceramic", "kitchen"],
    badges: ["New"],
    featured: false,
    createdAt: "2024-02-08",
  },
  {
    id: "prod-11",
    name: "Smart LED Light Strips",
    slug: "smart-led-light-strips",
    description: "RGB color-changing LED strips with app control",
    longDescription: "Create the perfect ambiance with these smart LED light strips. Control via app, voice commands, or remote. Millions of colors and customizable effects.",
    price: 49.99,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    categorySlug: "home-living",
    stock: 76,
    rating: 4.5,
    reviewCount: 234,
    tags: ["lighting", "smart", "led"],
    badges: ["Bestseller"],
    featured: true,
    createdAt: "2024-01-28",
  },
  {
    id: "prod-12",
    name: "Decorative Wall Art Set",
    slug: "decorative-wall-art-set",
    description: "Set of 3 modern canvas prints",
    longDescription: "Add personality to your walls with this curated set of canvas prints. High-quality printing, ready to hang, and featuring contemporary designs.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&h=800&fit=crop",
    ],
    category: "Home & Living",
    categorySlug: "home-living",
    stock: 42,
    rating: 4.7,
    reviewCount: 67,
    tags: ["art", "decor", "wall"],
    badges: [],
    featured: false,
    createdAt: "2024-01-30",
  },
  // Sports & Outdoors
  {
    id: "prod-13",
    name: "Yoga Mat Pro",
    slug: "yoga-mat-pro",
    description: "Non-slip premium yoga mat with carrying strap",
    longDescription: "Practice with confidence on this premium yoga mat. Extra-thick padding, non-slip surface, and eco-friendly materials. Includes carrying strap for easy transport.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop",
    ],
    category: "Sports & Outdoors",
    categorySlug: "sports-outdoors",
    stock: 91,
    rating: 4.6,
    reviewCount: 178,
    tags: ["yoga", "fitness", "mat"],
    badges: ["Bestseller"],
    featured: true,
    createdAt: "2024-01-14",
  },
  {
    id: "prod-14",
    name: "Running Shoes",
    slug: "running-shoes",
    description: "Lightweight performance running shoes",
    longDescription: "Achieve your best run with these performance-focused running shoes. Lightweight design, superior cushioning, and breathable materials for maximum comfort.",
    price: 119.99,
    discountPrice: 99.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop",
    ],
    category: "Sports & Outdoors",
    categorySlug: "sports-outdoors",
    stock: 58,
    rating: 4.8,
    reviewCount: 289,
    tags: ["running", "shoes", "fitness"],
    badges: ["Sale", "Bestseller"],
    featured: true,
    createdAt: "2024-01-08",
  },
  {
    id: "prod-15",
    name: "Camping Tent 4-Person",
    slug: "camping-tent-4-person",
    description: "Weather-resistant family camping tent",
    longDescription: "Adventure awaits with this spacious 4-person tent. Easy setup, weather-resistant materials, and excellent ventilation. Perfect for family camping trips.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=800&fit=crop",
    ],
    category: "Sports & Outdoors",
    categorySlug: "sports-outdoors",
    stock: 15,
    rating: 4.7,
    reviewCount: 94,
    tags: ["camping", "tent", "outdoor"],
    badges: ["New"],
    featured: false,
    createdAt: "2024-02-10",
  },
  {
    id: "prod-16",
    name: "Dumbbell Set 20kg",
    slug: "dumbbell-set-20kg",
    description: "Adjustable weight dumbbell set for home gym",
    longDescription: "Build strength at home with this versatile dumbbell set. Adjustable weights, compact design, and durable construction. Everything you need for a complete workout.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop",
    ],
    category: "Sports & Outdoors",
    categorySlug: "sports-outdoors",
    stock: 23,
    rating: 4.5,
    reviewCount: 156,
    tags: ["weights", "fitness", "gym"],
    badges: [],
    featured: false,
    createdAt: "2024-01-16",
  },
];

// Helper functions
export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function filterProducts(filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  tags?: string[];
}): Product[] {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter((p) => p.categorySlug === filters.category);
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => (p.discountPrice || p.price) >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => (p.discountPrice || p.price) <= filters.maxPrice!);
  }

  if (filters.minRating !== undefined) {
    filtered = filtered.filter((p) => p.rating >= filters.minRating!);
  }

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter((p) =>
      filters.tags!.some((tag) => p.tags.includes(tag))
    );
  }

  return filtered;
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
