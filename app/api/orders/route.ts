import { NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'

// GET /api/orders - Get user's orders
export async function GET(request: Request) {
  // In production, get user from session/token
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'User ID is required' },
      { status: 400 }
    )
  }

  // In production, query orders from database
  const mockOrders = [
    {
      id: 'order_1',
      userId,
      productId: 'whatsapp-multi-device',
      status: 'completed',
      amount: 49.99,
      createdAt: new Date().toISOString(),
    },
  ]

  return NextResponse.json({
    success: true,
    data: mockOrders,
    total: mockOrders.length,
  })
}

// POST /api/orders - Create a new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, productId, paymentMethod } = body

    if (!userId || !productId) {
      return NextResponse.json(
        { success: false, error: 'User ID and Product ID are required' },
        { status: 400 }
      )
    }

    // Validate product exists
    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // In production, this would:
    // 1. Validate user session
    // 2. Process payment via Stripe
    // 3. Create order record in database
    // 4. Update user's purchases
    // 5. Send confirmation email

    const newOrder = {
      id: `order_${Date.now()}`,
      userId,
      productId,
      productName: product.name,
      amount: product.price,
      currency: 'USD',
      status: 'completed',
      paymentMethod: paymentMethod || 'card',
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: 'Order created successfully',
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
