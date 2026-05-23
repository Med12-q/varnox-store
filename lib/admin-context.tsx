'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

const ADMIN_PASSWORD = 'varnoxStore224varnox'

type AdminContextType = {
  isAdmin: boolean
  isAdminLoading: boolean
  loginAdmin: (password: string) => boolean
  logoutAdmin: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(true)

  useEffect(() => {
    const adminSession = localStorage.getItem('varnox-admin-session')
    if (adminSession === 'active') {
      setIsAdmin(true)
    }
    setIsAdminLoading(false)
  }, [])

  const loginAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      localStorage.setItem('varnox-admin-session', 'active')
      return true
    }
    return false
  }

  const logoutAdmin = () => {
    setIsAdmin(false)
    localStorage.removeItem('varnox-admin-session')
  }

  return (
    <AdminContext.Provider value={{ isAdmin, isAdminLoading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
