'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types/product'

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])
  
  return { products, loading, error }
}

export function useProduct(id: number): UseProductsReturn & { product: Product | null } {
  const { products, loading, error } = useProducts()
  const product = products.find(p => p.id === id) || null
  
  return { products, loading, error, product }
}