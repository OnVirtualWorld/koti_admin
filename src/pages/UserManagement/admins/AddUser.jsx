import { useForm } from 'react-hook-form';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
import axiosInstance from '../../../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [permissionsData, setPermissionsData] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(`/admin`, data);
      toast.success('Admin created successfully!');
      navigate('/dashboard/admins');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create Admin.');
    }
  };

  // Fetch permissions from the API
  const fetchPermissions = async () => {
    try {
      const response = await axiosInstance.get('/roles');
      setPermissionsData(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch permissions');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // Map the permissions data to the format that react-select expects
  const roleOptions = permissionsData.map((permission) => ({
    value: permission._id,
    label: permission.name,
  }));

  // Handle change of selected role using react-select
  const handleRoleChange = (selectedOption) => {
    setValue('role', selectedOption.value); // Set the selected value to react-hook-form
  };

  return (
    <PageLayout>
      <PageHeader
        title='Admin Management'
        menu='Admin Management'
        submenu='Add Admin'
        buttonText='Go Back'
        buttonLink='/dashboard/admins'
      />
      <div className='md:p-6 dark:bg-gray-800 dark:text-white'>
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
            <label className='block mb-1'>Phone</label>
            <input
              {...register('phone', { required: 'Phone is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.phone && (
              <p className='text-red-500'>{errors.phone.message}</p>
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
              {...register('password_confirmation', {
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

          {/* React Select dropdown for Role */}
          <div className=''>
            <label className='block mb-1'>Role</label>
            <Select
              options={roleOptions}
              onChange={handleRoleChange} // This will handle the change of the selected role
              className='w-full'
              classNamePrefix='react-select'
            />
            {errors.roleId && (
              <p className='text-red-500'>{errors.role.message}</p>
            )}
          </div>

          <div className='col-span-2 flex items-center justify-between  space-x-4'>
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
