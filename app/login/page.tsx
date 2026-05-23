'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, LogIn, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      router.push('/dashboard')
    } else {
      setError(
        t.language === 'fr'
          ? 'Email ou mot de passe incorrect'
          : 'Invalid email or password'
      )
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-16 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md" />
              <span className="relative text-3xl font-bold text-primary text-glow">V</span>
            </div>
          </Link>
        </div>

        <Card className="glass border-border/50">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">{t.auth.login}</h1>
            <p className="text-sm text-muted-foreground">
              {t.language === 'fr'
                ? 'Connectez-vous à votre compte VARNOX STORE'
                : 'Sign in to your VARNOX STORE account'}
            </p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t.auth.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="pl-10 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.auth.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="pl-10 bg-input border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="text-right">
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  {t.auth.forgotPassword}
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {t.common.loading}
                  </span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    {t.auth.login}
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                {t.auth.noAccount}{' '}
                <Link href="/register" className="text-primary hover:underline">
                  {t.auth.createAccount}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
