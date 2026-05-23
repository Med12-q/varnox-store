'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import type { Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { OrderModal } from '@/components/order-modal'
import { StockAlert } from '@/components/stock-alert'
import { Check, ShoppingBag, Sparkles, MessageSquare, Bot, Zap, Shield, Wrench, Brain } from 'lucide-react'

const categoryIcons = {
  whatsapp: MessageSquare,
  telegram: Bot,
  automation: Zap,
  ai: Brain,
  security: Shield,
  tools: Wrench,
}

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-primary/90 text-primary-foreground',
  'Premium': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  'Hot': 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
  'Pro': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
  'Popular': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  'Security': 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
  'AI Powered': 'bg-gradient-to-r from-violet-500 to-purple-500 text-white',
}

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage()
  const [imageError, setImageError] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const Icon = categoryIcons[product.category]

  return (
    <>
      <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-44 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 overflow-hidden">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.name[language]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-card/80 border border-border/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            
            {product.badge && (
              <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg ${badgeColors[product.badge] || 'bg-primary/90 text-primary-foreground'}`}>
                {product.popular && <Sparkles className="w-3 h-3" />}
                {product.badge}
              </div>
            )}
            
            <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {product.name[language]}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description[language]}
          </p>

          <ul className="space-y-1.5 mb-4">
            {product.features[language].slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Check className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-bold text-primary">${product.price}</span>
            <span className="text-sm text-muted-foreground">USD</span>
          </div>

          <StockAlert productId={product.id} />
        </CardContent>

        <CardFooter className="p-5 pt-0 flex gap-2">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setIsOrderModalOpen(true)}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {t.products.order}
          </Button>
          <Link href={`/products/${product.id}`}>
            <Button variant="outline" className="border-border hover:border-primary hover:bg-primary/10">
              {t.products.details}
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <OrderModal
        product={product}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </>
  )
}
