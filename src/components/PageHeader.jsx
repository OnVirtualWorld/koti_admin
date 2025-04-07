import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PageHeader({
  title,
  buttonLink,
  buttonText,
  menu,
  submenu,
  showButton = true,
}) {
  return (
    <div className='mb-6 border-b dark:border-gray-600 uppercase'>
      <nav className='text-xs mb-4'>
        <Link to='/dashboard' className='text-primary dark:text-primaryLight'>
          {menu}
        </Link>{' '}
        /{' '}
        <span className='text-gray-500 dark:text-gray-200 font-semibold'>
          {submenu}
        </span>
      </nav>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold text-primary'>{title}</h1>
        {showButton && (
          <Link
            to={buttonLink}
            className='bg-primary text-xs text-white px-4 py-2 rounded dark:bg-primary'
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  menu: PropTypes.string.isRequired,
  submenu: PropTypes.string.isRequired,
  showButton: PropTypes.bool.isRequired,
};

export default PageHeader;
