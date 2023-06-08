'use client';

import ButtonBack from '@/components/ButtonBack';
import { db } from '@/lib/firebase';
import useLocalStorageUser from '@/hooks/useLocalStorageUser';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';

let TinderCard: any;
try {
  TinderCard = require('react-tinder-card');
} catch (error) {
  TinderCard = null;
}

type CardType = {
  userId: string;
  data: {
    word: string;
    wordTranslation: string;
    exapleOfUsage?: string;
  };
};

export default function Cards() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(1);
  const currentIndexRef = useRef(currentIndex);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const { user } = useLocalStorageUser();
  const canSwipe = currentIndex >= 0;

  useEffect(() => {
    const getUserCards = async () => {
      const userCollectionRef = collection(db, 'users');
      if (user) {
        try {
          const q = query(userCollectionRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs.map(doc => {
              return doc.data() as CardType;
            });

            setCards(userData);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      } else {
        router.push('/');
      }
    };

    getUserCards();
  }, [router, user]);

  const swiped = (index: number) => {
    updateCurrentIndex(index - 1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ButtonBack />
      <div className='cardContainer'>
        {cards.length > 0 ? (
          cards.map((card, key) => (
            <TinderCard className='swipe' key={key} onSwipe={() => swiped(key)}>
              <div
                className='card max-w-[600px] w-full mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100'
                key={key}
              >
                <div>
                  <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
                    {card.data.word}
                  </h2>
                  <p>{card.data.wordTranslation}</p>
                  <p className='font-normal text-gray-700'>
                    {card.data.exapleOfUsage}
                  </p>
                </div>
              </div>
            </TinderCard>
          ))
        ) : (
          <div>
            <p className='text-center mb-4'>у вас нет пока слов</p>
            <Link
              href='/createCard'
              className='block text-center mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Добавить новое слово
            </Link>
          </div>
        )}
        {!canSwipe && (
          <div>
            <h2 className='text-4xl font-extrabold text-black text-center'>
              Вы повторили все слова!
            </h2>
            <Confetti width={width} height={height} />
          </div>
        )}
      </div>
    </div>
  );
}
