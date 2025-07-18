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
  Search,
  Sparkles 
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
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-rose-500" />
          <span className="font-bold text-xl text-white">Vibe</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors duration-200 hover:text-rose-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Heart className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link href="/cart">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {state.itemCount > 0 && (
                <Badge 
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-rose-500"
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
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <User className="h-5 w-5" />
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden text-white/80 hover:text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-white/10">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 text-lg"
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