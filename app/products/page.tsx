'use client'

import { useState, useMemo } from 'react'
import { useLanguage } from '@/lib/language-context'
import { products, type Product } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, MessageSquare, Bot, Zap, Brain, Shield, Wrench, LayoutGrid } from 'lucide-react'

const categories = [
  { id: 'all', icon: LayoutGrid },
  { id: 'whatsapp', icon: MessageSquare },
  { id: 'telegram', icon: Bot },
  { id: 'ai', icon: Brain },
  { id: 'automation', icon: Zap },
  { id: 'security', icon: Shield },
  { id: 'tools', icon: Wrench },
] as const

export default function ProductsPage() {
  const { language, t } = useLanguage()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProducts = useMemo(() => {
    let result: Product[] = products

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by search
    if (search.trim()) {
      const lowerSearch = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name[language].toLowerCase().includes(lowerSearch) ||
          p.description[language].toLowerCase().includes(lowerSearch)
      )
    }

    return result
  }, [search, selectedCategory, language])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">{t.products.title}</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.products.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.products.search}
              className="pl-10 bg-input border-border focus:border-primary"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              const label = t.categories[category.id as keyof typeof t.categories]
              const isActive = selectedCategory === category.id

              return (
                <Button
                  key={category.id}
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    isActive
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'border-border hover:border-primary hover:text-primary'
                  }
                >
                  {Icon && <Icon className="w-4 h-4 mr-1.5" />}
                  {label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.products.noProducts}</h3>
            <p className="text-muted-foreground">
              {language === 'fr'
                ? 'Essayez de modifier vos critères de recherche.'
                : 'Try adjusting your search criteria.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
