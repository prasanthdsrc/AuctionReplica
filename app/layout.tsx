import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'First State Auctions - Fine Jewellery, Swiss Watches & Designer Bags',
  description: 'Australia\'s premier online auction house for fine jewellery, Swiss watches, and designer bags. Authenticity fully guaranteed.',
  keywords: 'auctions, jewellery, watches, designer bags, luxury, online auctions, Australia',
  openGraph: {
    title: 'First State Auctions',
    description: 'Australia\'s premier online auction house for fine jewellery, Swiss watches, and designer bags.',
    type: 'website',
    locale: 'en_AU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
