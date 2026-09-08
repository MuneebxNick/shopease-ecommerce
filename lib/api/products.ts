import { products, type Product } from '@/lib/data/products'

export async function getProducts(category?: string): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = products
      if (category) {
        result = result.filter(p => p.category.toLowerCase() === category.toLowerCase())
      }
      resolve(result)
    }, 100) // Small simulated network delay
  })
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find(p => p.slug === slug)
      resolve(product)
    }, 100)
  })
}
