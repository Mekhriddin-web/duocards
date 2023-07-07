import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'flashcards izumi-it-company',
  description:
    'flashcards  cards-izumi-it-company- Learn a language for free @izumi-it-company',
  openGraph: {
    title: 'flashcards izumi-it-company',
    openGraphImage: '/logo_01.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='wrapper' id='wrapper'>
          <Header />
          <div className='app' id='app'>
            <main className='relative flex flex-col items-center justify-between px-10 py-20 md:p-24'>
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
