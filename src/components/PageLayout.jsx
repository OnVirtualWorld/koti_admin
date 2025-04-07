// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PageLayout({ children }) {
  return <div className='p-6 dark:bg-gray-800 dark:text-white'>{children}</div>;
}
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
