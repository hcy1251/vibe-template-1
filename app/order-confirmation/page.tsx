'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Home, Mail, Phone, MapPin, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState<string>('')

  useEffect(() => {
    const orderIdParam = searchParams.get('orderId')
    if (orderIdParam) {
      setOrderId(orderIdParam)
    } else {
      // Generate a fallback order ID if none provided
      setOrderId(`#2024${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon and Message */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-green-400 mx-auto" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              訂單已成功送出！
            </h1>
            <p className="text-gray-400 text-lg mb-2">
              感謝您的購買，我們將儘快為您處理訂單
            </p>
            <div className="text-xl font-semibold text-red-400">
              訂單編號: {orderId}
            </div>
          </div>

          {/* Order Details Card */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="h-5 w-5" />
                訂單詳情
              </CardTitle>
              <CardDescription className="text-gray-400">
                請妥善保存您的訂單編號以便查詢
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">訂單資訊</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">訂單編號:</span>
                      <span className="text-white font-mono">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">下單時間:</span>
                      <span className="text-white">
                        {new Date().toLocaleString('zh-TW', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">付款方式:</span>
                      <span className="text-white">7-11 取貨付款</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">配送資訊</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-white">7-11 取貨</div>
                        <div className="text-gray-400">預計 3-5 個工作天到達</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Next Steps */}
              <div>
                <h4 className="font-semibold text-white mb-3">接下來會發生什麼？</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">訂單確認</div>
                      <div className="text-gray-400 text-sm">
                        我們將在 1 小時內確認您的訂單並開始準備
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">商品出貨</div>
                      <div className="text-gray-400 text-sm">
                        24 小時內完成包裝並寄送至您指定的 7-11 門市
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">取貨通知</div>
                      <div className="text-gray-400 text-sm">
                        商品到達門市後，我們將發送簡訊通知您取貨
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">完成取貨</div>
                      <div className="text-gray-400 text-sm">
                        請攜帶身分證明文件至門市取貨並付款
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              {/* Important Notes */}
              <div>
                <h4 className="font-semibold text-white mb-3">重要提醒</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400 mt-0.5">
                      !
                    </Badge>
                    <span>商品將使用隱密包裝，確保您的隱私</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400 mt-0.5">
                      !
                    </Badge>
                    <span>取貨期限為 7 天，逾期商品將退回</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400 mt-0.5">
                      !
                    </Badge>
                    <span>如有任何問題，請致電客服: 0800-123-456</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">需要協助？</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-red-400" />
                  <div>
                    <div className="text-white font-medium">客服電話</div>
                    <div className="text-gray-400 text-sm">0800-123-456</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-red-400" />
                  <div>
                    <div className="text-white font-medium">客服信箱</div>
                    <div className="text-gray-400 text-sm">service@example.com</div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                客服時間：週一至週五 9:00-18:00
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                返回首頁
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              <Link href="/products">
                繼續購物
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}