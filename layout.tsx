import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/hooks/use-auth';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'VATTAM - Local Services at Your Doorstep',
  description: 'Book trusted local service professionals for AC, CCTV, Plumbing, Electrician, and more across Tamil Nadu. Doorstep service with 30-day warranty.',
  keywords: 'home services, AC repair, CCTV installation, plumber, electrician, Tamil Nadu, Chennai, Coimbatore, Madurai',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#070707',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#070707] text-white antialiased overflow-x-hidden`}>
        <AuthProvider>
          <div className="min-h-screen relative">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
