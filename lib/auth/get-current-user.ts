import { cookies } from 'next/headers';
import { verifyToken, JwtPayload } from './jwt';

export async function getCurrentUser(): Promise<JwtPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return null;
    }

    return verifyToken(token);
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}
