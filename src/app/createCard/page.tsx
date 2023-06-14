'use client';

import { db } from '@/lib/firebase';
import { useForm } from 'react-hook-form';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import ButtonBack from '@/components/ButtonBack';
import useUserStore from '@/store/store';

type FormData = {
  category: string;
  word: string;
  wordTranslation: string;
  exapleOfUsage?: string;
  color: string;
};

export default function CreateCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const { userProfile } = useUserStore();

  const [messagesuccess, setMessagesuccess] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const saveUserData = async (
    userId: string,
    data: FormData,
    category: string
  ) => {
    const userCollectionRef = collection(db, userId);
    const newUserCollectionRef = doc(userCollectionRef);

    const userDocRef = doc(db, userId, category);
    await setDoc(
      userDocRef,
      { [newUserCollectionRef.id]: data },
      { merge: true }
    );
  };

  const onSubmit = (data: FormData) => {
    if (userProfile) {
      saveUserData(userProfile.uid, data, data.category);
      reset();
      setMessagesuccess(true);

      setTimeout(() => {
        setMessagesuccess(false);
      }, 2000);
    } else {
      setMessageError(true);
      setTimeout(() => {
        setMessageError(false);
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
            htmlFor='category'
          >
            Категория
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.category ? 'border-red-500' : ''
            }`}
            id='category'
            type='text'
            {...register('category', { required: true })}
          />
          {errors.category && (
            <p className='text-red-500 text-xs italic'>
              Это поле обязательное!
            </p>
          )}
        </div>
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
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='colors'
          >
            Цвет карточки
          </label>
          <select
            id='colors'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            {...register('color')}
          >
            <option value='white'>Белая карточка</option>
            <option value='black'>Черная карточка</option>
            <option value='red'>Красная карточка</option>
            <option value='green'>Зеленая карточка</option>
            <option value='yellow'>Желтая карточка</option>
          </select>
        </div>
        <button
          className='mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
          type='submit'
        >
          Сохранить
        </button>
        {messageError ? (
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
