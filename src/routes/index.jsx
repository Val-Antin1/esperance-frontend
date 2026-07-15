import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import FootballAcademy from '../pages/FootballAcademy';
import Football from '../pages/Football';
import WomenFootball from '../pages/WomenFootball';
import Basketball from '../pages/Basketball';
import Volleyball from '../pages/Volleyball';
import TableTennis from '../pages/TableTennis';
import GermanClasses from '../pages/GermanClasses';
import Gallery from '../pages/Gallery';
import News from '../pages/News';
import Contact from '../pages/Contact';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminStudents from '../pages/admin/AdminStudents';
import AdminStaff from '../pages/admin/AdminStaff';
import AdminGallery from '../pages/admin/AdminGallery';
import AdminNews from '../pages/admin/AdminNews';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/admin',
    children: [
      { index: true, element: <AdminLogin /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'students', element: <AdminStudents /> },
      { path: 'staff', element: <AdminStaff /> },
      { path: 'gallery', element: <AdminGallery /> },
      { path: 'news', element: <AdminNews /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'football-academy', element: <FootballAcademy /> },
      { path: 'football-academy/football', element: <Football /> },
      { path: 'football-academy/womens-football', element: <WomenFootball /> },
      { path: 'football-academy/basketball', element: <Basketball /> },
      { path: 'football-academy/volleyball', element: <Volleyball /> },
      { path: 'football-academy/table-tennis', element: <TableTennis /> },
      { path: 'football-academy/german-classes', element: <GermanClasses /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'news', element: <News /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;