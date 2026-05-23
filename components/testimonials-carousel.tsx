'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const testimonials = [
  {
    id: 1,
    name: 'Mamadou D.',
    location: 'Conakry, Guinee',
    avatar: 'MD',
    rating: 5,
    text: {
      fr: 'Le bot WhatsApp a revolutionne ma gestion client. Support excellent et livraison rapide!',
      en: 'The WhatsApp bot revolutionized my client management. Excellent support and fast delivery!'
    },
    product: 'WhatsApp Bot Pro'
  },
  {
    id: 2,
    name: 'Fatou S.',
    location: 'Dakar, Senegal',
    avatar: 'FS',
    rating: 5,
    text: {
      fr: 'Scripts de qualite professionnelle. Mon business a triple en 2 mois grace au bot Telegram.',
      en: 'Professional quality scripts. My business tripled in 2 months thanks to the Telegram bot.'
    },
    product: 'Telegram Shop Bot'
  },
  {
    id: 3,
    name: 'Ibrahim K.',
    location: 'Abidjan, Cote d\'Ivoire',
    avatar: 'IK',
    rating: 5,
    text: {
      fr: 'Le numero virtuel fonctionne parfaitement. Service client reactif et professionnel.',
      en: 'The virtual number works perfectly. Responsive and professional customer service.'
    },
    product: 'Virtual Number Premium'
  },
  {
    id: 4,
    name: 'Aissatou B.',
    location: 'Bamako, Mali',
    avatar: 'AB',
    rating: 5,
    text: {
      fr: 'Excellente experience! Le Mass Sender m\'a fait gagner des heures de travail.',
      en: 'Excellent experience! The Mass Sender saved me hours of work.'
    },
    product: 'Mass Sender Pro'
  },
  {
    id: 5,
    name: 'Oumar T.',
    location: 'Lome, Togo',
    avatar: 'OT',
    rating: 5,
    text: {
      fr: 'Tres satisfait du bot IA. Les reponses automatiques sont impressionnantes.',
      en: 'Very satisfied with the AI bot. The automatic responses are impressive.'
    },
    product: 'AI Chatbot Script'
  }
]

export function TestimonialsCarousel() {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goTo = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((currentIndex + 1) % testimonials.length)

  const current = testimonials[currentIndex]

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {language === 'fr' ? 'Ce que disent nos clients' : 'What our clients say'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'fr' ? 'Plus de 500+ clients satisfaits' : '500+ satisfied customers'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 sm:p-10">
            {/* Quote icon */}
            <div className="absolute -top-4 left-8 w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Quote className="w-5 h-5 text-primary" />
            </div>

            {/* Content */}
            <div className="pt-4">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-lg sm:text-xl text-foreground/90 mb-6 leading-relaxed">
                &ldquo;{current.text[language as 'fr' | 'en']}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-foreground font-bold">
                    {current.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{current.name}</p>
                    <p className="text-sm text-muted-foreground">{current.location}</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xs text-muted-foreground bg-primary/10 px-3 py-1 rounded-full">
                    {current.product}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex 
                    ? 'w-6 bg-primary' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
