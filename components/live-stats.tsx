'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function LiveStats() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    visitors: 1247,
    sales: 89,
    revenue: 4520,
    activeUsers: 42,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        sales: prev.sales + (Math.random() > 0.8 ? 1 : 0),
        revenue: prev.revenue + (Math.random() > 0.8 ? Math.floor(Math.random() * 50) + 20 : 0),
        activeUsers: Math.max(20, Math.min(100, prev.activeUsers + Math.floor(Math.random() * 7) - 3)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Format number without locale-specific formatting to avoid hydration mismatch
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  if (!mounted) return null

  return (
    <div className="fixed top-20 right-4 z-30 hidden xl:block">
      <div className="glass rounded-xl p-4 border border-border/50 w-48 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-border/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-muted-foreground">
            {language === 'fr' ? 'Stats en direct' : 'Live Stats'}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs text-muted-foreground">
                {language === 'fr' ? 'En ligne' : 'Online'}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">{stats.activeUsers}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">
                {language === 'fr' ? 'Visiteurs' : 'Visitors'}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">{formatNumber(stats.visitors)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-3.5 h-3.5 text-green-500" />
              <span className="text-xs text-muted-foreground">
                {language === 'fr' ? 'Ventes' : 'Sales'}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">{stats.sales}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-xs text-muted-foreground">
                {language === 'fr' ? 'Revenus' : 'Revenue'}
              </span>
            </div>
            <span className="text-sm font-bold text-primary">${stats.revenue}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
