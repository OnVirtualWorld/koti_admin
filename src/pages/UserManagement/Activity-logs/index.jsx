import DataTable from 'react-data-table-component';
import PageLayout from '../../../components/PageLayout';
import PageHeader from '../../../components/PageHeader';

const activityLogData = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Logged in',
    timestamp: '2024-12-24 10:00 AM',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Updated profile',
    timestamp: '2024-12-24 10:30 AM',
  },
  {
    id: 3,
    user: 'Sam Johnson',
    action: 'Logged out',
    timestamp: '2024-12-24 11:00 AM',
  },
  {
    id: 4,
    user: 'John Doe',
    action: 'Changed password',
    timestamp: '2024-12-24 11:15 AM',
  },
];

const activityLogColumns = [
  { name: 'ID', selector: (row) => row.id, sortable: true },
  { name: 'User', selector: (row) => row.user, sortable: true },
  { name: 'Action', selector: (row) => row.action, sortable: true },
  { name: 'Timestamp', selector: (row) => row.timestamp, sortable: true },
];

const UserActivityLogs = () => {
  return (
    <PageLayout>
      <PageHeader
        title='Activity Logs'
        menu='User Management'
        submenu='Activity Logs'
        buttonText='Go Back'
        buttonLink='/dashboard/users'
      />

      <div className='p-6 dark:bg-gray-800 dark:text-white'>
        <h1 className='text-2xl font-bold mb-4'>User Activity Logs</h1>
        <DataTable
          columns={activityLogColumns}
          data={activityLogData}
          pagination
        />
      </div>
    </PageLayout>
  );
};

export default UserActivityLogs;
