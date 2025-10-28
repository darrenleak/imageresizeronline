import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image Resizer Online - Free Batch Image Resizer",
  description: "Resize, rotate, and convert images for free. Batch image processing in your browser - no uploads needed! Support for JPG, PNG, GIF, WebP, and TIFF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 min-h-screen">
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">IR</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Image Resizer
                </span>
              </Link>
              <div className="flex items-center space-x-8">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Resizer
                </Link>
                <Link 
                  href="/blog" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
