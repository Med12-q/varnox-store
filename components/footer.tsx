'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { Mail, MapPin, Phone, ExternalLink, Heart } from 'lucide-react'

export function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-card/50 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md animate-pulse-slow" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 rounded-xl" />
                <span className="relative text-2xl font-bold text-primary text-glow">V</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-primary">VARNOX</span>
                  <span className="text-foreground/80"> STORE</span>
                </span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Digital Solutions</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {language === 'fr' 
                ? 'Votre partenaire de confiance pour les solutions d\'automatisation WhatsApp, Telegram et IA.'
                : 'Your trusted partner for WhatsApp, Telegram and AI automation solutions.'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/+224669288332"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 flex items-center justify-center transition-all duration-300 group hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-5 h-5 text-[#25D366]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://t.me/Varnox_Or_novark"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0088cc]/10 hover:bg-[#0088cc]/20 flex items-center justify-center transition-all duration-300 group hover:scale-110"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5 text-[#0088cc]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-5 text-foreground flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full" />
              {language === 'fr' ? 'Navigation' : 'Navigation'}
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: t.nav.home },
                { href: '/products', label: t.nav.products },
                { href: '/assistant', label: t.nav.assistant },
                { href: '/dashboard', label: t.nav.dashboard },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-5 text-foreground flex items-center gap-2">
              <div className="w-1 h-4 bg-accent rounded-full" />
              {language === 'fr' ? 'Produits' : 'Products'}
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'WhatsApp Bots', href: '/products?category=whatsapp' },
                { label: 'Telegram Bots', href: '/products?category=telegram' },
                { label: language === 'fr' ? 'Numeros Virtuels' : 'Virtual Numbers', href: '/products?category=tools' },
                { label: language === 'fr' ? 'Scripts IA' : 'AI Scripts', href: '/products?category=ai' },
                { label: language === 'fr' ? 'Securite' : 'Security', href: '/products?category=security' },
              ].map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-5 text-foreground flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full" />
              {language === 'fr' ? 'Contact' : 'Contact'}
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://wa.me/+224669288332"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+224 669 288 332</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@varnoxstore.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>contact@varnoxstore.com</span>
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{language === 'fr' ? 'Conakry, Guinee' : 'Conakry, Guinea'}</span>
                </span>
              </li>
            </ul>

            {/* Legal Links */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <ul className="flex flex-wrap gap-4">
                <li>
                  <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    {t.footer.privacy}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Signature */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Main Signature */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                &copy;2026 <span className="text-primary font-bold">VARNOX STORE</span> powered by <span className="text-accent font-semibold">Varnox&bull;Prime</span>
              </p>
              <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
                {language === 'fr' ? 'Fait avec' : 'Made with'} <Heart className="w-3 h-3 text-primary fill-primary" /> {language === 'fr' ? 'en Guinee' : 'in Guinea'}
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:block">
                {language === 'fr' ? 'Contactez-nous:' : 'Contact us:'}
              </span>
              <a
                href="https://wa.me/+224669288332"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/10 hover:from-[#25D366]/30 hover:to-[#25D366]/20 flex items-center justify-center transition-all duration-300 group hover:scale-105 border border-[#25D366]/20 hover:border-[#25D366]/40"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://t.me/Varnox_Or_novark"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0088cc]/20 to-[#0088cc]/10 hover:from-[#0088cc]/30 hover:to-[#0088cc]/20 flex items-center justify-center transition-all duration-300 group hover:scale-105 border border-[#0088cc]/20 hover:border-[#0088cc]/40"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5 text-[#0088cc] group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
