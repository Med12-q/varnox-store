'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bot, Sparkles, Zap, Shield, MessageSquare, Brain, Wrench } from 'lucide-react'

export function HeroSection() {
  const { language, t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,50,50,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(50,130,255,0.08),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 rounded-xl glass border border-primary/20 flex items-center justify-center animate-float opacity-50 hidden lg:flex">
        <MessageSquare className="w-8 h-8 text-green-500" />
      </div>
      <div className="absolute top-1/3 right-16 w-14 h-14 rounded-xl glass border border-accent/20 flex items-center justify-center animate-float opacity-50 hidden lg:flex" style={{ animationDelay: '1s' }}>
        <Bot className="w-7 h-7 text-blue-400" />
      </div>
      <div className="absolute bottom-1/3 left-20 w-12 h-12 rounded-xl glass border border-border/30 flex items-center justify-center animate-float opacity-40 hidden lg:flex" style={{ animationDelay: '2s' }}>
        <Brain className="w-6 h-6 text-purple-400" />
      </div>
      <div className="absolute bottom-1/4 right-24 w-14 h-14 rounded-xl glass border border-border/30 flex items-center justify-center animate-float opacity-40 hidden lg:flex" style={{ animationDelay: '0.5s' }}>
        <Shield className="w-7 h-7 text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80 font-medium">
              {language === 'fr' ? 'Outils d\'Automatisation Premium' : 'Premium Automation Tools'}
            </span>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
              <div className="relative w-28 h-28 rounded-2xl bg-card border border-primary/30 flex items-center justify-center shadow-2xl">
                <span className="text-6xl font-bold text-primary">V</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
            <span className="text-primary">{t.hero.title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 mb-4">{t.hero.subtitle}</p>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base group">
                {t.hero.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/assistant">
              <Button
                size="lg"
                variant="outline"
                className="border-accent/50 text-accent hover:bg-accent/10 px-8 h-12 text-base"
              >
                <Bot className="w-4 h-4 mr-2" />
                {t.hero.secondary}
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: MessageSquare, label: { fr: 'Bots WhatsApp', en: 'WhatsApp Bots' }, color: 'text-green-500' },
              { icon: Bot, label: { fr: 'Bots Telegram', en: 'Telegram Bots' }, color: 'text-blue-400' },
              { icon: Zap, label: { fr: 'Automatisation', en: 'Automation' }, color: 'text-yellow-400' },
              { icon: Shield, label: { fr: 'Securise & Rapide', en: 'Secure & Fast' }, color: 'text-primary' },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass rounded-xl p-4 border border-border/30 hover:border-primary/20 transition-all duration-300 group cursor-default"
              >
                <feature.icon className={`w-6 h-6 ${feature.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                <p className="text-sm text-muted-foreground">{feature.label[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}
