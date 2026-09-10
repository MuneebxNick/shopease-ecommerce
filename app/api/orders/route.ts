import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db/mongodb';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/auth/jwt';

function generateOrderNumber() {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SE-${dateStr}-${randomStr}`;
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { customer, items } = body;

    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
    }

    // Map frontend cart item 'id' to schema 'productId'
    const mappedItems = items.map((item: any) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));

    // Calculate total on server
    const totalAmount = mappedItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const orderNumber = generateOrderNumber();

    // Read auth cookie directly in the route handler
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    const tokenUser = token ? verifyToken(token) : null;

    const order = new Order({
      userId: tokenUser?.userId || undefined,
      orderNumber,
      customer,
      items: mappedItems,
      totalAmount,
      paymentMethod: 'Cash on Delivery',
      status: 'pending'
    });

    const savedOrder = await order.save();

    return NextResponse.json({
      success: true,
      orderId: savedOrder._id.toString(),
      orderNumber: savedOrder.orderNumber
    }, { status: 201 });

  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
