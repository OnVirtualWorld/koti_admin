import { useForm } from 'react-hook-form';
import PageLayout from '../../components/PageLayout';
import PageHeader from '../../components/PageHeader';

function AddUser() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <PageLayout>
      <PageHeader
        title='User Management'
        menu='User Management'
        submenu='Add User'
        buttonText='Go Back'
        buttonLink='/dashboard/users'
      />
      <div className='p-6 dark:bg-gray-800 dark:text-white'>
        <h1 className='text-2xl font-bold mb-4'>Add User</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-2 gap-4'
        >
          <div className=''>
            <label className='block mb-1'>Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>
          <div className=''>
            <label className='block mb-1'>Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>
          <div className=''>
            <label className='block mb-1'>Password</label>
            <input
              type='password'
              {...register('password', { required: 'Password is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )}
          </div>
          <div className=''>
            <label className='block mb-1'>Confirm Password</label>
            <input
              type='password'
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.confirmPassword && (
              <p className='text-red-500'>{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className=' flex space-x-4'>
            <button
              type='button'
              onClick={() => reset()}
              className='bg-gray-500 text-xs text-white px-4 py-2 rounded dark:bg-gray-700'
            >
              Reset
            </button>
            <button
              type='submit'
              className='bg-violet-500 text-xs text-white px-4 py-2 rounded dark:bg-violet-700'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}

export default AddUser;
