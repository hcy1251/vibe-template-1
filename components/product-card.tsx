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
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/20 border-white/10 bg-gradient-to-br from-gray-900 to-black ${cardSize}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          {/* Product Image */}
          <div className={`relative ${imageSize} overflow-hidden`}>
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Stock badge */}
            {product.in_stock === false && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2 bg-red-500/90 text-white"
              >
                缺貨
              </Badge>
            )}
            
            {/* Hover overlay with actions */}
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-medium text-white text-sm mb-2 line-clamp-2 group-hover:text-rose-300 transition-colors">
              {product.name}
            </h3>
            <p className="text-rose-400 font-bold text-lg">
              {formatPrice(product.price_in_cents)}
            </p>
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.in_stock === false}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25"
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