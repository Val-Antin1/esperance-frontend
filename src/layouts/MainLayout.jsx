import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import api from '../services/api';

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const publishVisit = async () => {
      if (location.pathname.startsWith('/admin')) {
        return;
      }
      try {
        await api.post('/visitors/hit');
      } catch (error) {
        console.warn('Unable to record visitor count:', error);
      }
    };

    publishVisit();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 sm:pt-36 lg:pt-40">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;
