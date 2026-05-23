'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { useAdmin } from '@/lib/admin-context'
import { useOrders, type Order, type OrderStatus } from '@/lib/orders-context'
import { products, getProductById, type Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Shield,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Loader2,
  Truck,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  BarChart3,
  Settings,
  AlertCircle,
  Send,
  Link as LinkIcon,
  Key,
  FileText,
} from 'lucide-react'

const statusConfig = {
  pending: { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'En attente' },
  processing: { icon: Loader2, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'En cours' },
  paid: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10', label: 'Paye' },
  delivered: { icon: Truck, color: 'text-primary', bg: 'bg-primary/10', label: 'Livre' },
}

type Tab = 'overview' | 'orders' | 'products' | 'settings'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const { isAuthenticated, logout } = useAdmin()
  const { orders, updateOrderStatus, deliverOrder } = useOrders()
  
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [deliveryType, setDeliveryType] = useState<'download' | 'license' | 'content'>('download')
  const [deliveryValue, setDeliveryValue] = useState('')
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  // Calculate stats
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const paidOrders = orders.filter((o) => o.status === 'paid' || o.status === 'delivered').length
  const totalRevenue = orders
    .filter((o) => o.status === 'paid' || o.status === 'delivered')
    .reduce((acc, o) => {
      const product = getProductById(o.productId)
      return acc + (product?.price || 0)
    }, 0)

  const filteredOrders = orders.filter((order) => {
    const product = getProductById(order.productId)
    const searchLower = searchQuery.toLowerCase()
    return (
      order.id.toLowerCase().includes(searchLower) ||
      product?.name.fr.toLowerCase().includes(searchLower) ||
      product?.name.en.toLowerCase().includes(searchLower) ||
      order.customerName?.toLowerCase().includes(searchLower)
    )
  })

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status)
  }

  const handleDeliver = () => {
    if (selectedOrder && deliveryValue) {
      deliverOrder(selectedOrder.id, deliveryType, deliveryValue)
      setIsDeliveryModalOpen(false)
      setSelectedOrder(null)
      setDeliveryValue('')
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/admin')
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'fr' ? 'Panel Administrateur' : 'Admin Panel'}
              </h1>
              <p className="text-sm text-muted-foreground">VARNOX STORE</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {language === 'fr' ? 'Deconnexion' : 'Logout'}
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', icon: BarChart3, label: language === 'fr' ? 'Apercu' : 'Overview' },
            { id: 'orders', icon: ShoppingCart, label: language === 'fr' ? 'Commandes' : 'Orders' },
            { id: 'products', icon: Package, label: language === 'fr' ? 'Produits' : 'Products' },
            { id: 'settings', icon: Settings, label: language === 'fr' ? 'Parametres' : 'Settings' },
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              className={activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'border-border'}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass border-border/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{totalOrders}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'fr' ? 'Total Commandes' : 'Total Orders'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{pendingOrders}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'fr' ? 'En Attente' : 'Pending'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{paidOrders}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'fr' ? 'Payes' : 'Paid'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">${totalRevenue}</p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'fr' ? 'Revenus' : 'Revenue'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="glass border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {language === 'fr' ? 'Commandes Recentes' : 'Recent Orders'}
                </h2>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveTab('orders')}
                >
                  {language === 'fr' ? 'Voir tout' : 'View all'}
                </Button>
              </CardHeader>
              <CardContent>
                {orders.slice(0, 5).map((order) => {
                  const product = getProductById(order.productId)
                  const status = statusConfig[order.status]
                  const StatusIcon = status.icon

                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="font-mono text-sm text-primary">{order.id}</div>
                        <div className="text-sm">{product?.name[language]}</div>
                      </div>
                      <div className={`flex items-center gap-2 ${status.color}`}>
                        <StatusIcon className={`w-4 h-4 ${order.status === 'processing' ? 'animate-spin' : ''}`} />
                        <span className="text-sm">{status.label}</span>
                      </div>
                    </div>
                  )
                })}
                {orders.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    {language === 'fr' ? 'Aucune commande' : 'No orders yet'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={language === 'fr' ? 'Rechercher par ID, produit, client...' : 'Search by ID, product, customer...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>

            {/* Orders List */}
            <Card className="glass border-border/50">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          {language === 'fr' ? 'Produit' : 'Product'}
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          {language === 'fr' ? 'Client' : 'Customer'}
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          {language === 'fr' ? 'Prix' : 'Price'}
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          {language === 'fr' ? 'Statut' : 'Status'}
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          {language === 'fr' ? 'Actions' : 'Actions'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => {
                        const product = getProductById(order.productId)
                        const status = statusConfig[order.status]

                        return (
                          <tr key={order.id} className="border-b border-border/50 last:border-0">
                            <td className="p-4">
                              <span className="font-mono text-primary">{order.id}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                {product && (
                                  <div className="relative w-10 h-10 rounded overflow-hidden bg-muted">
                                    <Image
                                      src={product.image}
                                      alt={product.name[language]}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <span className="text-sm">{product?.name[language]}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="text-sm">{order.customerName || 'N/A'}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-semibold">${product?.price || 0}</span>
                            </td>
                            <td className="p-4">
                              <Select
                                value={order.status}
                                onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                              >
                                <SelectTrigger className={`w-36 ${status.bg} ${status.color} border-0`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">En attente</SelectItem>
                                  <SelectItem value="processing">En cours</SelectItem>
                                  <SelectItem value="paid">Paye</SelectItem>
                                  <SelectItem value="delivered">Livre</SelectItem>
                                </SelectContent>
                              </Select>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {order.status === 'paid' && (
                                  <Dialog open={isDeliveryModalOpen && selectedOrder?.id === order.id} onOpenChange={(open) => {
                                    setIsDeliveryModalOpen(open)
                                    if (open) setSelectedOrder(order)
                                  }}>
                                    <DialogTrigger asChild>
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                        <Send className="w-4 h-4 mr-1" />
                                        {language === 'fr' ? 'Livrer' : 'Deliver'}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-card border-border">
                                      <DialogHeader>
                                        <DialogTitle>
                                          {language === 'fr' ? 'Livrer la commande' : 'Deliver Order'}
                                        </DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4 mt-4">
                                        <div className="space-y-2">
                                          <Label>{language === 'fr' ? 'Type de livraison' : 'Delivery Type'}</Label>
                                          <Select value={deliveryType} onValueChange={(v) => setDeliveryType(v as typeof deliveryType)}>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="download">
                                                <div className="flex items-center gap-2">
                                                  <LinkIcon className="w-4 h-4" />
                                                  {language === 'fr' ? 'Lien de telechargement' : 'Download Link'}
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="license">
                                                <div className="flex items-center gap-2">
                                                  <Key className="w-4 h-4" />
                                                  {language === 'fr' ? 'Cle de licence' : 'License Key'}
                                                </div>
                                              </SelectItem>
                                              <SelectItem value="content">
                                                <div className="flex items-center gap-2">
                                                  <FileText className="w-4 h-4" />
                                                  {language === 'fr' ? 'Contenu/Script' : 'Content/Script'}
                                                </div>
                                              </SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>

                                        <div className="space-y-2">
                                          <Label>
                                            {deliveryType === 'download' && (language === 'fr' ? 'URL du fichier' : 'File URL')}
                                            {deliveryType === 'license' && (language === 'fr' ? 'Cle de licence' : 'License Key')}
                                            {deliveryType === 'content' && (language === 'fr' ? 'Contenu' : 'Content')}
                                          </Label>
                                          {deliveryType === 'content' ? (
                                            <Textarea
                                              value={deliveryValue}
                                              onChange={(e) => setDeliveryValue(e.target.value)}
                                              placeholder={language === 'fr' ? 'Collez le script ou contenu ici...' : 'Paste script or content here...'}
                                              className="min-h-[120px] bg-input border-border"
                                            />
                                          ) : (
                                            <Input
                                              value={deliveryValue}
                                              onChange={(e) => setDeliveryValue(e.target.value)}
                                              placeholder={
                                                deliveryType === 'download'
                                                  ? 'https://example.com/file.zip'
                                                  : 'XXXX-XXXX-XXXX-XXXX'
                                              }
                                              className="bg-input border-border"
                                            />
                                          )}
                                        </div>

                                        <Button
                                          onClick={handleDeliver}
                                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                                          disabled={!deliveryValue}
                                        >
                                          <Send className="w-4 h-4 mr-2" />
                                          {language === 'fr' ? 'Confirmer la livraison' : 'Confirm Delivery'}
                                        </Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}

                                <a
                                  href={`https://wa.me/+224669288332?text=${encodeURIComponent(`Admin VARNOX - Commande ${order.id}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button size="sm" variant="outline" className="border-green-500 text-green-500">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                  </Button>
                                </a>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {filteredOrders.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    {language === 'fr' ? 'Aucune commande trouvee' : 'No orders found'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {language === 'fr' ? 'Gestion des Produits' : 'Product Management'}
              </h2>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Ajouter' : 'Add'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="glass border-border/50 overflow-hidden">
                  <div className="relative h-40">
                    <Image
                      src={product.image}
                      alt={product.name[language]}
                      fill
                      className="object-cover"
                    />
                    {product.badge && (
                      <span className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-primary text-primary-foreground">
                        {product.badge[language]}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{product.name[language]}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description[language]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">${product.price}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-border">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-destructive text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card className="glass border-border/50">
              <CardHeader>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  {language === 'fr' ? 'Parametres' : 'Settings'}
                </h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-500 mb-1">
                        {language === 'fr' ? 'Mode Demo' : 'Demo Mode'}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {language === 'fr'
                          ? 'Les donnees sont stockees localement. Pour une utilisation en production, connectez une base de donnees.'
                          : 'Data is stored locally. For production use, connect a database.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">{language === 'fr' ? 'Informations de contact' : 'Contact Information'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                      <Label className="text-muted-foreground">WhatsApp</Label>
                      <p className="font-mono">+224 669 288 332</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                      <Label className="text-muted-foreground">Telegram</Label>
                      <p className="font-mono">@Varnox_Or_novark</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">{language === 'fr' ? 'Statistiques globales' : 'Global Statistics'}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-center">
                      <p className="text-2xl font-bold text-primary">{products.length}</p>
                      <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Produits' : 'Products'}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-center">
                      <p className="text-2xl font-bold text-primary">{orders.length}</p>
                      <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Commandes' : 'Orders'}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-center">
                      <p className="text-2xl font-bold text-green-500">${totalRevenue}</p>
                      <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Revenus' : 'Revenue'}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-center">
                      <p className="text-2xl font-bold text-accent">6</p>
                      <p className="text-sm text-muted-foreground">{language === 'fr' ? 'Categories' : 'Categories'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
