import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='text-center flex flex-col items-center'>
        <h1 className='text-6xl font-bold text-gray-700 dark:text-gray-200'>
          404
        </h1>
        <p className='text-xl mt-10 text-gray-600 dark:text-gray-400'>
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to='/dashboard'
          className='my-16 px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700'
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
