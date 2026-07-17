import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUsers, FaEye, FaUserCheck, FaCalendar } from 'react-icons/fa';
import api from '../../services/api';
import Seo from '../../components/common/Seo';
import { getVisitorId, markAsAdminDevice, isAdminDevice } from '../../services/analyticsTracker';

const Analytics = () => {
  const { t } = useTranslation();
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

  const COLORS = ['#D4AF37', '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

  useEffect(() => {
    fetchAnalytics();
  }, [filterPeriod, searchQuery]);

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
    <div>
      <Seo path="/admin/analytics" title="Website Analytics" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Website Analytics</h1>
          <p className="text-gray-600">Real-time visitor insights and statistics</p>
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

        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button
            onClick={() => setFilterPeriod('today')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterPeriod === 'today'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilterPeriod('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterPeriod === 'week'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setFilterPeriod('month')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterPeriod === 'month'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setFilterPeriod('year')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterPeriod === 'year'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            This Year
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={FaUsers}
            title="Total Visitors"
            value={dashboardData?.totalVisitors}
            color="#D4AF37"
          />
          <StatCard
            icon={FaEye}
            title="Total Visits"
            value={dashboardData?.totalVisits}
            color="#FFD700"
          />
          <StatCard
            icon={FaUserCheck}
            title="Returning Visitors"
            value={dashboardData?.returningVisitors}
            color="#FFA500"
          />
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Visits Per Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Visits Per Day</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitsPerDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitCount" stroke="#D4AF37" name="Visits" />
                <Line type="monotone" dataKey="count" stroke="#FFD700" name="Unique Visitors" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Browser Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Browser Usage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={browserUsage}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {browserUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Device Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Device Usage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deviceUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#D4AF37" name="Visitors" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Most Visited Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Most Visited Pages</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mostVisitedPages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="_id" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="visits" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Visitors by Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 lg:col-span-2"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Visitor Countries</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitorsByCountry}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#D4AF37" name="Visitors" />
                <Bar dataKey="visits" fill="#FFA500" name="Total Visits" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Visitors Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Visitors</h3>
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
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
              <tbody className="divide-y divide-gray-200">
                {recentVisitors.map((visitor) => (
                  <tr key={visitor._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono truncate">{visitor.visitorId.substring(0, 16)}...</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.browser}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.deviceType}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{visitor.visitCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(visitor.lastVisitDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Returning Visitors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top 20 Returning Visitors</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Visitor ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Browser</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total Visits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Last Visit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">First Visit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topReturning.map((visitor, index) => (
                  <tr key={visitor._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-yellow-600">#{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-mono truncate">{visitor.visitorId.substring(0, 16)}...</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.browser}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{visitor.deviceType}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{visitor.visitCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(visitor.lastVisitDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(visitor.firstVisitDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
