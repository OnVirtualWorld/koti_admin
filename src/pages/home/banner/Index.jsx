import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { RemoveData } from '../../../utils/Api';

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
            setLoading(true);
            try {
              const response = await RemoveData(id, 'banner');
              if (response.status === 200 || response.status === 201) {
                toast.success(response.data.message);
                fetchData();
              } else {
                toast.error('Something is wrong. Please try again');
              }
            } catch (error) {
              console.log(error);
            }
            setLoading(false);
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
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/banner');
      setBannerData(response.data.data || []); // Assuming API response is an array
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch banners.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch banners when the component loads
  useEffect(() => {
    fetchData();
  }, []);

  const bannerColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Banner Image',
      cell: (row) => (
        <img
          src={
            row.image_path ? row.image_path : 'https://via.placeholder.com/50'
          }
          alt='Banner'
          className='w-16 h-16 object-cover rounded'
        />
      ),
    },
    {
      name: 'Banner Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Action',
      maxWidth: '250px',
      minWidth: '250px',
      cell: (row) => (
        <div className='flex  justify-center gap-5'>
          <Link to={`/dashboard/banner/edit/${row.id}`}>
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
        title='Banners'
        menu='Content Management'
        submenu='Banners'
        buttonText='Add Banner'
        buttonLink='/dashboard/home/banner/add'
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
