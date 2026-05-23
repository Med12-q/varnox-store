import { NextResponse } from 'next/server'

// POST /api/auth/logout - User logout
export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  })

  // In production, clear the session cookie:
  // response.cookies.delete('session')

  return response
}
