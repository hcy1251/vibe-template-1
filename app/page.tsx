'use client'

import { useProducts } from '@/lib/use-products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Sparkles, Heart, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { products, loading, error } = useProducts()
  const featuredProducts = products.slice(0, 4)

  if (error) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">載入失敗</h2>
          <p className="text-gray-600">無法載入商品資料，請稍後再試</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Badge 
              variant="secondary" 
              className="mb-6 bg-blue-50 text-blue-600 border-blue-200 font-medium"
            >
              全新上線
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-gray-900 mb-8 leading-tight tracking-tight">
            探索您的
            <span className="block">感官世界</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            精選頂級商品，為您帶來前所未有的體驗。
            私密配送，品質保證。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/products">
                立即購買
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-200"
              asChild
            >
              <Link href="/about">
                了解更多
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              精選商品
            </h2>
            <p className="text-xl text-gray-600 font-light">
              為您精心挑選的熱門商品
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full bg-gray-200 rounded-2xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4 bg-gray-200" />
                    <Skeleton className="h-4 w-1/2 bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  variant="featured"
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-200"
              asChild
            >
              <Link href="/products">
                查看全部商品
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">品質保證</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                精選國際品牌，確保每一件商品都符合最高品質標準
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">私密配送</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                完全私密的包裝與配送服務，保護您的隱私
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">專業服務</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                專業的客服團隊，為您提供最貼心的購物體驗
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
