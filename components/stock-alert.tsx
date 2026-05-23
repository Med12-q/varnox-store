'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Clock, Flame } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface StockAlertProps {
  productId: string
  initialStock?: number
}

export function StockAlert({ productId, initialStock = 15 }: StockAlertProps) {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [stock, setStock] = useState(initialStock)
  const [recentBuyers, setRecentBuyers] = useState(0)

  useEffect(() => {
    setMounted(true)
    // Simulate different stock levels per product
    const hash = productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
    setStock(5 + (hash % 20))
    setRecentBuyers(2 + (hash % 8))
  }, [productId])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setStock(prev => Math.max(1, prev - 1))
        setRecentBuyers(prev => prev + 1)
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const isLowStock = stock <= 5
  const isUrgent = stock <= 3

  return (
    <div className="space-y-2">
      {isLowStock && (
        <div className={`flex items-center gap-2 text-xs ${isUrgent ? 'text-red-400' : 'text-orange-400'}`}>
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>
            {language === 'fr' 
              ? `Seulement ${stock} restant${stock > 1 ? 's' : ''} !` 
              : `Only ${stock} left!`}
          </span>
        </div>
      )}
      
      {recentBuyers > 0 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>
            {language === 'fr'
              ? `${recentBuyers} acheteurs recents`
              : `${recentBuyers} recent buyers`}
          </span>
        </div>
      )}
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        <span>
          {language === 'fr'
            ? 'Livraison instantanee'
            : 'Instant delivery'}
        </span>
      </div>
    </div>
  )
}
