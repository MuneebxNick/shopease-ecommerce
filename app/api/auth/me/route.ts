import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/get-current-user';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';

export async function GET() {
  const tokenUser = await getCurrentUser();
  if (!tokenUser) {
    return NextResponse.json({ user: null });
  }

  await dbConnect();
  const dbUser = await User.findById(tokenUser.userId).lean();

  if (!dbUser) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ 
    user: {
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role,
      createdAt: dbUser.createdAt,
    } 
  });
}
