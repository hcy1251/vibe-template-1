import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from '@/components/navigation';
import { CartProvider } from '@/lib/cart-context';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vibe - 探索您的感官世界",
  description: "精選頂級商品，為您帶來前所未有的體驗。私密配送，品質保證。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 font-sans`}
      >
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-gray-50 border-t border-gray-200 py-12">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p className="text-sm">&copy; 2024 Vibe. All rights reserved.</p>
              </div>
            </footer>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#ffffff',
                color: '#1d1d1f',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
