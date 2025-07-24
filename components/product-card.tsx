'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAddingToCart(true)
    try {
      addItem(product, 1)
      toast.success(`已將 ${product.name} 加入購物車`)
    } catch (error) {
      toast.error('加入購物車失敗，請稍後再試')
    } finally {
      setIsAddingToCart(false)
    }
  }

  const cardSize = variant === 'featured' ? 'h-80' : 'h-72'
  const imageSize = variant === 'featured' ? 'h-48' : 'h-40'

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-gray-200 bg-white rounded-2xl ${cardSize}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          {/* Product Image */}
          <div className={`relative ${imageSize} overflow-hidden rounded-t-2xl`}>
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
            />
            
            {/* Stock badge */}
            {product.in_stock === false && (
              <Badge 
                variant="destructive" 
                className="absolute top-3 left-3 bg-red-500 text-white font-medium"
              >
                缺貨
              </Badge>
            )}
            
            {/* Hover overlay with actions */}
            <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute top-3 right-3 flex flex-col space-y-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm rounded-full w-9 h-9 p-0 shadow-lg"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm rounded-full w-9 h-9 p-0 shadow-lg"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-6">
            <h3 className="font-medium text-gray-900 text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-blue-600 font-semibold text-lg">
              {formatPrice(product.price_in_cents)}
            </p>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.in_stock === false}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium py-3 transition-all duration-200 shadow-md hover:shadow-lg"
          size="sm"
        >
          {isAddingToCart ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>加入中...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>加入購物車</span>
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}