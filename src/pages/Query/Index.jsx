import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import PageLayout from '../../components/PageLayout';
import PageHeader from '../../components/PageHeader';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { CgClose, CgReadme } from 'react-icons/cg';

const QueryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});

  // Fetch queries from the API
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/contact-form');
      setData(response.data.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch queries.');
    } finally {
      setLoading(false);
    }
  };

  // Open modal with message
  const openModal = (row) => {
    setSelectedMessage(row);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMessage({});
  };

  // Handle status update confirmation
  const handleConfirmStatusChange = (id, newStatus) => {
    confirmAlert({
      title: 'Confirm Status Update',
      message: `Are you sure you want to change the status to "${newStatus}"?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleStatusUpdate(id, newStatus),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  // Handle status update API call
  const handleStatusUpdate = async (id, newStatus) => {
    setUpdating(true);
    try {
      await axiosInstance.put(`/contact-us/${id}/status`, {
        status: newStatus,
      });

      toast.success('Status updated successfully!');
      setSelectedStatuses((prev) => ({ ...prev, [id]: newStatus }));
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  // Fetch queries on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to apply colors based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500 font-semibold';
      case 'In Review':
        return 'text-blue-500 font-semibold';
      case 'Resolved':
        return 'text-green-500 font-semibold';
      case 'Called':
        return 'text-purple-500 font-semibold';
      case 'Mailed':
        return 'text-orange-500 font-semibold';
      default:
        return 'text-gray-500 font-semibold';
    }
  };

  // Define table columns
  const queryColumns = [
    {
      name: 'Person Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => (
        <a
          href={`mailto:${row.email}`}
          className='text-blue-800 hover:underline'
        >
          {row.email}
        </a>
      ),
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row) => (
        <a href={`tel:${row.phone}`} className='text-green-800 hover:underline'>
          {row.phone}
        </a>
      ),
      sortable: true,
    },

    {
      name: 'Action',
      maxWidth: '300px',
      minWidth: '250px',
      cell: (row) => (
        <div className='flex items-center gap-3'>
          {/* Open modal button */}
          <button
            className='bg-gray-100 p-2 rounded hover:bg-blue-100 hover:text-blue-500'
            onClick={() => openModal(row)}
          >
            <CgReadme />
          </button>

          {/* Dropdown for selecting status */}
          {/* <select
            className='border rounded px-2 py-1'
            value={selectedStatuses[row.id] || row.status}
            onChange={(e) =>
              setSelectedStatuses({
                ...selectedStatuses,
                [row.id]: e.target.value,
              })
            }
          >
            <option value='Pending'>Pending</option>
            <option value='In Review'>In Review</option>
            <option value='Resolved'>Resolved</option>
            <option value='Called'>Called</option>
            <option value='Mailed'>Mailed</option>
          </select> */}

          {/* Submit button */}
          {/* <button
            className='bg-[#a2783c] text-white px-3 py-1 rounded hover:bg-[#876537] transition'
            onClick={() =>
              handleConfirmStatusChange(
                row.id,
                selectedStatuses[row._id] || row.status
              )
            }
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update'}
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <PageHeader
        title='Queries'
        menu='Consultant Management'
        submenu='Queries'
        showButton={false}
      />

      <div className='p-6 dark:bg-gray-800 dark:text-white'>
        <DataTable
          columns={queryColumns}
          data={data}
          progressPending={loading}
          pagination
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className='fixed  inset-0 flex items-center justify-center'>
          <div className=' border bg-gray-200  p-6 rounded shadow-lg w-[500px]'>
            <h2 className='text-lg font-semibold mb-4'>
              Message of {selectedMessage?.name}
            </h2>
            <p className='text-sm'>Email: {selectedMessage?.email}</p>
            <p className='text-sm'>Phone: {selectedMessage?.phone}</p>
            <p className='text-gray-700 py-10 '>
              {selectedMessage.description || 'No message available'}
            </p>
            <button
              className='mt-4 flex items-center gap-2  bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600'
              onClick={closeModal}
            >
              <CgClose /> Close
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default QueryTable;
