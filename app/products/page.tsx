'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data: Product[] = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
      filterProducts(categoryParam)
    } else {
      setSelectedCategory('')
      setFilteredProducts(products)
    }
  }, [searchParams, products])

  const filterProducts = (category: string) => {
    if (category === '' || category === 'all') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter(product => 
        product.category.includes(category)
      )
      setFilteredProducts(filtered)
    }
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    filterProducts(category)
  }

  const categories = [
    { value: '', label: '全部商品' },
    { value: '按摩器', label: '按摩器' },
    { value: '套裝', label: '套裝' },
    { value: '入門', label: '入門' },
    { value: '精品', label: '精品' },
    { value: '智能', label: '智能' },
    { value: '便攜', label: '便攜' },
    { value: '情侶', label: '情侶' },
    { value: '專業', label: '專業' },
    { value: '經濟', label: '經濟' },
    { value: '限量', label: '限量' },
    { value: '護理', label: '護理' },
    { value: '進階', label: '進階' },
  ]

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            所有商品
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            精選優質商品，滿足您的所有需求
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => handleCategoryFilter(category.value)}
                className={`${
                  selectedCategory === category.value
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 flex items-center gap-2">
              <span className="text-gray-400">
                找到 {filteredProducts.length} 個商品
              </span>
              {selectedCategory && (
                <Badge variant="secondary" className="bg-red-600 text-white">
                  {categories.find(c => c.value === selectedCategory)?.label}
                </Badge>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  沒有找到符合條件的商品
                </div>
                <Button
                  onClick={() => handleCategoryFilter('')}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  查看所有商品
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}