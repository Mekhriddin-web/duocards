'use client';

import Auth from '@/components/Auth';
import useUserStore from '@/store/store';
import Link from 'next/link';

export default function Home() {
  const user = useUserStore(state => state.user);
  return (
    <div>
      {user?.uid ? (
        <div>
          <Link
            href='/cards'
            className='block text-center mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Начать учить слова
          </Link>
          <Link
            href='/createCard'
            className='block text-center mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Добавить новое слово
          </Link>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <p className='mb-4 text-center'>
            Вам нужно зарегистрироваться, чтобы начать пользоваться приложением!
          </p>
          <Auth />
        </div>
      )}
    </div>
  );
}
