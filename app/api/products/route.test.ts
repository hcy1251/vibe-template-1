import { GET } from './route'
import { NextResponse } from 'next/server'

// Mock the file system
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}))

describe('/api/products', () => {
  it('should return products successfully', async () => {
    const mockProducts = [
      {
        id: 1,
        name: "Test Product",
        price_in_cents: 1000,
        image_url: "https://example.com/test.jpg"
      }
    ]

    // Mock fs.readFile
    const fs = require('fs')
    fs.promises.readFile.mockResolvedValue(JSON.stringify(mockProducts))

    const response = await GET()
    const data = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(data).toEqual(mockProducts)
  })

  it('should return error when file reading fails', async () => {
    // Mock fs.readFile to throw error
    const fs = require('fs')
    fs.promises.readFile.mockRejectedValue(new Error('File not found'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: 'Failed to load products' })
  })
})