'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Shield, 
  Truck, 
  Star, 
  Users, 
  Award,
  Lock,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-rose-900/20 to-black" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <Badge 
            variant="secondary" 
            className="mb-6 bg-rose-500/20 text-rose-300 border-rose-500/30"
          >
            關於我們
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-rose-200 to-purple-200 bg-clip-text text-transparent">
            致力於提供
            <span className="block">最優質的體驗</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            我們是一家專業的成人用品電商平台，致力於為成年消費者提供安全、私密、
            高品質的購物體驗。我們相信每個人都有追求幸福和滿足的權利。
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              我們的使命
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              打破禁忌，推廣健康的性教育，讓每個人都能安全、自信地探索自己的需求
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mb-6">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">用心服務</h3>
                <p className="text-gray-400">
                  我們以同理心對待每一位客戶，提供專業、貼心的服務
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">品質保證</h3>
                <p className="text-gray-400">
                  所有商品都經過嚴格篩選，確保安全、衛生、可靠
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700 text-center">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 mb-6">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">隱私保護</h3>
                <p className="text-gray-400">
                  完全保護客戶隱私，從購買到配送都採用最嚴格的保密措施
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              我們的價值觀
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">包容性</h3>
              <p className="text-gray-400 text-sm">
                歡迎所有成年人，不分性別、性向、年齡
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">專業性</h3>
              <p className="text-gray-400 text-sm">
                提供專業的產品知識和使用指導
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">安全性</h3>
              <p className="text-gray-400 text-sm">
                所有商品都符合安全標準，保障使用者健康
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">開放性</h3>
              <p className="text-gray-400 text-sm">
                推廣開放、健康的性觀念和知識
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              我們的服務
            </h2>
            <p className="text-gray-400 text-lg">
              從選購到使用，我們提供全方位的服務支援
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">私密配送</h3>
                    <p className="text-gray-400 text-sm">
                      使用不透明包裝，完全保護您的隱私。可選擇超商取貨或宅配服務，
                      讓您安心購物。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">專業諮詢</h3>
                    <p className="text-gray-400 text-sm">
                      提供產品使用指導和相關知識諮詢，幫助您做出最適合的選擇。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">品質保證</h3>
                    <p className="text-gray-400 text-sm">
                      7天品質保證，如有品質問題可免費退換。所有商品都經過嚴格檢驗。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <Star className="w-6 h-6 text-rose-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">會員優惠</h3>
                    <p className="text-gray-400 text-sm">
                      註冊會員享受專屬優惠、生日禮遇，以及優先體驗新品的機會。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-900/20 to-purple-900/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            還有疑問？
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            我們的客服團隊隨時為您服務，提供專業的建議和協助
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              聯絡客服
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/products">
                開始購物
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}