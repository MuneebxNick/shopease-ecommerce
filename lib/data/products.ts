export type Product = {
  id: string
  slug: string
  name: string
  description: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string // Kept to ensure existing UI components compile
  images: string[]
  stock: number
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: 'aurora-headphones',
    slug: 'aurora-wireless-headphones',
    name: 'Aurora Wireless Headphones',
    description: 'High-fidelity wireless headphones with active noise cancellation and 30-hour battery life.',
    category: 'Electronics',
    price: 15000,
    originalPrice: 18000,
    rating: 4.8,
    reviewCount: 312,
    image: '/images/product-headphones.png',
    images: ['/images/product-headphones.png'],
    stock: 45,
  },
  {
    id: 'meridian-watch',
    slug: 'meridian-smart-watch',
    name: 'Meridian Smart Watch',
    description: 'Premium smartwatch with health tracking, GPS, and a beautiful OLED display.',
    category: 'Electronics',
    price: 25000,
    rating: 4.6,
    reviewCount: 187,
    image: '/images/product-watch.png',
    images: ['/images/product-watch.png'],
    stock: 12,
    isNew: true,
  },
  {
    id: 'wayfare-backpack',
    slug: 'wayfare-leather-backpack',
    name: 'Wayfare Leather Backpack',
    description: 'Handcrafted full-grain leather backpack designed for everyday carry.',
    category: 'Fashion',
    price: 8500,
    originalPrice: 10000,
    rating: 4.9,
    reviewCount: 421,
    image: '/images/product-backpack.png',
    images: ['/images/product-backpack.png'],
    stock: 8,
  },
  {
    id: 'strider-sneakers',
    slug: 'strider-running-sneakers',
    name: 'Strider Running Sneakers',
    description: 'Lightweight performance running shoes with responsive cushioning.',
    category: 'Sports',
    price: 12000,
    rating: 4.7,
    reviewCount: 268,
    image: '/images/product-sneakers.png',
    images: ['/images/product-sneakers.png'],
    stock: 115,
    isNew: true,
  },
  {
    id: 'lumen-skincare',
    slug: 'lumen-skincare-set',
    name: 'Lumen Skincare Set',
    description: 'A complete 3-step daily skincare routine for glowing, hydrated skin.',
    category: 'Beauty',
    price: 4500,
    originalPrice: 5500,
    rating: 4.5,
    reviewCount: 154,
    image: '/images/product-skincare.png',
    images: ['/images/product-skincare.png'],
    stock: 62,
  },
  {
    id: 'haven-lamp',
    slug: 'haven-desk-lamp',
    name: 'Haven Desk Lamp',
    description: 'Minimalist LED desk lamp with adjustable color temperature and wireless charging base.',
    category: 'Home',
    price: 6000,
    rating: 4.8,
    reviewCount: 203,
    image: '/images/product-lamp.png',
    images: ['/images/product-lamp.png'],
    stock: 24,
  },
]

export const categories = [
  { name: 'Electronics', href: '/products?category=Electronics', image: '/images/category-electronics.png' },
  { name: 'Fashion', href: '/products?category=Fashion', image: '/images/category-fashion.png' },
  { name: 'Home', href: '/products?category=Home', image: '/images/category-home.png' },
  { name: 'Beauty', href: '/products?category=Beauty', image: '/images/category-beauty.png' },
  { name: 'Sports', href: '/products?category=Sports', image: '/images/category-sports.png' },
]
