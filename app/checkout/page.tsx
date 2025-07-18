'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { formatPrice, generateOrderId } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  MapPin, 
  CreditCard, 
  Shield, 
  Truck,
  Check,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    storeLocation: '',
    paymentMethod: 'cash' as 'cash' | 'card',
    agreeTerms: false
  })

  const shippingCost = 5000
  const freeShippingThreshold = 200000
  const totalWithShipping = state.total + (state.total >= freeShippingThreshold ? 0 : shippingCost)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.customerName || !formData.phone || !formData.email || !formData.storeLocation) {
      toast.error('請填寫所有必要資料')
      return
    }

    if (!formData.agreeTerms) {
      toast.error('請同意服務條款')
      return
    }

    setIsProcessing(true)
    
    try {
      // 模擬訂單處理
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const orderId = generateOrderId()
      
      // 清空購物車
      clearCart()
      
      // 跳轉到訂單確認頁
      router.push(`/order-confirmation?orderId=${orderId}`)
      
    } catch (error) {
      toast.error('訂單處理失敗，請稍後再試')
    } finally {
      setIsProcessing(false)
    }
  }

  // 如果購物車為空，重定向到購物車頁面
  if (state.items.length === 0) {
    router.push('/cart')
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">重新導向中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回購物車
          </Link>
          <h1 className="text-3xl font-bold">結帳</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white text-sm font-medium">
                <Check className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm text-gray-400">購物車</span>
            </div>
            <div className="w-8 h-0.5 bg-rose-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm text-white">填寫資料</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-gray-400">確認訂單</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">客戶資訊</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName" className="text-white">
                        姓名 <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={(e) => handleInputChange('customerName', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="請輸入您的姓名"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">
                        電話 <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-gray-800 border-gray-600 text-white"
                        placeholder="請輸入您的手機號碼"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="請輸入您的電子信箱"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-rose-400" />
                    配送方式
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-rose-500 rounded-md bg-rose-500/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-rose-400" />
                          <span className="text-white">7-11 門市取貨</span>
                          <Badge className="ml-2 bg-rose-500 text-white">推薦</Badge>
                        </div>
                        <span className="text-rose-400 font-medium">免運費</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="storeLocation" className="text-white">
                        選擇門市 <span className="text-red-400">*</span>
                      </Label>
                      <Select 
                        value={formData.storeLocation} 
                        onValueChange={(value) => handleInputChange('storeLocation', value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="請選擇取貨門市" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="store1">台北市中正區 - 台北車站門市</SelectItem>
                          <SelectItem value="store2">台北市信義區 - 信義威秀門市</SelectItem>
                          <SelectItem value="store3">台北市大安區 - 忠孝敦化門市</SelectItem>
                          <SelectItem value="store4">台北市士林區 - 士林夜市門市</SelectItem>
                          <SelectItem value="store5">新北市板橋區 - 板橋車站門市</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-rose-400" />
                    付款方式
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={(value) => handleInputChange('paymentMethod', value)}
                  >
                    <div className="flex items-center space-x-2 p-3 border border-gray-600 rounded-md">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="text-white cursor-pointer flex-1">
                        貨到付款
                        <span className="block text-sm text-gray-400">取貨時以現金付款</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-gray-600 rounded-md">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="text-white cursor-pointer flex-1">
                        信用卡
                        <span className="block text-sm text-gray-400">支援 Visa、MasterCard、JCB</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Terms */}
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                      我已閱讀並同意 
                      <Link href="/terms" className="text-rose-400 hover:text-rose-300 underline">
                        服務條款
                      </Link> 
                      和 
                      <Link href="/privacy" className="text-rose-400 hover:text-rose-300 underline">
                        隱私政策
                      </Link>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900 border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white">訂單摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="text-sm text-white">{item.name}</p>
                          <p className="text-xs text-gray-400">數量: {item.quantity}</p>
                        </div>
                        <div className="text-sm text-white">
                          {formatPrice(item.subtotal)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-gray-700" />

                  {/* Totals */}
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
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">總計</span>
                    <span className="text-rose-400">{formatPrice(totalWithShipping)}</span>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 py-6 text-lg font-semibold"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>處理中...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>確認訂單</span>
                      </div>
                    )}
                  </Button>

                  <div className="text-center text-xs text-gray-400">
                    <p>您的個人資訊將受到完整保護</p>
                    <p>所有交易都經過 SSL 加密</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}