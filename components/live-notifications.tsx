'use client'

import { useState, useEffect } from 'react'
import { X, ShoppingCart, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface Notification {
  id: string
  name: string
  product: string
  location: string
  time: string
}

const fakeCustomers = [
  { name: 'Ahmed K.', location: 'Conakry' },
  { name: 'Mamadou B.', location: 'Dakar' },
  { name: 'Sarah M.', location: 'Abidjan' },
  { name: 'Omar D.', location: 'Bamako' },
  { name: 'Fatou S.', location: 'Casablanca' },
  { name: 'Ibrahim T.', location: 'Lagos' },
  { name: 'Aisha N.', location: 'Accra' },
  { name: 'Moussa K.', location: 'Douala' },
  { name: 'Jean P.', location: 'Kinshasa' },
  { name: 'Marie L.', location: 'Paris' },
]

const fakeProducts = [
  'WhatsApp Bot Pro',
  'Telegram Automation',
  'Virtual Number Pack',
  'AI Chatbot Script',
  'WhatsApp Certification',
  'Mass Sender Pro',
  'CRM Bot Pro',
]

export function LiveNotifications() {
  const { language } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const generateNotification = () => {
      const customer = fakeCustomers[Math.floor(Math.random() * fakeCustomers.length)]
      const product = fakeProducts[Math.floor(Math.random() * fakeProducts.length)]
      const times = language === 'fr' 
        ? ['il y a 2 min', 'il y a 5 min', 'il y a 8 min', 'a l\'instant']
        : ['2 min ago', '5 min ago', '8 min ago', 'just now']
      
      const newNotification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        name: customer.name,
        product,
        location: customer.location,
        time: times[Math.floor(Math.random() * times.length)],
      }

      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 3)
        return updated
      })

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
      }, 5000)
    }

    // Initial notification
    const initialTimeout = setTimeout(generateNotification, 3000)

    // Periodic notifications
    const interval = setInterval(generateNotification, 15000 + Math.random() * 10000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [language])

  if (!isVisible || notifications.length === 0) return null

  return (
    <div className="fixed bottom-24 left-4 z-40 flex flex-col gap-2 max-w-[300px]">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className="glass rounded-xl p-3 border border-border/50 shadow-lg animate-slide-in-left"
          style={{ 
            animationDelay: `${index * 100}ms`,
            opacity: 1 - index * 0.2 
          }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>{language === 'fr' ? 'Nouvelle vente' : 'New sale'}</span>
              </div>
              <p className="text-sm font-medium text-foreground truncate">
                {notification.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {language === 'fr' ? 'a achete' : 'purchased'} <span className="text-primary">{notification.product}</span>
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted-foreground/70">{notification.location}</span>
                <span className="text-[10px] text-muted-foreground/70">{notification.time}</span>
              </div>
            </div>
            <button
              onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
