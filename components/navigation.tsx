'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  Menu, 
  ShoppingCart, 
  Heart, 
  User, 
  Search
} from 'lucide-react'

export function Navigation() {
  const { state } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: '/', label: '首頁' },
    { href: '/products', label: '所有商品' },
    { href: '/about', label: '關於我們' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span className="font-semibold text-xl text-gray-900">Vibe</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full w-9 h-9 p-0"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Wishlist */}
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full w-9 h-9 p-0"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Cart */}
          <Link href="/cart">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full w-9 h-9 p-0 relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {state.itemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600 text-white border-2 border-white"
                >
                  {state.itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User */}
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full w-9 h-9 p-0"
          >
            <User className="h-4 w-4" />
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full w-9 h-9 p-0"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-gray-200">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}