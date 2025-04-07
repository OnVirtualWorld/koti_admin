import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddRole = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [permissionsData, setPermissionsData] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch permissions from the API
  const fetchPermissions = async () => {
    try {
      const response = await axiosInstance.get('/roles/data/permissions');
      const data = response.data.data;

      // Transform the object into an array
      const formattedPermissions = Object.keys(data).map((key) => ({
        section_name: data[key].section_name,
        items: data[key].items,
      }));

      setPermissionsData(formattedPermissions);
    } catch (error) {
      toast.error('Failed to fetch permissions');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSelectAll = (sectionItems, isChecked) => {
    const sectionIds = sectionItems.map((item) => item._id);
    setSelectedPermissions((prev) => {
      if (isChecked) {
        return [...new Set([...prev, ...sectionIds])];
      } else {
        return prev.filter((id) => !sectionIds.includes(id));
      }
    });
  };

  const isAllSelected = (sectionItems) =>
    sectionItems.every((item) => selectedPermissions.includes(item._id));

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      name: data.role,
      description: data.description,
      permissions: selectedPermissions,
    };
    try {
      await axiosInstance.post('/roles', payload);
      toast.success('Role created successfully!');
      reset();
      setSelectedPermissions([]);
      navigate('/dashboard/admin/roles');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create role.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title='Role Management'
        menu='User Management'
        submenu='Add Role'
        buttonText='Go Back'
        buttonLink='/dashboard/admin/roles'
      />
      <div className='md:p-6 dark:bg-gray-800 dark:text-white'>
        <h1 className='text-2xl font-bold mb-4'>Add Role</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-1 gap-6'
        >
          <div>
            <label className='block mb-1'>Role Name</label>
            <input
              {...register('role', { required: 'Role Name is required' })}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            />
            {errors.role && (
              <p className='text-red-500'>{errors.role.message}</p>
            )}
          </div>
          <div>
            <label className='block mb-1'>Description</label>
            <textarea
              rows={2}
              {...register('description')}
              className='w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
            ></textarea>
            {errors.description && (
              <p className='text-red-500'>{errors.description.message}</p>
            )}
          </div>
          <div>
            <h2 className='text-lg font-bold mb-2'>Permissions</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {permissionsData.map((section) => (
                <div
                  key={section.section_name}
                  className='p-4 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600'
                >
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='font-bold'>{section.section_name}</h3>
                    <label className='flex items-center'>
                      <input
                        type='checkbox'
                        checked={isAllSelected(section.items)}
                        onChange={(e) =>
                          handleSelectAll(section.items, e.target.checked)
                        }
                        className='mr-2'
                      />
                      Select All
                    </label>
                  </div>
                  {section.items.map((item) => (
                    <div key={item._id} className='flex items-center mb-2'>
                      <input
                        type='checkbox'
                        id={`permission-${item._id}`}
                        checked={selectedPermissions.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                        className='mr-2'
                      />
                      <label htmlFor={`permission-${item._id}`}>
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className='flex space-x-4'>
            <button
              type='button'
              onClick={() => {
                reset();
                setSelectedPermissions([]);
              }}
              className='bg-gray-500 text-xs text-white px-4 py-2 rounded dark:bg-gray-700'
            >
              Reset
            </button>
            <button
              type='submit'
              className='bg-violet-500 text-xs text-white px-4 py-2 rounded dark:bg-violet-700'
            >
              {loading ? 'Submitting' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default AddRole;
