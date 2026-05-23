'use client'

import { useState, useEffect } from 'react'
import { Users, Circle } from 'lucide-react'

export function OnlineVisitors() {
  const [mounted, setMounted] = useState(false)
  const [visitors, setVisitors] = useState(47)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.floor(Math.random() * 5) - 2
        return Math.max(15, Math.min(120, prev + change))
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:block">
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg">
        <div className="relative">
          <Circle className="w-2 h-2 fill-green-500 text-green-500" />
          <Circle className="w-2 h-2 fill-green-500 text-green-500 absolute inset-0 animate-ping opacity-75" />
        </div>
        <Users className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-medium text-foreground">{visitors}</span>
        <span className="text-xs text-muted-foreground">en ligne</span>
      </div>
    </div>
  )
}
