'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Truck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductCard } from '@/components/product-card'
import { Product } from '@/lib/types'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const products: Product[] = await response.json()
        // Get first 4 products for featured section
        setFeaturedProducts(products.slice(0, 4))
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  const categories = [
    {
      title: '經典系列',
      description: '精選經典款式，品質保證',
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&auto=format&fit=crop',
      href: '/products?category=經典'
    },
    {
      title: '智能系列',
      description: '最新科技，智能體驗',
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=300&auto=format&fit=crop',
      href: '/products?category=智能'
    },
    {
      title: '高端系列',
      description: '頂級品質，尊貴享受',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&auto=format&fit=crop',
      href: '/products?category=精品'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1080&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            私密空間
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            專業成人用品電商平台・品質保證・隱私保護
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
            >
              <Link href="/products">
                立即選購
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
            >
              <Link href="/about">
                了解更多
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              精選商品
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              嚴選優質商品，為您提供最佳體驗
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <Link href="/products">
                查看全部商品
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              商品分類
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              多樣化產品選擇，滿足不同需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="group overflow-hidden bg-gray-900 border-gray-800 hover:border-red-600 transition-all duration-300">
                  <div 
                    className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <CardHeader>
                    <CardTitle className="text-white">{category.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              為什麼選擇我們
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              專業服務・品質保證・隱私保護
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-gray-800 border-gray-700">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-white">隱私保護</CardTitle>
                <CardDescription className="text-gray-400">
                  嚴格保護客戶隱私，包裝隱密，絕對保密
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center bg-gray-800 border-gray-700">
              <CardHeader>
                <Truck className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-white">快速配送</CardTitle>
                <CardDescription className="text-gray-400">
                  24小時內出貨，7-11取貨，快速又便利
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center bg-gray-800 border-gray-700">
              <CardHeader>
                <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-white">專業服務</CardTitle>
                <CardDescription className="text-gray-400">
                  專業團隊，提供最佳購物體驗與售後服務
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">私密空間</h3>
              <p className="text-gray-400 text-sm">
                專業成人用品電商平台<br />
                品質保證・隱私保護
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">商品分類</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/products" className="hover:text-white">所有商品</Link></li>
                <li><Link href="/products?category=經典" className="hover:text-white">經典系列</Link></li>
                <li><Link href="/products?category=智能" className="hover:text-white">智能系列</Link></li>
                <li><Link href="/products?category=精品" className="hover:text-white">高端系列</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">客戶服務</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white">關於我們</Link></li>
                <li><Link href="/contact" className="hover:text-white">聯絡我們</Link></li>
                <li><Link href="/privacy" className="hover:text-white">隱私政策</Link></li>
                <li><Link href="/terms" className="hover:text-white">使用條款</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">聯絡資訊</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>客服時間：週一至週五 9:00-18:00</li>
                <li>Email: service@example.com</li>
                <li>電話: 0800-123-456</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 私密空間. 版權所有.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
