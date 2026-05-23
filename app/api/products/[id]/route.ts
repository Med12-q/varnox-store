import { NextResponse } from 'next/server'
import { getProductById } from '@/lib/products'

// GET /api/products/[id] - Get a single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: product,
  })
}

// PUT /api/products/[id] - Update a product (admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    )
  }

  try {
    const body = await request.json()

    // In production, validate admin authentication here
    // and update in database

    const updatedProduct = {
      ...product,
      ...body,
      id, // Ensure ID doesn't change
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully',
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// DELETE /api/products/[id] - Delete a product (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    )
  }

  // In production, validate admin authentication here
  // and delete from database

  return NextResponse.json({
    success: true,
    message: 'Product deleted successfully',
  })
}
