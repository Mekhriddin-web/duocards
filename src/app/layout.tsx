import Header from '@/components/Header';
import './globals.css';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'flashcards izumi-it-company',
  description:
    'flashcards  cards-izumi-it-company- Learn a language for free @izumi-it-company',
  image: '/logo_01.svg',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
        <meta property='og:title' content={metadata.title} />
        <meta property='og:description' content={metadata.description} />
        <meta property='og:image' content={metadata.image} />
      </Head>
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
