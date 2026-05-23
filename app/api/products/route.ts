import { NextResponse } from 'next/server'
import { products } from '@/lib/products'

// GET /api/products - Get all products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const lang = searchParams.get('lang') || 'en'

  let filteredProducts = [...products]

  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  // Filter by search
  if (search) {
    const lowerSearch = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name[lang as 'fr' | 'en'].toLowerCase().includes(lowerSearch) ||
        p.description[lang as 'fr' | 'en'].toLowerCase().includes(lowerSearch)
    )
  }

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
  })
}

// POST /api/products - Create a new product (admin only)
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In production, validate admin authentication here
    // and save to database

    const newProduct = {
      id: crypto.randomUUID(),
      ...body,
    }

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully',
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
