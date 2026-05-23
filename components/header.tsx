'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, X, User, LogOut, LayoutDashboard, Globe, Bot, Shield } from 'lucide-react'
import { useAdmin } from '@/lib/admin-context'

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()
  const { isAuthenticated: isAdmin } = useAdmin()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md group-hover:bg-primary/40 transition-colors" />
              <span className="relative text-2xl font-bold text-primary text-glow">V</span>
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-primary">VARNOX</span>
              <span className="text-foreground/80"> STORE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t.nav.products}
            </Link>
            <Link
              href="/assistant"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Bot className="w-4 h-4" />
              {t.nav.assistant}
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {t.nav.dashboard}
              </Link>
            )}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="gap-2 text-muted-foreground hover:text-primary"
            >
              <Globe className="w-4 h-4" />
              {language === 'fr' ? 'FR' : 'EN'}
            </Button>

            {/* Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 border-border hover:border-primary">
                    <User className="w-4 h-4" />
                    {user.name.split(' ')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glass">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      {t.nav.dashboard}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t.nav.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {t.nav.register}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/products"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.products}
              </Link>
              <Link
                href="/assistant"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bot className="w-4 h-4" />
                {t.nav.assistant}
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.dashboard}
                </Link>
              )}
              <div className="flex items-center gap-2 px-3 pt-3 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                  className="gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {language === 'fr' ? 'Français' : 'English'}
                </Button>
              </div>
              {!user && (
                <div className="flex items-center gap-2 px-3 pt-3">
                  <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      {t.nav.login}
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {t.nav.register}
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
