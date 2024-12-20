import '@/app/ui/global.css';
import { inter, oranienbaum } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { TopNav } from './ui/top-nav';
import AuthContext from './AuthContext';
import { auth, signOut } from '@/auth';

export const metadata: Metadata = {
  title: {
    template: '%s | rental pool house',
    default: 'A frame pool house',
  },
  description: 'rent A frame pool house'
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  async function onSignOut() {
    'use server';
    await signOut({ redirect: true, redirectTo: '/' });
  }
  return (
    <AuthContext>
      <html lang="en" className="h-full">
        <body
          className={`${inter.className} antialiased bg-[url('/hero-image.jpg')] bg-cover bg-center bg-fixed backdrop-brightness-75`}
        >
          <div className="flex flex-col h-full">
            <header className="flex flex-col items-center justify-between p-4 md:p-8">
              <TopNav user={session?.user} onSignOut={onSignOut} />
              <p
                className={`${oranienbaum.className} text-[56px] md:text-[72px] font-bold text-white text-center w-[320px] md:w-full`}
              >
                A frame pool house
              </p>
            </header>
            <main className="flex-grow">
              {children}
            </main>
          </div>
          <Toaster richColors closeButton />
        </body>
      </html>
    </AuthContext>
  );
}
