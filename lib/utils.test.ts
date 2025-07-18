import { formatPrice, generateOrderId } from './utils'

describe('Utils', () => {
  describe('formatPrice', () => {
    it('should format price correctly', () => {
      expect(formatPrice(100)).toBe('NT$1')
      expect(formatPrice(1000)).toBe('NT$10')
      expect(formatPrice(298000)).toBe('NT$2,980')
      expect(formatPrice(1298000)).toBe('NT$12,980')
    })
  })

  describe('generateOrderId', () => {
    it('should generate order ID with correct format', () => {
      const orderId = generateOrderId()
      expect(orderId).toMatch(/^#2024\d{6}$/)
    })

    it('should generate unique order IDs', () => {
      const id1 = generateOrderId()
      const id2 = generateOrderId()
      expect(id1).not.toBe(id2)
    })
  })
})