// API Response Types
export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// User Types
export type User = {
  id: string
  name: string
  email: string
  purchases: string[]
  createdAt?: string
}

export type UserWithPassword = User & {
  password: string
}

// Product Types
export type ProductCategory = 'whatsapp' | 'telegram' | 'automation' | 'ai'

export type Product = {
  id: string
  name: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  price: number
  category: ProductCategory
  features: {
    fr: string[]
    en: string[]
  }
  image: string
  popular?: boolean
}

// Order Types
export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export type Order = {
  id: string
  userId: string
  productId: string
  productName?: {
    fr: string
    en: string
  }
  amount: number
  currency: string
  status: OrderStatus
  paymentMethod?: string
  createdAt: string
  updatedAt?: string
}

// AI Chat Types
export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export type AIRequest = {
  message: string
  language: 'fr' | 'en'
  conversationHistory?: ChatMessage[]
}

export type AIResponse = {
  message: string
  timestamp: string
}

// Language Types
export type Language = 'fr' | 'en'

// Database Schema (for reference when connecting to real DB)
export type DatabaseSchema = {
  users: {
    id: string // UUID
    name: string
    email: string // unique
    password_hash: string
    purchases: string[] // Array of product IDs
    created_at: Date
    updated_at: Date
  }
  products: {
    id: string // UUID
    name_fr: string
    name_en: string
    description_fr: string
    description_en: string
    price: number // In cents for precision
    category: ProductCategory
    features_fr: string[]
    features_en: string[]
    image_url: string
    is_popular: boolean
    created_at: Date
    updated_at: Date
  }
  orders: {
    id: string // UUID
    user_id: string // FK to users
    product_id: string // FK to products
    amount: number // In cents
    currency: string
    status: OrderStatus
    payment_method: string
    payment_intent_id?: string // Stripe payment intent
    created_at: Date
    updated_at: Date
  }
}
