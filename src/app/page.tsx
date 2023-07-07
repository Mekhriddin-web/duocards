'use client';

import Auth from '@/components/Auth';
import useUserStore from '@/store/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Home() {
  const { userProfile } = useUserStore(state => state);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  const deleteCategory = async (category: string) => {
    if (userProfile) {
      await deleteDoc(doc(db, userProfile.uid, category));
      const newCategories = categories.filter(item => item !== category);

      setCategories(newCategories);
    }
  };

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
                        Category: {category}
                      </h2>
                      <Link
                        href={`/cards/${encodeURIComponent(category)}`}
                        className='block text-center mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      >
                        Start learning the words
                      </Link>
                      <button
                        className='block w-full text-center mb-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => deleteCategory(category)}
                      >
                        Delete category
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
          <Link
            href='/createCard'
            className='block text-center mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Add a new word
          </Link>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <p className='mb-4 text-center'>
            You need to register to start using the app!
          </p>
          <Auth />
        </div>
      )}
    </div>
  );
}
