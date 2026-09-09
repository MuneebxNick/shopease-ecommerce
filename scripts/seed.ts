import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Note: tsx or ts-node is required to run this file.
// Command: npx tsx scripts/seed.ts
import { products } from '../lib/data/products';
import ProductModel from '../models/Product';

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  console.log('Clearing existing products...');
  await ProductModel.deleteMany({});
  
  console.log('Inserting mock products...');
  const dbProducts = products.map(p => ({
    slug: p.slug,
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    image: p.image,
    images: p.images,
    stock: p.stock,
    isNewProduct: p.isNew || false,
  }));

  await ProductModel.insertMany(dbProducts);
  console.log('Successfully seeded products!');

  await mongoose.disconnect();
}

seed().catch(console.error);
