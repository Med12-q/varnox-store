'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type User = {
  id: string
  name: string
  email: string
  purchases: string[]
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  addPurchase: (productId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('varnox-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - In production, this would call /api/auth/login
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const users = JSON.parse(localStorage.getItem('varnox-users') || '[]')
    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('varnox-user', JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call - In production, this would call /api/auth/register
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const users = JSON.parse(localStorage.getItem('varnox-users') || '[]')
    const exists = users.find((u: User) => u.email === email)
    
    if (exists) {
      return false
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      purchases: [],
    }
    
    users.push(newUser)
    localStorage.setItem('varnox-users', JSON.stringify(users))
    
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem('varnox-user', JSON.stringify(userWithoutPassword))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('varnox-user')
  }

  const addPurchase = (productId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        purchases: [...user.purchases, productId],
      }
      setUser(updatedUser)
      localStorage.setItem('varnox-user', JSON.stringify(updatedUser))
      
      // Update in users list
      const users = JSON.parse(localStorage.getItem('varnox-users') || '[]')
      const userIndex = users.findIndex((u: User) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex].purchases = updatedUser.purchases
        localStorage.setItem('varnox-users', JSON.stringify(users))
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, addPurchase }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
