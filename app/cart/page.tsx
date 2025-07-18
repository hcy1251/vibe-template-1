'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: number) => {
    removeItem(id)
  }

  const handleClearCart = () => {
    clearCart()
  }

  const subtotal = state.total
  const shipping = 60 * 100 // 60 NT$ in cents
  const total = subtotal + shipping

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <ShoppingCart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">購物車是空的</h1>
              <p className="text-gray-400 mb-8">
                看起來您還沒有添加任何商品到購物車
              </p>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/products">
                  開始購物
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="mb-4 text-gray-400 hover:text-white"
          >
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              繼續購物
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-white">購物車</h1>
          <p className="text-gray-400 mt-2">
            您有 {state.items.length} 個商品在購物車中
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="relative w-full md:w-32 h-32 flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 128px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-white text-lg">
                          {item.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-red-400 font-bold text-lg">
                          {formatPrice(item.price_in_cents)}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-600 rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="text-white hover:bg-gray-800 h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 text-white font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="text-white hover:bg-gray-800 h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-gray-400 text-sm">
                        小計: {formatPrice(item.price_in_cents * item.quantity)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={handleClearCart}
                className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                清空購物車
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">訂單摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>商品總計</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>運費</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>總計</span>
                    <span className="text-red-400">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      ✓
                    </Badge>
                    <span>免費 7-11 取貨</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      ✓
                    </Badge>
                    <span>隱密包裝</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      ✓
                    </Badge>
                    <span>24小時內出貨</span>
                  </div>
                </div>

                <Button 
                  asChild 
                  className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
                  disabled={isLoading}
                >
                  <Link href="/checkout">
                    {isLoading ? '處理中...' : '前往結帳'}
                  </Link>
                </Button>

                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-gray-600 text-white hover:bg-gray-800"
                >
                  <Link href="/products">
                    繼續購物
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}