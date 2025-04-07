import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { ToastContainer } from 'react-toastify';

function MainLayout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
          isSideMenuOpen ? 'overflow-hidden' : ''
        }`}
      >
        {/* Sidebar */}
        <Sidebar
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
        />

        {/* Main Content Area */}
        <div className='flex flex-col flex-1 w-full'>
          {/* Navbar */}
          <Navbar toggleSideMenu={toggleSideMenu} />

          {/* Main Content and Routing */}
          <main className='h-full overflow-y-auto'>
            <Outlet />
          </main>
        </div>
        <ToastContainer position='top-right' autoClose={3000} />
      </div>
    </>
  );
}

export default MainLayout;
