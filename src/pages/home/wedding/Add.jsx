import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
import { toast } from 'react-toastify';
// import axiosInstance from '../../../utils/axiosInstance';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // Added for React Quill
  } = useForm();
  const [bannerPreview, setBannerPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subtitle, setSubtitle] = useState(''); // State for React Quill subtitle

  const onSubmit = (data) => {
    // Simulate form submission without API
    const formData = {
      title: data.title,
      subtitle: subtitle, // From React Quill
      buttonUrl: data.buttonUrl,
      image: data.image[0] ? data.image[0].name : null, // Simulate file name
    };

    setLoading(true);
    console.log('Form Data:', formData); // Log the form data for now

    // Simulate success
    setTimeout(() => {
      toast.success('Wedding section created successfully!');
      reset(); // Reset form
      setSubtitle(''); // Reset subtitle
      setBannerPreview(null); // Reset image preview
      setLoading(false);
    }, 1000); // Simulate delay
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

  // Handle subtitle change from React Quill
  const handleSubtitleChange = (value) => {
    setSubtitle(value);
    setValue('subtitle', value); // Sync with react-hook-form
  };

  return (
    <PageLayout>
      <PageHeader
        title='Add Wedding Section'
        menu='Content Management'
        submenu='Add Wedding Section'
        buttonText='Go Back'
        buttonLink='/dashboard/wedding'
      />

      <div className='p-6 dark:bg-gray-800 dark:text-white'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-4'
        >
          {/* Title Field */}
          <div>
            <label className='block mb-1'>Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.title && (
              <p className='text-red-500'>{errors.title.message}</p>
            )}
          </div>

          {/* Subtitle Field with React Quill */}
          <div>
            <label className='block mb-1'>Subtitle</label>
            <ReactQuill
              value={subtitle}
              onChange={handleSubtitleChange}
              className='dark:bg-gray-700 dark:text-white'
              theme='snow'
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  ['link'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['clean'],
                ],
              }}
            />
            {errors.subtitle && (
              <p className='text-red-500'>{errors.subtitle.message}</p>
            )}
          </div>

          {/* Button URL Field */}
          <div>
            <label className='block mb-1'>Button URL</label>
            <input
              type='url'
              {...register('buttonUrl', {
                required: 'Button URL is required',
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
                  message: 'Please enter a valid URL',
                },
              })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.buttonUrl && (
              <p className='text-red-500'>{errors.buttonUrl.message}</p>
            )}
          </div>

          {/* Image Field */}
          <div>
            <label className='block mb-1'>Image </label>
            <input
              type='file'
              name='image'
              id='image'
              accept='image/*'
              {...register('image', {
                required: 'Image is required',
                validate: (files) =>
                  files?.length > 0 || 'Please select an image.',
              })}
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

          {/* Buttons */}
          <div className='flex space-x-4 col-span-1'>
            <button
              type='button'
              onClick={() => {
                reset(); // Reset form data
                setSubtitle(''); // Reset subtitle
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

export default Add;
