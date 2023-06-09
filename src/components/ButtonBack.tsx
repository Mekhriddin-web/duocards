import Link from 'next/link';

export default function ButtonBack() {
  return (
    <Link
      href='/'
      className='absolute top-4 left-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2'
    >
      <svg
        aria-hidden='true'
        className='w-5 h-5 scale-[-1]'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
          clipRule='evenodd'
        ></path>
      </svg>
      <span className='sr-only'>Icon description</span>
    </Link>
  );
}
