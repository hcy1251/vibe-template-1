'use client'

export const runtime = 'edge';

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useProduct } from '@/lib/use-products'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft, 
  Plus, 
  Minus,
  Star,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react'
import { toast } from 'sonner'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const { product, loading, error } = useProduct(productId)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsAddingToCart(true)
    try {
      addItem(product, quantity)
      toast.success(`已將 ${quantity} 個 ${product.name} 加入購物車`)
    } catch (error) {
      toast.error('加入購物車失敗，請稍後再試')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">載入商品資料中...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">商品不存在</h2>
          <p className="text-gray-400 mb-6">找不到該商品，可能已被移除或不存在</p>
          <Button asChild variant="outline" className="border-white/20 text-white">
            <Link href="/products">返回商品列表</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/products" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            返回商品列表
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.in_stock === false && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    缺貨中
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-400">(128 評價)</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-rose-400 mb-6">
                {formatPrice(product.price_in_cents)}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description || '這是一款精選的成人用品，採用優質材料製作，為您帶來舒適的使用體驗。我們承諾所有商品都經過嚴格的品質檢驗，確保安全可靠。'}
              </p>
            </div>

            <Separator className="bg-gray-700" />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">數量:</label>
                <div className="flex items-center border border-gray-700 rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0 hover:bg-gray-800"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="h-10 w-10 p-0 hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || product.in_stock === false}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 py-6 text-lg font-semibold"
                >
                  {isAddingToCart ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      加入中...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      加入購物車
                    </div>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">服務保障</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-rose-400" />
                  <span className="text-gray-300">品質保證 - 正品保障</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-rose-400" />
                  <span className="text-gray-300">私密配送 - 保護隱私</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-rose-400" />
                  <span className="text-gray-300">7天退換 - 品質問題免費退換</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">商品詳情</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-medium mb-2">產品特色</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>採用優質醫療級材料製作</li>
                    <li>人體工學設計，舒適貼合</li>
                    <li>多段式震動模式可調節</li>
                    <li>靜音設計，保護隱私</li>
                    <li>防水設計，易於清洗</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">使用說明</h4>
                  <p className="text-sm">
                    請在使用前充分清潔產品，建議搭配水性潤滑劑使用。
                    使用後請立即清洗並存放在乾燥通風處。
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">注意事項</h4>
                  <p className="text-sm">
                    僅供成人使用，未滿18歲請勿購買。
                    如有不適請立即停止使用。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}