import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth/jwt';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

// GET — return user's wishlist
export async function GET() {
  const tokenUser = await getAuthUser();
  if (!tokenUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findById(tokenUser.userId).select('wishlist').lean();
  
  if (!user || !user.wishlist || user.wishlist.length === 0) {
    return NextResponse.json({ wishlist: [], products: [] });
  }

  // Fetch full products from MongoDB
  const products = await Product.find({
    _id: { $in: user.wishlist }
  }).select('name price image category rating reviewCount slug originalPrice isNewProduct').lean();

  const formattedProducts = products.map((p: any) => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category,
    rating: p.rating,
    reviewCount: p.reviewCount,
    slug: p.slug,
    originalPrice: p.originalPrice,
    isNew: p.isNewProduct,
  }));

  return NextResponse.json({ wishlist: user.wishlist, products: formattedProducts });
}

// POST — add product to wishlist
export async function POST(request: Request) {
  const tokenUser = await getAuthUser();
  if (!tokenUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await request.json();
  if (!productId) {
    return NextResponse.json({ error: 'productId is required' }, { status: 400 });
  }

  await dbConnect();
  await User.findByIdAndUpdate(tokenUser.userId, {
    $addToSet: { wishlist: productId },
  });

  return NextResponse.json({ success: true, message: 'Added to wishlist' });
}

// DELETE — remove product from wishlist
export async function DELETE(request: Request) {
  const tokenUser = await getAuthUser();
  if (!tokenUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await request.json();
  if (!productId) {
    return NextResponse.json({ error: 'productId is required' }, { status: 400 });
  }

  await dbConnect();
  await User.findByIdAndUpdate(tokenUser.userId, {
    $pull: { wishlist: productId },
  });

  return NextResponse.json({ success: true, message: 'Removed from wishlist' });
}
