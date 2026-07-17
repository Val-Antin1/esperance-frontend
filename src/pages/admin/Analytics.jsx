import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers, FaEye, FaUserCheck, FaCalendar, FaSignOutAlt, FaBars, FaTimes, FaTachometerAlt, FaUserGraduate, FaUserTie, FaImages, FaNewspaper } from 'react-icons/fa';
import api from '../../services/api';
import Seo from '../../components/common/Seo';
import { getVisitorId, markAsAdminDevice, isAdminDevice } from '../../services/analyticsTracker';

const Analytics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [visitsPerDay, setVisitsPerDay] = useState([]);
  const [mostVisitedPages, setMostVisitedPages] = useState([]);
  const [visitorsByCountry, setVisitorsByCountry] = useState([]);
  const [browserUsage, setBrowserUsage] = useState([]);
  const [deviceUsage, setDeviceUsage] = useState([]);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [topReturning, setTopReturning] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminMarked, setAdminMarked] = useState(isAdminDevice());
  const [markingAdmin, setMarkingAdmin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const COLORS = ['#D4AF37', '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

  // Authentication check
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

    fetchAnalytics();
  }, [navigate]);

  // Fetch analytics on filter change
  useEffect(() => {
    fetchAnalytics();
  }, [filterPeriod, searchQuery]);

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: FaTachometerAlt },
    { label: 'Analytics', path: '/admin/analytics', icon: FaEye },
    { label: 'Students', path: '/admin/students', icon: FaUserGraduate },
    { label: 'Staff', path: '/admin/staff', icon: FaUserTie },
    { label: 'Gallery', path: '/admin/gallery', icon: FaImages },
    { label: 'News', path: '/admin/news', icon: FaNewspaper },
  ];

  const getDateRange = () => {
    const now = new Date();
    let startDate = new Date();

    switch (filterPeriod) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    return {
      startDate: startDate.toISOString(),
      endDate: now.toISOString(),
    };
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const dateRange = getDateRange();
      const params = new URLSearchParams(dateRange);

      const [dashRes, dayRes, pagesRes, countryRes, browserRes, deviceRes, recentRes, topRes] = await Promise.all([
        api.get(`/analytics/dashboard?${params}`),
        api.get(`/analytics/visits-per-day?${params}&days=30`),
        api.get('/analytics/most-visited-pages?limit=10'),
        api.get('/analytics/visitors-by-country?limit=10'),
        api.get('/analytics/browser-usage'),
        api.get('/analytics/device-usage'),
        api.get(`/analytics/recent-visitors?limit=20&search=${searchQuery}`),
        api.get('/analytics/top-returning-visitors?limit=20'),
      ]);

      if (dashRes.data.success) setDashboardData(dashRes.data.data);
      if (dayRes.data.success) setVisitsPerDay(dayRes.data.data);
      if (pagesRes.data.success) setMostVisitedPages(pagesRes.data.data);
      if (countryRes.data.success) setVisitorsByCountry(countryRes.data.data);
      if (browserRes.data.success) setBrowserUsage(browserRes.data.data);
      if (deviceRes.data.success) setDeviceUsage(deviceRes.data.data);
      if (recentRes.data.success) setRecentVisitors(recentRes.data.data);
      if (topRes.data.success) setTopReturning(topRes.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsAdmin = async () => {
    try {
      setMarkingAdmin(true);
      const visitorId = getVisitorId();
      
      await api.post('/analytics/mark-admin-device', { visitorId });
      
      markAsAdminDevice();
      setAdminMarked(true);
      
      console.log('[Analytics] Device marked as admin - future visits will be ignored');
    } catch (error) {
      console.error('Error marking device as admin:', error);
    } finally {
      setMarkingAdmin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin', { replace: true });
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value || '0'}</p>
        </div>
        <Icon className="text-3xl" style={{ color }} />
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Seo path="/admin/analytics" title="Website Analytics" noindex />
      
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
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
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Website Analytics</h1>
            </div>
            <p className="text-gray-400 ml-4">Real-time visitor insights and statistics</p>
          </div>

          {/* Admin Device Status */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-lg border ${
              adminMarked
                ? 'bg-green-50 border-green-200'
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                {adminMarked ? (
                  <>
                    <p className="font-semibold text-green-900">✓ Admin Device Marked</p>
                    <p className="text-sm text-green-700 mt-1">
                      Your visits are not being recorded in analytics
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-blue-900">Your visits are being recorded</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Mark this device as admin to exclude your visits from analytics
                    </p>
                  </>
                )}
              </div>
              {!adminMarked && (
                <button
                  onClick={handleMarkAsAdmin}
                  disabled={markingAdmin}
                  className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 disabled:opacity-50 transition-colors"
                >
                  {markingAdmin ? 'Marking...' : 'Mark as Admin'}
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <div className="mb-8 flex flex-wrap gap-2">
            {['today', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setFilterPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterPeriod === period
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {period === 'today' ? 'Today' : period === 'week' ? 'This Week' : period === 'month' ? 'This Month' : 'This Year'}
              </button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard icon={FaUsers} title="Total Visitors" value={dashboardData?.totalVisitors} color="#D4AF37" />
            <StatCard icon={FaEye} title="Total Visits" value={dashboardData?.totalVisits} color="#FFD700" />
            <StatCard icon={FaUserCheck} title="Returning Visitors" value={dashboardData?.returningVisitors} color="#FFA500" />
            <StatCard
              icon={FaCalendar}
              title="Visits This Period"
              value={
                filterPeriod === 'today'
                  ? dashboardData?.visitesToday
                  : filterPeriod === 'week'
                  ? dashboardData?.visitsThisWeek
                  : filterPeriod === 'month'
                  ? dashboardData?.visitsThisMonth
                  : dashboardData?.totalVisits
              }
              color="#FF6B6B"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Visits Per Day */}
            {visitsPerDay.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Visits Per Day</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={visitsPerDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visitCount" stroke="#D4AF37" strokeWidth={2} />
                    <Line type="monotone" dataKey="uniqueCount" stroke="#FFD700" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Browser Usage */}
            {browserUsage.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Browser Usage</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={browserUsage} dataKey="count" nameKey="browser" cx="50%" cy="50%" outerRadius={100} label>
                      {browserUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Device Usage */}
            {deviceUsage.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Device Usage</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={deviceUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="deviceType" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#D4AF37" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {/* Most Visited Pages */}
            {mostVisitedPages.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Most Visited Pages</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mostVisitedPages} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="page" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="visitCount" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </div>

          {/* Recent Visitors Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Visitors</h3>
              <input
                type="text"
                placeholder="Search visitor ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Visitor ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Browser</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Device</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Visits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVisitors.map((visitor) => (
                    <tr key={visitor._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono">{visitor.visitorId}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visitor.country || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visitor.browser || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visitor.deviceType || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visitor.visitCount || 0}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(visitor.lastVisitDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Top Returning Visitors */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Top 20 Returning Visitors</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Visitor ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Browser</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Device</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total Visits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {topReturning.map((visitor, index) => (
                    <tr key={visitor._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-bold">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono">{visitor.visitorId}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visitor.country || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visitor.browser || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visitor.deviceType || 'Unknown'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{visitor.visitCount}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(visitor.lastVisitDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
