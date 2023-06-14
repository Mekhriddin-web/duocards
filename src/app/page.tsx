'use client';

import Auth from '@/components/Auth';
import useUserStore from '@/store/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Home() {
  const { userProfile } = useUserStore(state => state);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      if (userProfile) {
        const userCollectionRef = collection(db, userProfile.uid);

        const q = query(userCollectionRef);

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs.map(doc => {
            return doc.id;
          });

          setCategories(userData);
        }
      }
    };

    getCategory();

    setIsLoading(false);
  }, [userProfile]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <div>
      {userProfile ? (
        <div>
          <div className='grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4'>
            {categories.length > 0
              ? categories.map(category => {
                  return (
                    <div
                      key={category}
                      className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow'
                    >
                      <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                        Категория: {category}
                      </h2>
                      <Link
                        href={`/cards/${category}`}
                        className='block text-center mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Начать учить слова
                      </Link>
                    </div>
                  );
                })
              : null}
          </div>
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
