import DataTable from 'react-data-table-component';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';

const Roles = () => {
  const [data, setData] = useState([]); // Holds role data from the API
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch roles from the API
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/roles');
      setData(response.data.data || []); // Assuming API response contains 'data.data'
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch roles.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch roles when the component loads
  useEffect(() => {
    fetchData();
  }, []);

  // Define columns including action buttons
  const roleColumns = [
    // { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Role', selector: (row) => row.name, sortable: true },
    { name: 'Description', selector: (row) => row.description, sortable: true },
    // {
    //   name: 'Actions',
    //   cell: (row) => (
    //     <div>
    //       <Link to={`/dashboard/user/role/edit/${row.id}`}>
    //         <FiEdit className='text-2xl text-stone-500 hover:text-blue-400' />
    //       </Link>
    //     </div>
    //   ),
    // },
  ];

  return (
    <PageLayout>
      <PageHeader
        title='Admin Roles'
        menu='Admin Management'
        submenu='Roles'
        buttonText='Add Role'
        buttonLink='/dashboard/admin/role/add'
      />
      <DataTable
        columns={roleColumns}
        data={data}
        pagination
        progressPending={loading}
      />
    </PageLayout>
  );
};

export default Roles;
