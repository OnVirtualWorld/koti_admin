import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleBanner } from '../../../utils/Api';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
import axiosInstance from '../../../utils/axiosInstance';

const Update = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerData, setBannerdata] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchSingleBannerData = useCallback(async () => {
    const response = await getSingleBanner(id);
    setBannerdata(response?.data?.data);
    filledForm(response?.data?.data);
  }, []);

  useEffect(() => {
    fetchSingleBannerData();
  }, [fetchSingleBannerData]);

  const filledForm = (data) => {
    setValue('name', data.name);
    // setValue("file", data.file[0]);
    setValue('description', data.description);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append('_method', 'PUT');
    formData.append('name', data.name);
    formData.append('description', data.description ? data.description : '');
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]); // Ensure the first file is added
    }

    setLoading(true);

    try {
      // Send form data using axiosInstance with the pre-configured base URL
      await axiosInstance.post(`/banner/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Banner Updated successfully!');
      reset(); // Reset form after successful submission
      setBannerPreview(null); // Reset image preview
      navigate('/dashboard/banners');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create banner.');
    } finally {
      setLoading(false);
    }
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
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
          className='grid grid-cols-1 gap-4' // Each field in its own row
        >
          <div>
            <label className='block mb-1'>Banner Name</label>
            <input
              {...register('name', { required: 'Banner name is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className='block mb-1'>Banner Description</label>
            <textarea
              {...register('description')}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
              rows='3'
            />
            {errors.description && (
              <p className='text-red-500'>{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className='block mb-1'>Banner Image</label>
            <input
              type='file'
              name='image'
              id='image'
              accept='image/*'
              {...register('image')}
              onChange={handleImageChange}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.image && (
              <p className='text-red-500'>{errors.image.message}</p>
            )}
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt='Preview'
                className='mt-4 w-32 h-32 object-cover rounded'
              />
            )}
          </div>
          <div className='px-3 '>
            <div className='mb-5'>
              <label
                htmlFor='file'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                Current Image
              </label>
              <img
                src={bannerData?.image_path}
                alt='Banner'
                className='w-34 h-16 p-1 border border-dotted	 '
              />
            </div>
          </div>

          <div className='flex space-x-4 col-span-1'>
            <button
              type='button'
              onClick={() => {
                reset(); // Reset form data
                setBannerPreview(null); // Reset image preview
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
