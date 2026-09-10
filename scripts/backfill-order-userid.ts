// One-time script: backfill userId on existing orders that match a user's email
// Usage: npx tsx scripts/backfill-order-userid.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI as string);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db!;
  const usersCol = db.collection('users');
  const ordersCol = db.collection('orders');

  // Get all orders without userId
  const orphanedOrders = await ordersCol.find({ userId: { $exists: false } }).toArray();
  console.log(`Found ${orphanedOrders.length} orders without userId`);

  let updated = 0;
  for (const order of orphanedOrders) {
    const email = order.customer?.email;
    if (!email) continue;

    const user = await usersCol.findOne({ email });
    if (user) {
      await ordersCol.updateOne(
        { _id: order._id },
        { $set: { userId: user._id.toString() } }
      );
      console.log(`  Updated order ${order.orderNumber} → userId: ${user._id.toString()}`);
      updated++;
    } else {
      console.log(`  No user found for order ${order.orderNumber} (email: ${email})`);
    }
  }

  console.log(`\nDone. Updated ${updated} of ${orphanedOrders.length} orders.`);
  await mongoose.disconnect();
}

run().catch(console.error);
