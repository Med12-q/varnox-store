'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useOrders } from '@/lib/orders-context'
import type { Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  X, 
  ShoppingBag, 
  Check, 
  Copy, 
  MessageCircle,
  Send
} from 'lucide-react'

type OrderModalProps = {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function OrderModal({ product, isOpen, onClose }: OrderModalProps) {
  const { language, t } = useLanguage()
  const { createOrder } = useOrders()
  const [userName, setUserName] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    const order = createOrder(product.id, product.name[language], product.price, userName || undefined)
    setOrderId(order.id)
    setOrderPlaced(true)
    setIsLoading(false)
  }

  const handleCopyId = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const whatsappMessage = encodeURIComponent(
    `Commande VARNOX STORE\n\nID: ${orderId}\nProduit: ${product.name[language]}\nPrix: $${product.price} USD\n\nJe souhaite finaliser ma commande.`
  )
  const whatsappLink = `https://wa.me/+224669288332?text=${whatsappMessage}`
  
  const telegramLink = `https://t.me/Varnox_Or_novark`

  const handleClose = () => {
    setOrderPlaced(false)
    setOrderId('')
    setUserName('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!orderPlaced ? (
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t.orders.title}</h3>
                <p className="text-sm text-muted-foreground">{t.orders.orderSummary}</p>
              </div>
            </div>

            <div className="glass rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t.orders.product}</span>
                <span className="text-sm font-medium text-foreground">{product.name[language]}</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{t.orders.price}</span>
                <span className="text-lg font-bold text-primary">${product.price} USD</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.orders.yourName}
              </label>
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="John Doe"
                className="bg-input border-border focus:border-primary"
              />
            </div>

            <Button
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {t.common.loading}
                </span>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  {t.orders.placeOrder}
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{t.orders.orderPlaced}</h3>
              <p className="text-sm text-muted-foreground">{t.orders.orderConfirmed}</p>
            </div>

            <div className="glass rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{t.orders.orderId}</span>
                <button
                  onClick={handleCopyId}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-xs text-green-500">{t.orders.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{t.orders.copyOrderId}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-2xl font-mono font-bold text-primary tracking-wider text-center py-2">
                {orderId}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-center text-muted-foreground mb-4">
                {t.orders.contactPayment}
              </p>
              
              <div className="flex gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>

            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full border-border hover:bg-secondary"
            >
              {t.common.close}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
