import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';

const Update = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append('name', data.name);
    formData.append('description', data.description ? data.description : '');
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]); // Ensure the first file is added
    }

    setLoading(true);

    try {
      // Send form data using axiosInstance with the pre-configured base URL
      await axiosInstance.post('/banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Banner created successfully!');
      reset(); // Reset form after successful submission
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create banner.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title='Update SEO'
        menu='Content Management'
        submenu='Update SEO'
        buttonText='Go Back'
        buttonLink='/dashboard/home/seo'
        showButton={false}
      />

      <div className='p-6 dark:bg-gray-800 dark:text-white'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-4' // Each field in its own row
        >
          <div>
            <label className='block mb-1'>Meta Title</label>
            <input
              {...register('name', { required: 'Banner name is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className='block mb-1'>Meta Description</label>
            <textarea
              {...register('name', { required: 'Banner name is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            ></textarea>
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='flex space-x-4 col-span-1'>
            <button
              type='button'
              onClick={() => {
                reset(); // Reset form data
              }}
              className='bg-gray-500 text-xs text-white px-4 py-2 rounded dark:bg-gray-700'
            >
              Reset
            </button>
            <button
              type='submit'
              className='bg-primary text-xs text-white px-4 py-2 rounded dark:bg-primaryLight'
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default Update;
