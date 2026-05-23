'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import { useOrders } from '@/lib/orders-context'
import { getProductById } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  User,
  Package,
  Download,
  ShoppingBag,
  Clock,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  Loader2,
  Truck,
} from 'lucide-react'

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  processing: {
    icon: Loader2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  paid: {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  delivered: {
    icon: Truck,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
}

export default function DashboardPage() {
  const router = useRouter()
  const { language, t } = useLanguage()
  const { user, isLoading } = useAuth()
  const { orders, getUserOrders } = useOrders()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userOrders = getUserOrders(user.id)
  const deliveredOrders = userOrders.filter((o) => o.status === 'delivered')
  const pendingOrders = userOrders.filter((o) => o.status !== 'delivered')

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.dashboard.title}</h1>
          <p className="text-muted-foreground">
            {t.dashboard.welcome}, <span className="text-primary">{user.name}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <Card className="glass border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userOrders.length}</p>
                <p className="text-sm text-muted-foreground">{t.orders.totalOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingOrders.length}</p>
                <p className="text-sm text-muted-foreground">{t.orders.pendingOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deliveredOrders.length}</p>
                <p className="text-sm text-muted-foreground">{t.orders.deliveredOrders}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-border/50">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{deliveredOrders.length}</p>
                <p className="text-sm text-muted-foreground">{t.dashboard.myScripts}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders */}
        <Card className="glass border-border/50 mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              {t.orders.myOrders}
            </h2>
          </CardHeader>
          <CardContent>
            {userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map((order) => {
                  const product = getProductById(order.productId)
                  if (!product) return null
                  
                  const StatusIcon = statusConfig[order.status].icon
                  const statusColor = statusConfig[order.status].color
                  const statusBg = statusConfig[order.status].bg

                  return (
                    <div
                      key={order.id}
                      className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-lg bg-secondary/50 border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name[language]}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{product.name[language]}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="font-mono text-primary">{order.id}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(order.createdAt).toLocaleDateString(
                                language === 'fr' ? 'fr-FR' : 'en-US'
                              )}
                            </span>
                            <span className="font-semibold text-foreground">
                              ${product.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {/* Status Badge */}
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusBg}`}>
                          <StatusIcon className={`w-4 h-4 ${statusColor} ${order.status === 'processing' ? 'animate-spin' : ''}`} />
                          <span className={`text-sm font-medium ${statusColor}`}>
                            {t.orders.status[order.status]}
                          </span>
                        </div>

                        {/* Actions */}
                        {order.status === 'delivered' && order.deliveryContent && (
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            onClick={() => {
                              if (order.deliveryContent?.type === 'download') {
                                window.open(order.deliveryContent.value, '_blank')
                              } else {
                                navigator.clipboard.writeText(order.deliveryContent?.value || '')
                                alert(language === 'fr' ? 'Copie dans le presse-papiers !' : 'Copied to clipboard!')
                              }
                            }}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            {order.deliveryContent.type === 'download' 
                              ? t.dashboard.download 
                              : (language === 'fr' ? 'Copier' : 'Copy')
                            }
                          </Button>
                        )}

                        {order.status === 'pending' && (
                          <a
                            href={`https://wa.me/+224669288332?text=${encodeURIComponent(`Commande VARNOX ID: ${order.id} - ${product.name[language]} - $${product.price}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {t.orders.contactSupport}
                            </Button>
                          </a>
                        )}

                        <Link href={`/products/${product.id}`}>
                          <Button size="sm" variant="outline" className="border-border">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t.orders.noOrders}</h3>
                <p className="text-muted-foreground mb-4">
                  {language === 'fr'
                    ? 'Decouvrez nos produits et passez votre premiere commande !'
                    : 'Discover our products and place your first order!'}
                </p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {t.products.title}
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Info */}
        <Card className="glass border-border/50">
          <CardHeader>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              {language === 'fr' ? 'Mon Profil' : 'My Profile'}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">
                  {t.auth.name}
                </p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <p className="text-sm text-muted-foreground mb-1">
                  {t.auth.email}
                </p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            {/* Support Section */}
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">
                    {language === 'fr' ? 'Besoin d\'aide ?' : 'Need help?'}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === 'fr' 
                      ? 'Contactez notre support pour toute question concernant vos commandes.'
                      : 'Contact our support for any questions about your orders.'}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href="https://wa.me/+224669288332"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </Button>
                    </a>
                    <a
                      href="https://t.me/Varnox_Or_novark"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                        Telegram
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
