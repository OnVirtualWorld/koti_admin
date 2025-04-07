import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../utils/redux/slices/authSlice';
import PropTypes from 'prop-types';

function Navbar({ toggleSideMenu }) {
  // Receive toggleSideMenu prop
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className='z-10 py-4 bg-[#f5f5dc] shadow-md dark:bg-gray-800'>
      <div className='container flex items-center justify-between md:justify-end h-full px-6 mx-auto text-primary dark:text-primaryLight'>
        {/* Mobile hamburger */}
        <button
          className='p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple'
          onClick={toggleSideMenu} // Use the prop here
          aria-label='Menu'
        >
          <svg
            className='w-6 h-6'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20A 20'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            />
          </svg>
        </button>

        <ul className='flex items-center flex-shrink-0 space-x-6'>
          {/* Profile menu */}
          <li className='relative' ref={profileMenuRef}>
            <button
              className='align-middle rounded-full focus:shadow-outline-purple focus:outline-none'
              onClick={toggleProfileMenu}
              aria-label='Account'
            >
              <img
                className='object-cover w-8 h-8 rounded-full'
                src='https://www.svgrepo.com/show/529279/user-circle.svg'
                alt=''
              />
            </button>
            {isProfileMenuOpen && (
              <div className='absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700'>
                <div className='px-4 py-2 text-gray-700 dark:text-gray-200'>
                  Admin
                </div>
                <div className='border-t border-gray-200 dark:border-gray-700'></div>
                <ul>
                  <li>
                    <Link to='/dashboard/admin/update-profile'>
                      <div className='w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'>
                        Update Profile
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button
                      className='w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200'
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
Navbar.propTypes = {
  toggleSideMenu: PropTypes.func.isRequired,
};

export default Navbar;
