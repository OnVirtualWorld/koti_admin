import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../utils/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  // Form submission handler
  const onSubmit = (data) => {
    const credentials = {
      email: data.email,
      password: data.password,
    };
    dispatch(loginUser(credentials)); // Dispatch login action
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token || isAuthenticated) {
      navigate('/dashboard');
      if (!isAuthenticated) {
        toast.info('You are already logged in!');
      }
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    navigate('/dashboard');
    toast.success(`Welcome to the Admin Panel, ${user?.name || 'Admin'}!`);
    // Redirect to dashboard or some other page if already authenticated
    // return <Redirect to='/dashboard' />;
  }

  return (
    <div className='flex items-center min-h-screen p-6 bg-[#f5f5dc] dark:bg-gray-900'>
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-[#eee8aa] rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='h-32 md:h-auto md:w-1/2'>
            <img
              aria-hidden='true'
              className='object-cover w-full h-full dark:hidden'
              src='/cop.jpg'
              alt='Office'
            />
            <img
              aria-hidden='true'
              className='hidden object-cover w-full h-full dark:block'
              src='/cop.jpg'
              alt='Office'
            />
          </div>
          <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            <div className='w-full'>
              <div className='flex items-center justify-center'>
                <img src='/logo.png' className='h-24 ' />
              </div>
              <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                Login
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className='block text-sm'>
                  <span className='text-gray-700 dark:text-gray-400'>
                    Email
                  </span>
                  <input
                    {...register('email', { required: 'Email is required' })}
                    type='email'
                    className='block w-full py-2 px-4 mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-primary focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input'
                    placeholder='Jane Doe'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm'>
                      {errors.email.message}
                    </p>
                  )}
                </label>
                <label className='block mt-4 text-sm'>
                  <span className='text-gray-700 dark:text-gray-400'>
                    Password
                  </span>
                  <input
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    type='password'
                    className='block w-full py-2 px-4 mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input'
                    placeholder='***************'
                  />
                  {errors.password && (
                    <p className='text-red-500 text-sm'>
                      {errors.password.message}
                    </p>
                  )}
                </label>
                <button
                  type='submit'
                  className='block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-primary border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple'
                  disabled={loading} // Disable button while loading
                >
                  {loading ? 'Logging in...' : 'Log in'}
                </button>
              </form>
              {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
