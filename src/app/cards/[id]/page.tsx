'use client';

import ButtonBack from '@/components/ButtonBack';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/store';

let TinderCard: any;
try {
  TinderCard = require('react-tinder-card');
} catch (error) {
  TinderCard = null;
}

type CardType = {
  id: string;
  word: string;
  wordTranslation: string;
  exapleOfUsage?: string;
  color: string;
};

export default function Cards({ params }: { params: { id: string } }) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [isFlipArray, setIsFlipArray] = useState<boolean[]>([]);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [cardDirection, setCardDirection] = useState('');

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
  };
  const { userProfile } = useUserStore(state => state);
  const canSwipe = currentIndex >= 0;

  useEffect(() => {
    const getUserCards = async () => {
      if (userProfile) {
        const docRef = doc(db, userProfile.uid, decodeURIComponent(params.id));

        try {
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();

            const cardsArray = Object.entries(userData).map(([key, value]) => ({
              id: key,
              ...value,
            }));

            setCards(cardsArray);
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

    setIsFlipArray(new Array(cards.length).fill(false));
  }, [router, userProfile, cards.length, params.id]);

  const swiped = (dir: string, index: number) => {
    updateCurrentIndex(index - 1);
    setCardDirection('');
    out(dir);
  };

  const out = (dir: string) => {
    setCardDirection(dir);
  };

  const ubdateFlipArray = (key: number) => {
    const newState = (isFlipArray[key] = true);
    setIsFlipArray(prevState => [...prevState, newState]);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ButtonBack />
      <div className='cardContainer'>
        {cards.length > 0 ? (
          cards.map((card, key) => (
            <TinderCard
              className='swipe pressable'
              key={card.id}
              onSwipe={(dir: string) => swiped(dir, key)}
              preventSwipe={
                isFlipArray[key]
                  ? ['up', 'down']
                  : ['up', 'down', 'left', 'right']
              }
              // onSwipeRequirementFulfilled={(dir: string) => out(dir)}
              // onCardLeftScreen={(dir: string) => out(dir)}
            >
              <div
                className={`card text-black ${
                  card.color === 'white' && 'bg-white'
                } ${card.color === 'green' && 'bg-lime-400'} ${
                  card.color === 'red' && 'bg-rose-600 text-white'
                } ${card.color === 'yellow' && 'bg-yellow-400'} ${
                  card.color === 'black' && 'bg-black text-white'
                }`}
                key={key}
                onClick={() => ubdateFlipArray(key)}
              >
                <div
                  className={`card-inner p-6 text-center ${
                    isFlipArray[key] && 'card-inner-rotate'
                  }`}
                >
                  {isFlipArray[key] ? (
                    <div className='card-back'>
                      <h2 className='mb-2 text-2xl font-bold tracking-tight'>
                        {card.wordTranslation}
                      </h2>
                      <p>{card.word}</p>
                      <p className='font-normal'>{card.exapleOfUsage}</p>
                    </div>
                  ) : (
                    <div className='card-front'>
                      <h2 className='mb-2 text-2xl font-bold tracking-tight pressable'>
                        {card.word}
                      </h2>
                    </div>
                  )}
                </div>

                {cardDirection === 'right' && isFlipArray[key] && (
                  <div className='absolute top-2 left-2 z-10 bg-green-100 rounded-md p-3 text-green-700'>
                    Знаю
                  </div>
                )}
                {cardDirection === 'left' && isFlipArray[key] && (
                  <div className='absolute top-2 right-2  z-10 bg-red-100 rounded-md p-3 text-red-700'>
                    Учить сново
                  </div>
                )}
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
