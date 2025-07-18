'use client'

import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  Heart,
  Package
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function CartPage() {
  const { state, updateQuantity, removeItem } = useCart()
  const shippingCost = 5000 // $50 shipping
  const freeShippingThreshold = 200000 // $2000 for free shipping
  const totalWithShipping = state.total + (state.total >= freeShippingThreshold ? 0 : shippingCost)

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      toast.success('已從購物車移除商品')
    } else if (newQuantity <= 10) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: number, productName: string) => {
    removeItem(productId)
    toast.success(`已從購物車移除 ${productName}`)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-900 mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">購物車是空的</h2>
            <p className="text-gray-400 mb-8">
              還沒有添加任何商品到購物車，快去挑選您喜歡的商品吧！
            </p>
            <Button 
              asChild 
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0"
            >
              <Link href="/products">
                開始購物
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">購物車</h1>
          <p className="text-gray-400">
            您的購物車中有 {state.itemCount} 件商品
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white hover:text-rose-300 transition-colors">
                          <Link href={`/products/${item.id}`}>
                            {item.name}
                          </Link>
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-rose-400 font-semibold">
                          {formatPrice(item.price_in_cents)}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-700 rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0 hover:bg-gray-800"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-3 py-1 text-center min-w-[2rem]">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="h-8 w-8 p-0 hover:bg-gray-800"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-sm text-gray-400">小計: </span>
                        <span className="font-semibold text-white">
                          {formatPrice(item.subtotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="pt-4">
              <Button 
                variant="outline" 
                asChild
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                <Link href="/products">
                  繼續購物
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-700 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">訂單摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">商品金額</span>
                    <span className="text-white">{formatPrice(state.total)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">運費</span>
                    <span className="text-white">
                      {state.total >= freeShippingThreshold ? (
                        <span className="text-green-400">免費</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  
                  {state.total < freeShippingThreshold && (
                    <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-md">
                      <p className="text-sm text-blue-300">
                        再購買 {formatPrice(freeShippingThreshold - state.total)} 即可享免費運送
                      </p>
                    </div>
                  )}
                </div>

                <Separator className="bg-gray-700" />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">總計</span>
                  <span className="text-rose-400">{formatPrice(totalWithShipping)}</span>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 py-6 text-lg font-semibold"
                  asChild
                >
                  <Link href="/checkout">
                    前往結帳
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Package className="w-4 h-4" />
                    <span>私密包裝配送</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Heart className="w-4 h-4" />
                    <span>7天品質保證</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}