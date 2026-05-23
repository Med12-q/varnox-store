'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import { getProductById, products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowLeft,
  Check,
  ShoppingCart,
  MessageSquare,
  Bot,
  Zap,
  Sparkles,
  Download,
  Shield,
  Wrench,
  Brain,
  Star,
  Clock,
  Headphones,
} from 'lucide-react'

const categoryIcons = {
  whatsapp: MessageSquare,
  telegram: Bot,
  automation: Zap,
  ai: Brain,
  security: Shield,
  tools: Wrench,
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { language, t } = useLanguage()
  const { user, addPurchase } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [imageError, setImageError] = useState(false)

  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  const Icon = categoryIcons[product.category]
  const isPurchased = user?.purchases.includes(product.id) || false

  // Get related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handlePurchase = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    addPurchase(product.id)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link href="/products">
          <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.common.back}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Product Image */}
          <Card className="glass border-border/50 overflow-hidden">
            <div className="relative h-80 lg:h-full min-h-[400px] bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10">
              {!imageError ? (
                <Image
                  src={product.image}
                  alt={product.name[language]}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-card/80 border border-border/50 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-primary" />
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              
              {product.badge && (
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {product.badge}
                </div>
              )}
              
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          {/* Product Details */}
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                {t.categories[product.category as keyof typeof t.categories]}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="ml-1">(4.9)</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name[language]}</h1>

            <p className="text-lg text-muted-foreground mb-6">{product.description[language]}</p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              <span className="text-lg text-muted-foreground">USD</span>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                {language === 'fr' ? 'Fonctionnalites' : 'Features'}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features[language].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isPurchased ? (
                <Button size="lg" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground h-12">
                  <Download className="w-5 h-5 mr-2" />
                  {t.dashboard.download}
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                  onClick={handlePurchase}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {t.common.loading}
                    </span>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {t.products.buyNow}
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Guarantees */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <Shield className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">
                  {language === 'fr' ? 'Securise' : 'Secure'}
                </span>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">
                  {language === 'fr' ? 'Instant' : 'Instant'}
                </span>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <Headphones className="w-5 h-5 text-primary mx-auto mb-1" />
                <span className="text-xs text-muted-foreground">
                  {language === 'fr' ? 'Support 24/7' : '24/7 Support'}
                </span>
              </div>
            </div>

            {/* Support Info */}
            <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-sm text-muted-foreground">
                {language === 'fr'
                  ? 'Support 24/7 inclus. Mises a jour gratuites a vie. Installation assistee disponible.'
                  : '24/7 support included. Free lifetime updates. Assisted installation available.'}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {language === 'fr' ? 'Produits similaires' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
