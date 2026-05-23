import { NextResponse } from 'next/server'

// POST /api/auth/register - User registration
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // In production, this would:
    // 1. Check if email already exists in database
    // 2. Hash password with bcrypt
    // 3. Create user record in database
    // 4. Create session or JWT token
    // 5. Set HTTP-only cookie

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      purchases: [],
      createdAt: new Date().toISOString(),
    }

    // Simulated response
    const response = NextResponse.json({
      success: true,
      data: {
        user: newUser,
        message: 'Registration successful',
      },
    })

    return response
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
