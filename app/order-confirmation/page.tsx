'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle, 
  MapPin, 
  Mail, 
  Phone,
  Home,
  Download,
  Share2
} from 'lucide-react'
import Link from 'next/link'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || '#202412345'
  const orderDate = new Date()
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days later

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-6">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            訂單確認成功！
          </h1>
          <p className="text-gray-400 text-lg">
            感謝您的購買，我們已收到您的訂單並開始處理
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              {/* Order Info */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">訂單資訊</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">訂單編號</p>
                      <p className="text-white font-medium">{orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">訂單狀態</p>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        處理中
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">訂單時間</p>
                      <p className="text-white">{formatDate(orderDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">預計到貨</p>
                      <p className="text-white">{formatDate(estimatedDelivery)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-rose-400" />
                    配送資訊
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">配送方式</p>
                    <p className="text-white">7-11 門市取貨</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">取貨門市</p>
                    <p className="text-white">台北市中正區 - 台北車站門市</p>
                    <p className="text-sm text-gray-400">台北市中正區忠孝西路一段49號</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">收件人</p>
                    <p className="text-white">王小明</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">聯絡電話</p>
                    <p className="text-white">0912-345-678</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">付款資訊</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-sm text-gray-400">付款方式</p>
                    <p className="text-white">貨到付款</p>
                    <p className="text-sm text-gray-400 mt-1">
                      請於取貨時以現金付款
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">訂單摘要</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mock order items */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-sm text-white">經典白色運動鞋</p>
                        <p className="text-xs text-gray-400">數量: 1</p>
                      </div>
                      <div className="text-sm text-white">NT$2,980</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-sm text-white">極簡主義皮革錢包</p>
                        <p className="text-xs text-gray-400">數量: 1</p>
                      </div>
                      <div className="text-sm text-white">NT$1,580</div>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">商品金額</span>
                      <span className="text-white">NT$4,560</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">運費</span>
                      <span className="text-green-400">免費</span>
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">總計</span>
                    <span className="text-rose-400">NT$4,560</span>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">接下來的步驟</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white text-sm font-medium">
                        1
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">處理訂單</p>
                      <p className="text-sm text-gray-400">
                        我們正在準備您的商品，通常需要 1-2 個工作天
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
                        2
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">配送通知</p>
                      <p className="text-sm text-gray-400">
                        商品送達門市後，我們會發送簡訊通知您
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
                        3
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">取貨付款</p>
                      <p className="text-sm text-gray-400">
                        持身分證件到門市取貨並付款
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">需要協助？</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-rose-400" />
                    <div>
                      <p className="text-white">Email 客服</p>
                      <p className="text-sm text-gray-400">service@vibe.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-rose-400" />
                    <div>
                      <p className="text-white">客服專線</p>
                      <p className="text-sm text-gray-400">0800-123-456</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="outline" 
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              下載訂單明細
            </Button>
            
            <Button 
              variant="outline" 
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              <Share2 className="w-4 h-4 mr-2" />
              分享訂單
            </Button>
            
            <Button 
              asChild
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0"
            >
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                返回首頁
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">載入中...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}