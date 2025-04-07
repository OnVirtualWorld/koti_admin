import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './pages/Layout/MainLayout';
import Main from './components/Main';
import NotFound from './pages/NotFound'; // Import the NotFound page
import UserManagement from './pages/UserManagement/users';
import AddUser from './pages/UserManagement/users/AddUser';
import AdminManagement from './pages/UserManagement/admins';
import AddAdmin from './pages/UserManagement/admins/AddUser';
import UpdateProfile from './pages/UserManagement/admins/UpdateProfile';
import Roles from './pages/UserManagement/Roles/Index';
import RoleAdd from './pages/UserManagement/Roles/AddRole';
import RoleUpdate from './pages/UserManagement/Roles/UpdateRole';

// home page

// banner
import HomeBanner from './pages/home/banner/Index';
import HomeBannerAdd from './pages/home/banner/Add';
import HomeBannerUpdate from './pages/home/banner/Update';

// faq
import Faq from './pages/home/faq/Index';
import FaqAdd from './pages/home/faq/Add';
import FaqUpdate from './pages/home/faq/Update';

// seo
import SeoUpdate from './pages/home/seo/Update';
// wedding
import Wedding from './pages/home/wedding/Index';
import WeddingAdd from './pages/home/wedding/Add';
import WeddingUpdate from './pages/home/wedding/Update';

//accomodation
// banner
import AccomodationBanner from './pages/accomodation/banner/Index';
import AccomodationBannerAdd from './pages/accomodation/banner/Add';
import AccomodationBannerUpdate from './pages/accomodation/banner/Update';

//dining
// banner
// import DiningBanner from './pages/dining/banner/Index';
// import DiningBannerAdd from './pages/dining/banner/Add';
// import DiningBannerUpdate from './pages/dining/banner/Update';

import ContactList from './pages/Query/Index';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for Login */}
        <Route path='/' element={<Login />} />

        {/* Protected routes under MainLayout */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Main />} />
          <Route path='/dashboard/admins' element={<AdminManagement />} />
          <Route path='/dashboard/admin/add' element={<AddAdmin />} />
          <Route path='/dashboard/users' element={<UserManagement />} />
          <Route path='/dashboard/user/add' element={<AddUser />} />

          {/* roles=========================== */}
          <Route path='/dashboard/admin/roles' element={<Roles />} />
          <Route path='/dashboard/admin/role/add' element={<RoleAdd />} />
          <Route
            path='/dashboard/admin/update-profile'
            element={<UpdateProfile />}
          />
          <Route
            path='/dashboard/user/role/edit/:id'
            element={<RoleUpdate />}
          />

          {/* ==================contact query */}
          <Route path='/dashboard/queries' element={<ContactList />} />
          {/* Activity-logs================================= */}

          {/* home page related routes */}
          {/* banner */}
          <Route path='/dashboard/home/banner' element={<HomeBanner />} />
          <Route
            path='/dashboard/home/banner/add'
            element={<HomeBannerAdd />}
          />
          <Route
            path='/dashboard/home/banner/edit/:id'
            element={<HomeBannerUpdate />}
          />
          {/* faq */}
          <Route path='/dashboard/home/faq' element={<Faq />} />
          <Route path='/dashboard/home/faq/add' element={<FaqAdd />} />
          <Route path='/dashboard/home/faq/edit/:id' element={<FaqUpdate />} />
          {/* seo */}

          <Route path='/dashboard/home/seo' element={<SeoUpdate />} />
          {/* wedding */}
          <Route path='/dashboard/home/wedding' element={<Wedding />} />
          <Route path='/dashboard/home/wedding/add' element={<WeddingAdd />} />
          <Route
            path='/dashboard/home/wedding/edit/:id'
            element={<WeddingUpdate />}
          />

          {/* accomodation page related routes */}
          {/* banner */}
          <Route
            path='/dashboard/accomodation/banner'
            element={<AccomodationBanner />}
          />
          <Route
            path='/dashboard/accomodation/banner/add'
            element={<AccomodationBannerAdd />}
          />
          <Route
            path='/dashboard/accomodation/banner/edit/:id'
            element={<AccomodationBannerUpdate />}
          />
        </Route>

        {/* Not Found route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
