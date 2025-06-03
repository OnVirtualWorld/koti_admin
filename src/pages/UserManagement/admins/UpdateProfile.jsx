import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import moment from 'moment';

function UpdateProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm();

  const [userId, setUserId] = useState('');

  // Fetch user data from /users/user/data endpoint
  useEffect(() => {
    axiosInstance
      .get('/users/user/data')
      .then((response) => {
        const userData = response?.data?.data;
        setUserId(userData._id);
        handlePrefill(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data.');
      });
  }, [setValue]);

  const handlePrefill = (userData) => {
    setValue('name', userData.name || '');
    setValue('phone', userData.phone || '');
    setValue('address', userData.address || '');
    setValue(
      'dob',
      userData.dob ? moment(userData.dob).format('YYYY-MM-DD') : ''
    );
    setValue('email', userData.email || '');
    setValue('bio', userData.bio || '');
    setValue('gender', userData.gender || '');
  };

  const onUpdateInfo = (data) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      dob: data.dob,
      email: data.email,
      bio: data.bio,
      gender: data.gender,
    };

    axiosInstance
      .put(`/admin/${userId}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success('User information updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating user information:', error);
        toast.error('Failed to update user information.');
      });
  };

  const onUpdatePassword = (data) => {
    axiosInstance
      .post('/change-password', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success('Password updated successfully!');
        resetPasswordForm();
      })
      .catch((error) => {
        console.error('Error updating password:', error);
        toast.error('Failed to update password.');
      });
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        {/* Update Profile Form */}
        <div className='bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6'>
            Update Profile
          </h2>
          <form
            onSubmit={handleSubmit(onUpdateInfo)}
            className='space-y-4 sm:space-y-6'
          >
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                type='text'
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              {errors.name && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                {...register('email')}
                type='email'
                readOnly
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm bg-gray-100 focus:ring-0 cursor-not-allowed'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Phone
              </label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                type='text'
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              {errors.phone && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Address
              </label>
              <input
                {...register('address')}
                type='text'
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Gender
              </label>
              <select
                {...register('gender')}
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              >
                <option value=''>Select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.gender && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Date of Birth
              </label>
              <input
                {...register('dob', { required: 'Date of Birth is required' })}
                type='date'
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              {errors.dob && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Bio
              </label>
              <textarea
                {...register('bio')}
                rows={4}
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='bg-blue-900 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto'
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Update Password Section */}
        <div className='bg-white shadow rounded-lg p-4 sm:p-6 lg:p-8'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6'>
            Update Password
          </h2>
          <form
            onSubmit={handlePasswordSubmit(onUpdatePassword)}
            className='space-y-4 sm:space-y-6'
          >
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Old Password
              </label>
              <input
                {...registerPassword('old_password', {
                  required: 'Old password is required',
                })}
                type='password'
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              {passwordErrors.old_password && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {passwordErrors.old_password.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                New Password
              </label>
              <input
                {...registerPassword('password', {
                  required: 'New password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type='password'
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              {passwordErrors.password && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {passwordErrors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Confirm Password
              </label>
              <input
                {...registerPassword('password_confirmation', {
                  required: 'Please confirm your password',
                  validate: (value, { password }) =>
                    value === password || 'Passwords do not match',
                })}
                type='password'
                className='mt-1 block w-full p-2 sm:p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              {passwordErrors.password_confirmation && (
                <p className='text-red-500 text-xs sm:text-sm mt-1'>
                  {passwordErrors.password_confirmation.message}
                </p>
              )}
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='bg-blue-900 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto'
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
