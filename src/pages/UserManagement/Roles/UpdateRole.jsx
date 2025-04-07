import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { getSingleBanner } from '../../../utils/Api';
import axiosInstance from '../../../utils/axiosInstance';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';

const AddBanner = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  //   const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    const response = await getSingleBanner(id);
    // setData(response?.data?.data);
    filledForm(response?.data?.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filledForm = (data) => {
    setValue('name', data.name);
    // setValue("file", data.file[0]);
    setValue('description', data.description);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]); // Ensure the first file is added
    }

    setLoading(true);

    try {
      // Send form data using axiosInstance with the pre-configured base URL
      await axiosInstance.put(`/banner/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Banner Updated successfully!');
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
        title='Update Banner'
        menu='Content Management'
        submenu='Edit Banner'
        buttonText='Go Back'
        buttonLink='/dashboard/banners'
      />

      <div className='p-6 dark:bg-gray-800 dark:text-white'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-2 gap-4'
        >
          <div className=''>
            <label className='block mb-1'>Role Name</label>
            <input
              {...register('role', { required: 'Role Name is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.role && (
              <p className='text-red-500'>{errors.role.message}</p>
            )}
          </div>
          <div className=''>
            <label className='block mb-1'>Description</label>
            <textarea
              rows={1}
              {...register('description')}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            ></textarea>
            {errors.description && (
              <p className='text-red-500'>{errors.description.message}</p>
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
              className='bg-primary text-xs text-white px-4 py-2 rounded dark:bg-primaryLight'
            >
              {loading ? 'Updating' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default AddBanner;
