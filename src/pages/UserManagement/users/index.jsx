import DataTable from 'react-data-table-component';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
import axiosInstance from '../../../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { confirmAlert } from 'react-confirm-alert'; // Import the confirm-alert library
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the default styles

const UserManagement = () => {
  const [data, setData] = useState([]); // Holds user data from the API
  const [loading, setLoading] = useState(true); // Loading state
  // const [toggleLoading, setToggleLoading] = useState(false); // For individual toggle actions

  // Function to handle toggle status
  // const handleToggle = async (id) => {
  //   // setToggleLoading(true);
  //   try {
  //     await axiosInstance.patch(`/admin/${id}/status`);
  //     toast.success('Status updated successfully!');
  //     fetchData();
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || 'Failed to update status.');
  //   } finally {
  //     // setToggleLoading(false);
  //   }
  // };

  // Function to show confirmation dialog
  // const confirmToggle = (id) => {
  //   confirmAlert({
  //     title: 'Confirm Action',
  //     message: 'Are you sure you want to toggle the status?',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: () => handleToggle(id), // Calls the toggle function if confirmed
  //       },
  //       {
  //         label: 'No',
  //         onClick: () => {}, // No action needed
  //       },
  //     ],
  //   });
  // };

  // Define table columns
  const columns = [
    // { name: 'ID', selector: (row) => row.id, sortable: true },
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Email', selector: (row) => row.email, sortable: true },
    { name: 'Phone', selector: (row) => row.phone, sortable: true },
    // {
    //   name: ' Status',
    //   cell: (row) => (
    //     <button
    //       onClick={() => confirmToggle(row._id)} // Calls the confirmation dialog
    //       disabled={toggleLoading}
    //       className={`py-2 px-4 text-white rounded-md ${
    //         row.status === true
    //           ? 'bg-green-500 hover:bg-green-600'
    //           : 'bg-red-500 hover:bg-red-600'
    //       }`}
    //     >
    //       {row.status === true ? 'Active' : 'Inactive'}
    //     </button>
    //   ),
    //   ignoreRowClick: true, // Prevents accidental row click triggering toggle
    //   allowOverflow: true, // Avoids layout issues
    // },
  ];

  // Fetch user data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/users');
      setData(response.data.data || []); // Assuming API response contains 'data.data'
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageLayout>
      <PageHeader
        title='User Management'
        menu='User Management'
        submenu='Users'
        buttonText='Add User'
        buttonLink='/dashboard/user/add'
        showButton={false}
      />
      <DataTable
        columns={columns}
        data={data}
        pagination
        progressPending={loading} // Shows a loading spinner while data is being fetched
      />
    </PageLayout>
  );
};

export default UserManagement;
