import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 格式化價格：將分轉換為格式化的貨幣字符串
export function formatPrice(priceInCents: number): string {
  return `NT$${(priceInCents / 100).toLocaleString()}`
}

// 計算購物車總價
export function calculateCartTotal(items: Array<{ price_in_cents: number; quantity: number }>): number {
  return items.reduce((total, item) => total + (item.price_in_cents * item.quantity), 0)
}

// 生成訂單編號
export function generateOrderId(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substr(2, 9)
  return `#${timestamp.slice(-6)}${random.toUpperCase()}`
}

// 格式化日期
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
