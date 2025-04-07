import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';
import {
  MdOutlineDashboard,
  MdAdminPanelSettings,
  MdDinnerDining,
  MdCorporateFare,
  MdOutlineLocalOffer,
  MdOutlinePolicy,
} from 'react-icons/md';

import { BiBed, BiChat, BiHomeAlt, BiWorld } from 'react-icons/bi';
import { GiBigDiamondRing } from 'react-icons/gi';
import { RiBloggerLine, RiInformation2Line } from 'react-icons/ri';
import { FaRegCommentDots } from 'react-icons/fa';

const Sidebar = ({ isSideMenuOpen, toggleSideMenu }) => {
  // Receive props
  const [openMenu, setOpenMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const sidebarData = [
    {
      title: 'Dashboard',
      inAppDrawer: true,
      icon: <MdOutlineDashboard />,
      permissionSlug: 'dashboard',
      url: '/dashboard',
    },
    {
      title: 'Admin Management',
      inAppDrawer: true,
      icon: <MdAdminPanelSettings />,
      permissionSlug: 'user-management',
      children: [
        {
          title: 'Roles & Permissions',
          slug: 'list-user',
          url: '/dashboard/admin/roles',
        },
        { title: 'Admins', slug: 'view-user', url: '/dashboard/admins' },
      ],
    },

    {
      title: 'Queries',
      inAppDrawer: true,
      icon: <BiChat />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Contact', slug: 'list-user', url: '/dashboard/queries' },
        { title: 'Enquires', slug: 'list-user', url: '/dashboard/queries' },
      ],
    },
    {
      title: 'Home Page',
      inAppDrawer: true,
      icon: <BiHomeAlt />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
        { title: 'FAq', slug: 'list-user', url: '/dashboard/home/faq' },
      ],
    },
    {
      title: 'Accomodation',
      inAppDrawer: true,
      icon: <BiBed />,
      permissionSlug: 'user-management',
      children: [
        {
          title: 'Banner',
          slug: 'list-user',
          url: '/dashboard/accomodation/banner',
        },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/accomodation/seo' },
        {
          title: 'Accomodation Contents',
          slug: 'list-user',
          url: '/dashboard/accomodation/wedding',
        },
      ],
    },
    {
      title: 'Dining',
      inAppDrawer: true,
      icon: <MdDinnerDining />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'Dining Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
      ],
    },
    {
      title: 'Wedding & Events',
      inAppDrawer: true,
      icon: <GiBigDiamondRing />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'Wedding Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
        {
          title: 'Wedding Gallary',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
      ],
    },
    {
      title: 'Corporate Events',
      inAppDrawer: true,
      icon: <MdCorporateFare />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'Events Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
      ],
    },
    {
      title: 'Explore',
      inAppDrawer: true,
      icon: <BiWorld />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'Explore Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
      ],
    },

    {
      title: 'Offers',
      inAppDrawer: true,
      icon: <MdOutlineLocalOffer />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'Offers Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
      ],
    },
    {
      title: 'About Us',
      inAppDrawer: true,
      icon: <RiInformation2Line />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'About Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
      ],
    },
    {
      title: 'Blogs',
      inAppDrawer: true,
      icon: <RiBloggerLine />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
      ],
    },
    {
      title: 'Testimonials',
      inAppDrawer: true,
      icon: <FaRegCommentDots />,
      permissionSlug: 'user-management',
      children: [
        { title: 'Banner', slug: 'list-user', url: '/dashboard/home/banner' },
        { title: 'SEO', slug: 'list-user', url: '/dashboard/home/seo' },
        {
          title: 'Testimonials Contents',
          slug: 'list-user',
          url: '/dashboard/home/wedding',
        },
      ],
    },
    {
      title: 'Privacy Policy & More',
      inAppDrawer: true,
      icon: <MdOutlinePolicy />,
      permissionSlug: 'user-management',
      children: [
        {
          title: 'Privacy & policy',
          slug: 'list-user',
          url: '/dashboard/home/banner',
        },
        {
          title: 'Resort Policy',
          slug: 'list-user',
          url: '/dashboard/home/seo',
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchPermissions = async () => {
      const roleId = localStorage.getItem('role_id');
      try {
        const response = await axiosInstance.get(`/roles/${roleId}`);
        if (response.data.success) {
          setUserPermissions(
            response.data.data.permissions.map((perm) => perm.slug)
          );
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPermissions();
  }, []);

  const handleMenuClick = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const handleSubmenuClick = (submenu) => {
    setActiveSubmenu(submenu.slug);
  };

  const hasPermission = (slug) => userPermissions.includes(slug);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-[#f5f5dc] text-primary flex-col p-4 transition-transform duration-300 ease-in-out ${
          isSideMenuOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className='flex items-center justify-between  pb-4'>
          <div className='flex items-center'>
            <img className='h-20' src='/logo.png' alt='Logo' />
            {/* <span className='font-bold uppercase'>NOVA ADMIN</span> */}
          </div>
          <button onClick={toggleSideMenu} className='md:hidden p-2'>
            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
        {loading ? (
          <div className='h-screen bg-white text-primary py-2 px-4'>
            <div className='space-y-4'>
              {[...Array(12)].map((_, index) => (
                <div key={index} className='h-8 rounded grid grid-cols-4 gap-3'>
                  <div className='col-span-1 bg-[#eae0c8] rounded-full animate-pulse'></div>
                  <div className='h-8 col-span-3 bg-gray-200 rounded animate-pulse'></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <ul className='space-y-2 py-4'>
            {sidebarData.map((menu, index) => {
              const hasVisibleSubmenu = menu.children?.some((item) =>
                hasPermission(item.slug)
              );
              if (!hasVisibleSubmenu && !menu.url) return null;

              return (
                <li key={index}>
                  {menu.url ? (
                    <Link
                      to={menu.url}
                      className={`flex items-center px-4 py-2 cursor-pointer rounded-lg ${
                        activeSubmenu === menu.title
                          ? 'bg-[#f5deb3]'
                          : 'hover:bg-gray-200'
                      }`}
                    >
                      {menu.icon}
                      <span className='ml-3 text-sm font-semibold'>
                        {menu.title}
                      </span>
                    </Link>
                  ) : (
                    <div
                      onClick={() => handleMenuClick(index)}
                      className={`flex items-center px-4 py-2 cursor-pointer rounded-lg ${
                        openMenu === index
                          ? 'bg-[#eae0c8] font-semibold'
                          : 'hover:bg-gray-200 font-semibold'
                      }`}
                    >
                      {menu.icon}
                      <span className='ml-3 text-sm'>{menu.title}</span>
                    </div>
                  )}
                  {openMenu === index && menu.children && (
                    <ul className='pl-8 mt-2 space-y-1'>
                      {menu.children.map((submenu, subIndex) => {
                        if (!hasPermission(submenu.slug)) return null;
                        return (
                          <li key={subIndex}>
                            <Link to={submenu.url}>
                              <div
                                onClick={() => handleSubmenuClick(submenu)}
                                className={`px-4 py-2 cursor-pointer text-sm rounded-lg ${
                                  activeSubmenu === submenu.slug
                                    ? 'bg-[#f5deb3]'
                                    : 'hover:bg-[#eae0c8]'
                                }`}
                              >
                                {submenu.title}
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSideMenuOpen && (
        <div
          className='fixed inset-0 z-20 bg-gray-600 bg-opacity-50 md:hidden'
          onClick={toggleSideMenu}
        />
      )}
    </>
  );
};
Sidebar.propTypes = {
  isSideMenuOpen: PropTypes.bool.isRequired,
  toggleSideMenu: PropTypes.func.isRequired,
};

export default Sidebar;
