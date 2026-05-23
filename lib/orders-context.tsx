'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type OrderStatus = 'pending' | 'processing' | 'paid' | 'delivered'

export type Order = {
  id: string
  productId: string
  productName: string
  productPrice: number
  userId: string
  userName: string
  userEmail: string
  status: OrderStatus
  createdAt: string
  updatedAt: string
  deliveryContent?: string
  downloadLink?: string
  licenseKey?: string
}

type OrdersContextType = {
  orders: Order[]
  userOrders: Order[]
  createOrder: (productId: string, productName: string, productPrice: number, userName?: string) => Order
  updateOrderStatus: (orderId: string, status: OrderStatus, deliveryData?: Partial<Order>) => void
  getOrderById: (orderId: string) => Order | undefined
  getAllOrders: () => Order[]
  deleteOrder: (orderId: string) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

function generateOrderId(): string {
  const num = Math.floor(10000 + Math.random() * 90000)
  return `VX-${num}`
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [userOrders, setUserOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedOrders = localStorage.getItem('varnox-orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  useEffect(() => {
    const currentUser = localStorage.getItem('varnox-user')
    if (currentUser) {
      const user = JSON.parse(currentUser)
      setUserOrders(orders.filter(order => order.userId === user.id))
    } else {
      setUserOrders([])
    }
  }, [orders])

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders)
    localStorage.setItem('varnox-orders', JSON.stringify(newOrders))
  }

  const createOrder = (productId: string, productName: string, productPrice: number, userName?: string): Order => {
    const currentUser = localStorage.getItem('varnox-user')
    const user = currentUser ? JSON.parse(currentUser) : null

    const newOrder: Order = {
      id: generateOrderId(),
      productId,
      productName,
      productPrice,
      userId: user?.id || 'guest-' + Date.now(),
      userName: userName || user?.name || 'Guest',
      userEmail: user?.email || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const newOrders = [newOrder, ...orders]
    saveOrders(newOrders)
    return newOrder
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus, deliveryData?: Partial<Order>) => {
    const newOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          updatedAt: new Date().toISOString(),
          ...deliveryData,
        }
      }
      return order
    })
    saveOrders(newOrders)
  }

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId)
  }

  const getAllOrders = (): Order[] => {
    return orders
  }

  const deleteOrder = (orderId: string) => {
    const newOrders = orders.filter(order => order.id !== orderId)
    saveOrders(newOrders)
  }

  return (
    <OrdersContext.Provider value={{
      orders,
      userOrders,
      createOrder,
      updateOrderStatus,
      getOrderById,
      getAllOrders,
      deleteOrder,
    }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}
