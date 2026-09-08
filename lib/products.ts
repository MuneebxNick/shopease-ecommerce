export type Product = {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: 'aurora-headphones',
    name: 'Aurora Wireless Headphones',
    category: 'Electronics',
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    reviewCount: 312,
    image: '/images/product-headphones.png',
  },
  {
    id: 'meridian-watch',
    name: 'Meridian Smart Watch',
    category: 'Electronics',
    price: 329,
    rating: 4.6,
    reviewCount: 187,
    image: '/images/product-watch.png',
    isNew: true,
  },
  {
    id: 'wayfare-backpack',
    name: 'Wayfare Leather Backpack',
    category: 'Fashion',
    price: 189,
    originalPrice: 220,
    rating: 4.9,
    reviewCount: 421,
    image: '/images/product-backpack.png',
  },
  {
    id: 'strider-sneakers',
    name: 'Strider Running Sneakers',
    category: 'Sports',
    price: 129,
    rating: 4.7,
    reviewCount: 268,
    image: '/images/product-sneakers.png',
    isNew: true,
  },
  {
    id: 'lumen-skincare',
    name: 'Lumen Skincare Set',
    category: 'Beauty',
    price: 78,
    originalPrice: 96,
    rating: 4.5,
    reviewCount: 154,
    image: '/images/product-skincare.png',
  },
  {
    id: 'haven-lamp',
    name: 'Haven Desk Lamp',
    category: 'Home',
    price: 96,
    rating: 4.8,
    reviewCount: 203,
    image: '/images/product-lamp.png',
  },
]

export const categories = [
  { name: 'Electronics', href: '#', image: '/images/category-electronics.png' },
  { name: 'Fashion', href: '#', image: '/images/category-fashion.png' },
  { name: 'Home', href: '#', image: '/images/category-home.png' },
  { name: 'Beauty', href: '#', image: '/images/category-beauty.png' },
  { name: 'Sports', href: '#', image: '/images/category-sports.png' },
]
