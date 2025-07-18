'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/lib/cart-context'
import { formatPrice, generateOrderId } from '@/lib/utils'
import { ShippingInfo } from '@/lib/types'

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    phone: '',
    email: '',
    storeLocation: ''
  })
  const [storeSearchQuery, setStoreSearchQuery] = useState('')

  // Mock 7-11 stores for selection
  const mockStores = [
    { id: '001', name: '信義門市', address: '台北市信義區信義路四段123號' },
    { id: '002', name: '敦化門市', address: '台北市大安區敦化南路二段456號' },
    { id: '003', name: '忠孝門市', address: '台北市大安區忠孝東路四段789號' },
    { id: '004', name: '松山門市', address: '台北市松山區八德路三段101號' },
    { id: '005', name: '中山門市', address: '台北市中山區中山北路二段202號' },
  ]

  const filteredStores = mockStores.filter(store =>
    store.name.toLowerCase().includes(storeSearchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(storeSearchQuery.toLowerCase())
  )

  const subtotal = state.total
  const shipping = 60 * 100 // 60 NT$ in cents
  const total = subtotal + shipping

  const handleInputChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleStoreSelect = (store: typeof mockStores[0]) => {
    setShippingInfo(prev => ({
      ...prev,
      storeLocation: `${store.name} - ${store.address}`
    }))
    setStoreSearchQuery('')
    if (errors.storeLocation) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.storeLocation
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!shippingInfo.name.trim()) {
      newErrors.name = '請輸入姓名'
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = '請輸入電話號碼'
    } else if (!/^[0-9]{9,10}$/.test(shippingInfo.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = '請輸入正確的電話號碼'
    }

    if (!shippingInfo.email.trim()) {
      newErrors.email = '請輸入電子信箱'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      newErrors.email = '請輸入正確的電子信箱格式'
    }

    if (!shippingInfo.storeLocation.trim()) {
      newErrors.storeLocation = '請選擇 7-11 取貨門市'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate order ID
      const orderId = generateOrderId()
      
      // Clear cart
      clearCart()
      
      // Redirect to confirmation page
      router.push(`/order-confirmation?orderId=${orderId}`)
    } catch (error) {
      console.error('Order submission failed:', error)
      alert('訂單提交失敗，請重試')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-white mb-4">購物車是空的</h1>
            <p className="text-gray-400 mb-8">無法進行結帳</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/products">開始購物</Link>
            </Button>
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
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回購物車
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">結帳</h1>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="ml-2 text-green-400 font-medium">1. 購物車</span>
              </div>
              <div className="w-8 h-0.5 bg-red-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <span className="ml-2 text-white font-medium">2. 填寫資料</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 font-bold">3</span>
                </div>
                <span className="ml-2 text-gray-400 font-medium">3. 確認訂單</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">客戶資訊</CardTitle>
                <CardDescription className="text-gray-400">
                  請填寫您的聯絡資訊
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        姓名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="請輸入您的姓名"
                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                          errors.name ? 'border-red-500' : 'focus:border-blue-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        電話號碼 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="請輸入您的電話號碼"
                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                          errors.phone ? 'border-red-500' : 'focus:border-blue-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      電子信箱 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="請輸入您的電子信箱"
                      className={`bg-gray-800 border-gray-700 text-white placeholder-gray-500 ${
                        errors.email ? 'border-red-500' : 'focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* Store Selection */}
                  <div className="space-y-4">
                    <Label className="text-white">
                      7-11 取貨門市 <span className="text-red-500">*</span>
                    </Label>
                    
                    {shippingInfo.storeLocation ? (
                      <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-green-400" />
                            <span className="text-white">{shippingInfo.storeLocation}</span>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShippingInfo(prev => ({ ...prev, storeLocation: '' }))}
                            className="border-gray-600 text-gray-400 hover:bg-gray-700"
                          >
                            重新選擇
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                          <Input
                            value={storeSearchQuery}
                            onChange={(e) => setStoreSearchQuery(e.target.value)}
                            placeholder="搜尋門市名稱或地址"
                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          />
                        </div>
                        
                        <div className="max-h-48 overflow-y-auto space-y-1">
                          {filteredStores.map((store) => (
                            <div
                              key={store.id}
                              onClick={() => handleStoreSelect(store)}
                              className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                            >
                              <div className="font-medium text-white">{store.name}</div>
                              <div className="text-sm text-gray-400">{store.address}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {errors.storeLocation && (
                      <p className="text-red-500 text-sm">{errors.storeLocation}</p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">訂單摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-white">
                        {formatPrice(item.price_in_cents * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-gray-700" />

                {/* Totals */}
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

                {/* Features */}
                <div className="space-y-2 text-sm text-gray-400">
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
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      ✓
                    </Badge>
                    <span>7-11 取貨付款</span>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '處理中...' : '確認訂單'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}