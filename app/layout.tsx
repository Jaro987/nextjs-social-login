import '@/app/ui/global.css';
import { inter, oranienbaum } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { TopNav } from './ui/top-nav';
import AuthContext from './AuthContext';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <html lang="en">
        <body className={`${inter.className} antialiased bg-[url('/hero-image.jpg')] bg-cover bg-center bg-fixed backdrop-brightness-75`}>
          <div className="flex flex-col items-center justify-between p-4 md:p-8">
            <TopNav />
            <p className={`${oranienbaum.className} text-[56px] md:text-[72px] font-bold text-white text-center w-[320px] md:w-full`}>A frame pool house</p>
          </div>
          {children}
        </body>
        <Toaster richColors closeButton />
      </html>
    </AuthContext>
  );
}
