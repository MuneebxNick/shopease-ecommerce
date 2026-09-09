import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Order from '@/models/Order';

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

    const order = new Order({
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
