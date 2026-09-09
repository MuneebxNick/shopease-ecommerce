import dbConnect from '@/lib/db/mongodb'
import ProductModel from '@/models/Product'
import type { Product } from '@/lib/products'

// Helper to map Mongoose document to frontend Product interface
function mapProduct(doc: any): Product {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    category: doc.category,
    price: doc.price,
    originalPrice: doc.originalPrice,
    rating: doc.rating,
    reviewCount: doc.reviewCount,
    image: doc.image,
    images: doc.images,
    stock: doc.stock,
    isNew: doc.isNewProduct,
  }
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    await dbConnect()
  } catch (error) {
    console.error('Database connection failed:', error)
    return []
  }

  try {
    const query = category ? { category: { $regex: new RegExp(`^${category}$`, 'i') } } : {}
    const products = await ProductModel.find(query).lean()
    
    if (!products || products.length === 0) {
      console.warn('Products collection is empty')
      return []
    }

    return products.map(mapProduct)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    await dbConnect()
  } catch (error) {
    console.error('Database connection failed:', error)
    return undefined
  }

  try {
    const product = await ProductModel.findOne({ slug }).lean()
    if (!product) return undefined
    return mapProduct(product)
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return undefined
  }
}
