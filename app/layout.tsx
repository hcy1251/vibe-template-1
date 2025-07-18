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
  description: "精選頂級成人用品，為您帶來前所未有的感官體驗。私密配送，品質保證。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-gray-900 border-t border-white/10 py-8">
              <div className="container mx-auto px-4 text-center text-gray-400">
                <p>&copy; 2024 Vibe. All rights reserved. 成人用品專門店</p>
              </div>
            </footer>
          </div>
          <Toaster 
            theme="dark" 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
