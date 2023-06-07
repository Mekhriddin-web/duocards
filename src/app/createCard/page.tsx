'use client';

import { db } from '@/lib/firebase';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import ButtonBack from '@/components/ButtonBack';
import useLocalStorageUser from '@/hooks/useLocalStorageUser';

type FormData = {
  word: string;
  wordTranslation: string;
  exapleOfUsage?: string;
};

export default function CreateCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const { user } = useLocalStorageUser();

  const [messagesuccess, setMessagesuccess] = useState(false);

  const saveUserData = async (userId: string, data: FormData) => {
    const userCollectionRef = collection(db, 'users');
    await addDoc(userCollectionRef, {
      userId,
      data,
    });
  };

  const onSubmit = (data: FormData) => {
    if (user) {
      saveUserData(user.uid, data);
      reset();
      setMessagesuccess(true);

      setTimeout(() => {
        setMessagesuccess(false);
      }, 2000);
    }
  };

  return (
    <div className='w-full max-w-xs'>
      <ButtonBack />
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='word'
          >
            Слово
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.word ? 'border-red-500' : ''
            }`}
            id='word'
            type='text'
            {...register('word', { required: true })}
          />
          {errors.word && (
            <p className='text-red-500 text-xs italic'>
              Это поле обязательное!
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='wordTranslation'
          >
            Перевод слова
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.wordTranslation ? 'border-red-500' : ''
            }`}
            id='wordTranslation'
            type='text'
            {...register('wordTranslation', { required: true })}
          />
          {errors.wordTranslation && (
            <p className='text-red-500 text-xs italic'>
              Это поле обязательное!
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='exapleOfUsage'
          >
            Пример использования слова
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='word'
            {...register('exapleOfUsage')}
          />
        </div>
        <button
          className='mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
          type='submit'
        >
          Сохранить
        </button>
        {!user ? (
          <div className='bg-red-100 rounded-md p-3 flex'>
            <div className='text-red-700'>
              <div className='font-bold text-xl'>
                Вы должны войти в свой аккаунт
              </div>
            </div>
          </div>
        ) : null}
        {messagesuccess ? (
          <div className='bg-green-100 rounded-md p-3 flex'>
            <svg
              className='stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0'
              viewBox='0 0 24 24'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M0 0h24v24H0z' stroke='none' />
              <circle cx='12' cy='12' r='9' />
              <path d='M9 12l2 2 4-4' />
            </svg>

            <div className='text-green-700'>
              <div className='font-bold text-xl'>Слово успешно сохранено!</div>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
