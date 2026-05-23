'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { getPopularProducts, products } from '@/lib/products'
import { HeroSection } from '@/components/hero-section'
import { ProductCard } from '@/components/product-card'
import { TestimonialsCarousel } from '@/components/testimonials-carousel'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bot, Shield, Zap, Clock, Headphones, RefreshCw, CheckCircle2, Users, Package, Star } from 'lucide-react'

export default function HomePage() {
  const { language, t } = useLanguage()
  const popularProducts = getPopularProducts().slice(0, 6)

  const stats = [
    { value: '500+', label: { fr: 'Clients satisfaits', en: 'Happy customers' }, icon: Users },
    { value: '50+', label: { fr: 'Scripts disponibles', en: 'Scripts available' }, icon: Package },
    { value: '99%', label: { fr: 'Satisfaction', en: 'Satisfaction rate' }, icon: Star },
    { value: '24/7', label: { fr: 'Support actif', en: 'Active support' }, icon: Headphones },
  ]

  const features = [
    {
      icon: Shield,
      title: { fr: 'Securise', en: 'Secure' },
      description: {
        fr: 'Tous nos scripts sont testes et securises pour votre tranquillite d\'esprit.',
        en: 'All our scripts are tested and secured for your peace of mind.',
      },
    },
    {
      icon: Zap,
      title: { fr: 'Rapide', en: 'Fast' },
      description: {
        fr: 'Performance optimisee pour une execution ultra-rapide.',
        en: 'Optimized performance for ultra-fast execution.',
      },
    },
    {
      icon: Headphones,
      title: { fr: 'Support 24/7', en: '24/7 Support' },
      description: {
        fr: 'Notre equipe est disponible 24h/24 pour vous assister.',
        en: 'Our team is available 24/7 to assist you.',
      },
    },
    {
      icon: RefreshCw,
      title: { fr: 'Mises a jour', en: 'Updates' },
      description: {
        fr: 'Mises a jour regulieres et gratuites pour tous nos produits.',
        en: 'Regular and free updates for all our products.',
      },
    },
    {
      icon: Clock,
      title: { fr: 'Livraison Instantanee', en: 'Instant Delivery' },
      description: {
        fr: 'Acces immediat apres achat, sans delai d\'attente.',
        en: 'Immediate access after purchase, no waiting time.',
      },
    },
    {
      icon: Bot,
      title: { fr: 'Assistant IA', en: 'AI Assistant' },
      description: {
        fr: 'Un assistant intelligent pour repondre a toutes vos questions.',
        en: 'An intelligent assistant to answer all your questions.',
      },
    },
  ]

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Stats Section */}
      <section className="py-12 relative border-y border-border/30">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label[language]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {language === 'fr' ? 'Populaires' : 'Popular'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.products.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.products.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 group">
                {language === 'fr' ? 'Voir tous les produits' : 'View all products'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              {language === 'fr' ? 'Avantages' : 'Benefits'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'fr' ? 'Pourquoi VARNOX STORE ?' : 'Why VARNOX STORE?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title[language]}</h3>
                <p className="text-sm text-muted-foreground">{feature.description[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* AI Assistant CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6 neon-border-blue animate-float">
              <Bot className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.assistant.title}</h2>
            <p className="text-muted-foreground mb-8">{t.assistant.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assistant">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Bot className="w-4 h-4 mr-2" />
                  {t.hero.secondary}
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {language === 'fr' ? 'Reponses instantanees' : 'Instant answers'}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {language === 'fr' ? 'Support vocal' : 'Voice support'}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {language === 'fr' ? 'Disponible 24/7' : 'Available 24/7'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
