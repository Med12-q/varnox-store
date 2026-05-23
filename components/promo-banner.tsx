'use client'

import { useState, useEffect } from 'react'
import { X, Zap, Clock, Gift, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import Link from 'next/link'

export function PromoBanner() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground shadow-lg">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      
      <div className="container mx-auto px-4 py-2.5 relative">
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {/* Left sparkle */}
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse hidden sm:block" />
          
          {/* Flash badge */}
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'fr' ? 'Flash' : 'Flash'}
            </span>
          </div>
          
          {/* Main text */}
          <p className="text-sm font-medium hidden sm:block">
            {language === 'fr' 
              ? '-30% sur tous les scripts' 
              : '-30% on all scripts'}
          </p>

          {/* Code */}
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-yellow-300 hidden sm:block" />
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-mono font-bold tracking-wider border border-white/30">
              VARNOX30
            </span>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <Clock className="w-3.5 h-3.5 text-white/70" />
            <div className="flex items-center gap-0.5 font-mono text-sm font-bold">
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[24px] text-center">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-white/50">:</span>
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[24px] text-center">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-white/50">:</span>
              <span className="bg-black/30 rounded px-1.5 py-0.5 min-w-[24px] text-center">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Shop button */}
          <Link 
            href="/products"
            className="hidden md:flex items-center gap-1.5 text-xs font-bold bg-white text-primary rounded-full px-4 py-1.5 hover:bg-white/90 transition-all hover:scale-105"
          >
            {language === 'fr' ? 'Acheter' : 'Shop Now'}
          </Link>
          
          {/* Right sparkle */}
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse hidden sm:block" style={{ animationDelay: '0.5s' }} />

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white/80" />
          </button>
        </div>
      </div>
    </div>
  )
}
