import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserTie, FaImages, FaNewspaper, FaSignOutAlt, FaBars, FaTimes, FaTachometerAlt, FaCog, FaEye, FaClock, FaArrowUp } from 'react-icons/fa';
import Seo from '../../components/common/Seo';
import api from '../../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token) {
      navigate('/admin', { replace: true });
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get('/dashboard/stats');
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin', { replace: true });
  };

  const statCards = [
    { label: 'Staff Members', value: stats?.totalStaff ?? '—', icon: FaUserTie, iconBg: 'bg-stone-700' },
    { label: 'Gallery Images', value: stats?.totalGalleryImages ?? '—', icon: FaImages, iconBg: 'bg-gray-700' },
    { label: 'News Articles', value: stats?.totalNews ?? '—', icon: FaNewspaper, iconBg: 'bg-zinc-700' },
    { label: 'Website Visits', value: stats?.visitorCount ?? '—', icon: FaEye, iconBg: 'bg-amber-700' },
  ];

  const recentActivity = [
    { action: 'Staff management', detail: 'Manage coaches and staff members', time: 'Ongoing', type: 'staff' },
    { action: 'Gallery updated', detail: 'Upload and organize images', time: 'Pending', type: 'gallery' },
    { action: 'News articles', detail: 'Create and publish updates', time: 'Pending', type: 'news' },
    { action: 'Site settings', detail: 'Configure website options', time: 'Ready', type: 'settings' },
  ];

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FaTachometerAlt },
    { label: 'Staff', path: '/admin/staff', icon: FaUserTie },
    { label: 'Gallery', path: '/admin/gallery', icon: FaImages },
    { label: 'News', path: '/admin/news', icon: FaNewspaper },
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'staff': return <FaUserTie className="text-stone-600" />;
      case 'gallery': return <FaImages className="text-gray-600" />;
      case 'news': return <FaNewspaper className="text-zinc-600" />;
      case 'settings': return <FaCog className="text-slate-600" />;
      default: return <FaClock className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Seo path="/admin/dashboard" noindex />
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-gray-100 shadow-lg flex flex-col transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300`}>
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-1">
              <img src="/logo.PNG" alt="Logo" className="h-20 w-auto" />
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Admin Panel</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors">
              <FaTimes />
            </button>
          </div>
          {user && (
            <div className="mt-5 p-3 bg-gradient-to-r from-gray-50 to-stone-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  {user.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role?.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group"
            >
              <item.icon className="text-lg transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-white/50 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 group"
          >
            <FaSignOutAlt className="transition-transform group-hover:scale-110" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:justify-end sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors">
            <FaBars className="text-xl" />
          </button>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <FaEye className="text-xs" />
              View Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 md:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 rounded-full bg-gradient-to-b from-gray-800 to-gray-600"></div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            </div>
            <p className="text-gray-400 ml-4">Welcome back{user ? `, ${user.name?.split(' ')[0]}` : ''}! Here's your website overview.</p>
          </div>

          {/* Main Stat Cards */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 mb-3" />
                  <div className="h-8 bg-gray-100 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <card.icon className="text-white text-lg" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 font-medium mb-1">{card.label}</p>
                    <p className="text-3xl font-bold tracking-tight text-gray-900">{card.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Section: Dashboard Info + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Dashboard Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                      <h2 className="text-lg font-semibold text-gray-900">Management Overview</h2>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{activity.detail}</p>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1 mt-1">
                          <FaClock className="text-[10px]" />
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                    <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                  </div>
                  <div className="space-y-3">
                    <Link to="/admin/news" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group">
                      <div className="w-10 h-10 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-600 group-hover:scale-110 transition-transform">
                        <FaNewspaper />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Post News</p>
                        <p className="text-xs text-gray-400">Create & publish articles</p>
                      </div>
                    </Link>
                    <Link to="/admin/gallery" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform">
                        <FaImages />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Upload Gallery</p>
                        <p className="text-xs text-gray-400">Add images & media</p>
                      </div>
                    </Link>
                    <Link to="/admin/staff" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group">
                      <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center text-stone-600 group-hover:scale-110 transition-transform">
                        <FaUserTie />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Manage Staff</p>
                        <p className="text-xs text-gray-400">Add or edit staff</p>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;