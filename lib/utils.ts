import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(cents: number): string {
  return `NT$${(cents / 100).toLocaleString()}`
}

export function generateOrderId(): string {
  return `#${new Date().getFullYear()}${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
}
