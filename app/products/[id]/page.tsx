'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Plus, Minus, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/products')
        const products: Product[] = await response.json()
        const foundProduct = products.find(p => p.id === parseInt(params.id as string))
        
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          router.push('/products')
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
        router.push('/products')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, router])

  const handleAddToCart = () => {
    if (product && product.inStock) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
      // Reset quantity after adding
      setQuantity(1)
    }
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg aspect-square animate-pulse" />
            <div className="space-y-4">
              <div className="bg-gray-800 rounded h-8 animate-pulse" />
              <div className="bg-gray-800 rounded h-6 animate-pulse" />
              <div className="bg-gray-800 rounded h-4 animate-pulse" />
              <div className="bg-gray-800 rounded h-12 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl text-white mb-4">商品不存在</h1>
          <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
            <Link href="/products">返回商品列表</Link>
          </Button>
        </div>
      </div>
    )
  }

  const images = [
    product.image_url,
    product.image_url,
    product.image_url,
    product.image_url
  ]

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="text-gray-400 hover:text-white">首頁</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-600" />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products" className="text-gray-400 hover:text-white">所有商品</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-600" />
            <BreadcrumbItem>
              <span className="text-white">{product.name}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回上一頁
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-900">
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary" className="text-white text-lg">
                    缺貨
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-red-600'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - 圖片 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gray-400 text-lg">
                {product.description}
              </p>
            </div>

            {/* Price and Stock */}
            <div className="space-y-2">
              <div className="text-4xl font-bold text-red-400">
                {formatPrice(product.price_in_cents)}
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-gray-300 border-gray-600">
                  {product.category}
                </Badge>
                <div className="text-gray-400">
                  {product.inStock ? (
                    <span className="text-green-400">
                      庫存: {product.stock} 件
                    </span>
                  ) : (
                    <span className="text-red-400">缺貨</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">數量:</span>
                <div className="flex items-center border border-gray-600 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="text-white hover:bg-gray-800"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-white font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 1)}
                    className="text-white hover:bg-gray-800"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? '加入購物車' : '缺貨'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-gray-600 text-white hover:bg-gray-800"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 border-gray-600 text-white hover:bg-gray-800"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Description */}
            <Card className="bg-gray-900 border-gray-800">
              <Collapsible open={isDescriptionOpen} onOpenChange={setIsDescriptionOpen}>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-white">商品詳細說明</CardTitle>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      {isDescriptionOpen ? '收合' : '展開'}
                    </Button>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4 text-gray-300">
                      <div>
                        <h4 className="font-semibold text-white mb-2">產品特色</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>高品質材質，安全無毒</li>
                          <li>人體工學設計，舒適體驗</li>
                          <li>多種模式選擇，滿足不同需求</li>
                          <li>靜音設計，保護隱私</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">使用說明</h4>
                        <p className="text-sm">
                          請在使用前詳細閱讀說明書，確保正確使用。建議搭配專用清潔劑使用，
                          使用後請妥善清潔並存放於乾燥處。
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">注意事項</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>僅限成人使用</li>
                          <li>使用前請清潔雙手</li>
                          <li>如有不適請立即停止使用</li>
                          <li>請勿與他人共用</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}