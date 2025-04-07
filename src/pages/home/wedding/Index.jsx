import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
// import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
// import { RemoveData } from '../../../utils/Api';

const Index = () => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRemove = async (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            // setLoading(true);
            // try {
            //   const response = await RemoveData(id, 'banner');
            //   if (response.status === 200 || response.status === 201) {
            toast.success('Item deleted successfully'); // Simulated success
            // Simulate deletion by filtering out the item
            setBannerData((prev) => prev.filter((item) => item.id !== id));
            //   } else {
            //     toast.error('Something is wrong. Please try again');
            //   }
            // } catch (error) {
            //   console.log(error);
            // }
            // setLoading(false);
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  // Fetch banners from the API
  // const fetchData = async () => {
  //   try {
  //     const response = await axiosInstance.get('/banner');
  //     setBannerData(response.data.data || []);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Failed to fetch banners.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Dummy data for wedding section
  const dummyWeddingData = [
    {
      id: 1,
      title: 'Grand Wedding Hall',
      subtitle: 'Perfect venue for your special day',
      image_path: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      title: 'Outdoor Ceremony',
      subtitle: 'Beautiful garden setting',
      image_path: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      title: 'Reception Ballroom',
      subtitle: 'Elegant space for celebrations',
      image_path: 'https://via.placeholder.com/50',
    },
  ];

  // Fetch banners when the component loads
  useEffect(() => {
    // fetchData();
    // Simulate API call with dummy data
    setTimeout(() => {
      setBannerData(dummyWeddingData);
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  const bannerColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Image',
      cell: (row) => (
        <img
          src={
            row.image_path ? row.image_path : 'https://via.placeholder.com/50'
          }
          alt='Wedding Section'
          className='w-16 h-16 object-cover rounded'
        />
      ),
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Subtitle',
      selector: (row) => row.subtitle,
      sortable: true,
    },
    {
      name: 'Action',
      maxWidth: '250px',
      minWidth: '250px',
      cell: (row) => (
        <div className='flex justify-center gap-5'>
          <Link to={`/dashboard/wedding/edit/${row.id}`}>
            <FiEdit className='text-2xl text-stone-500 hover:text-blue-400' />
          </Link>
          <button onClick={() => handleRemove(row.id)} className=''>
            <MdDeleteOutline className='text-3xl text-stone-500 hover:text-red-400' />
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <PageHeader
        title='Wedding Contents'
        menu='Content Management'
        submenu='Wedding Sections'
        buttonText='Add Wedding Section'
        buttonLink='/dashboard/home/wedding/add'
      />

      <div className='p-6 dark:bg-gray-800 dark:text-white'>
        <DataTable
          columns={bannerColumns}
          data={bannerData}
          progressPending={loading}
          pagination
        />
      </div>
    </PageLayout>
  );
};

export default Index;
