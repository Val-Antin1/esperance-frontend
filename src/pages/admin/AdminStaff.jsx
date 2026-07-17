import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserTie, FaPlus, FaEdit, FaTrash, FaSearch, FaSignOutAlt, FaBars, FaTimes, FaTachometerAlt, FaCog, FaImages, FaNewspaper, FaTimesCircle, FaCheck, FaPhone, FaEnvelope, FaIdBadge, FaEye, FaSpinner, FaUserGraduate } from 'react-icons/fa';
import Seo from '../../components/common/Seo';
import api from '../../services/api';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: FaTachometerAlt },
  { label: 'Analytics', path: '/admin/analytics', icon: FaEye },
  { label: 'Students', path: '/admin/students', icon: FaUserGraduate },
  { label: 'Staff', path: '/admin/staff', icon: FaUserTie },
  { label: 'Gallery', path: '/admin/gallery', icon: FaImages },
  { label: 'News', path: '/admin/news', icon: FaNewspaper },
];

const AdminStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', position: '', biography: '', email: '', phone: '' });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin'); return; }
    const u = localStorage.getItem('adminUser');
    if (u) setUser(JSON.parse(u));
    fetchStaff();
  }, []);

  useEffect(() => {
    if (!photoFile) return;
    const objectUrl = URL.createObjectURL(photoFile);
    setPhotoPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photoFile]);

  const fetchStaff = async () => {
    try { const { data } = await api.get('/staff'); if (data.success) setStaff(data.data.staff); }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('position', form.position);
      formData.append('biography', form.biography);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      if (photoFile) formData.append('photo', photoFile);

      if (editing) await api.put(`/staff/${editing._id}`, formData);
      else await api.post('/staff', formData);

      setShowForm(false);
      setEditing(null);
      setForm({ name: '', position: '', biography: '', email: '', phone: '' });
      setPhotoFile(null);
      setPhotoPreview(null);
      fetchStaff();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, position: item.position, biography: item.biography || '', email: item.email || '', phone: item.phone || '' });
    setPhotoFile(null);
    setPhotoPreview(item.photo || item.image || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (pendingDeleteId) return;
    setPendingDeleteId(id);
    try { await api.delete(`/staff/${id}`); setDeleteConfirm(null); fetchStaff(); }
    catch (e) { alert('Error deleting'); }
    finally { setPendingDeleteId(null); }
  };

  const logout = () => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); navigate('/admin', { replace: true }); };

  const filtered = staff.filter(s => s.name?.toLowerCase().includes(search.toLowerCase()) || s.position?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Seo path="/admin/staff" noindex />
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed lg:fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-gray-100 shadow-lg flex flex-col transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300`}>
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-1"><img src="/logo.PNG" alt="Logo" className="h-20 w-auto" /><p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Admin Panel</p></div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600"><FaTimes /></button>
          </div>
          {user && <div className="mt-5 p-3 bg-gradient-to-r from-gray-50 to-stone-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-bold shadow-sm">{user.name?.charAt(0)?.toUpperCase() || 'A'}</div>
              <div><p className="text-sm font-semibold text-gray-900">{user.name}</p><p className="text-xs text-gray-400 capitalize">{user.role?.replace('_', ' ')}</p></div>
            </div>
          </div>}
        </div>
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">{navItems.map(item => (<Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path ? 'bg-yellow-50 text-yellow-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}><item.icon className="text-lg transition-transform group-hover:scale-110" /><span className="text-sm font-medium">{item.label}</span></Link>))}</nav>
        <div className="p-4 border-t border-gray-100 bg-white/50 flex-shrink-0"><button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 group"><FaSignOutAlt className="transition-transform group-hover:scale-110" /><span className="text-sm font-medium">Sign Out</span></button></div>
      </aside>
      <div className="flex-1 min-w-0 lg:ml-64">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:justify-end sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-gray-600"><FaBars className="text-xl" /></button>
          <div className="flex items-center gap-4"><Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"><FaEye className="text-xs" /> View Website</Link><button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"><FaSignOutAlt /> Logout</button></div>
        </header>
        <main className="p-6 md:p-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-gray-800 to-gray-600"></div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Staff Management</h1>
              </div>
              <p className="text-gray-400 ml-4">Manage coaches, trainers, and staff members</p>
            </div>
            <button onClick={() => { setEditing(null); setForm({ name: '', position: '', biography: '', email: '', phone: '' }); setPhotoFile(null); setPhotoPreview(null); setShowForm(true); }} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md">
              <FaPlus className="text-sm" /> Add Staff
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input type="text" placeholder="Search by name or position..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-sm" />
          </div>

          {/* Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={() => { setShowForm(false); setEditing(null); setPhotoFile(null); setPhotoPreview(null); }}>
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{editing ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
                    <button onClick={() => { setShowForm(false); setEditing(null); setPhotoFile(null); setPhotoPreview(null); }} className="text-gray-400 hover:text-gray-600 transition-colors"><FaTimesCircle className="text-xl" /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="e.g. John Doe" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Position *</label>
                        <input type="text" value={form.position} onChange={e => setForm({...form, position: e.target.value})} required placeholder="e.g. Head Coach" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                        <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+216 XX XXX XXX" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Biography</label>
                      <textarea value={form.biography} onChange={e => setForm({...form, biography: e.target.value})} rows={3} placeholder="Brief biography..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Photo</label>
                      <div className="flex items-center gap-4">
                        <input type="file" accept="image/*" onChange={e => { setPhotoFile(e.target.files?.[0] || null); }} className="text-sm text-gray-500 file:border-0 file:bg-gray-100 file:text-gray-700 file:px-4 file:py-2.5 file:rounded-xl file:cursor-pointer hover:file:bg-gray-200 file:transition-colors file:text-sm file:font-medium" />
                      </div>
                      {photoPreview && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 w-32 h-32">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 text-sm font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            <span>{editing ? 'Updating...' : 'Creating...'}</span>
                          </>
                        ) : (
                          editing ? 'Update Staff' : 'Create Staff'
                        )}
                      </button>
                      <button type="button" onClick={() => { setShowForm(false); setEditing(null); setPhotoFile(null); setPhotoPreview(null); }} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm font-medium">Cancel</button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {deleteConfirm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                      <FaTrash className="text-red-500 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Staff Member?</h3>
                    <p className="text-sm text-gray-500 mb-6">This action cannot be undone. Are you sure you want to delete this staff member?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium">Cancel</button>
                      <button onClick={() => handleDelete(deleteConfirm)} disabled={pendingDeleteId === deleteConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {pendingDeleteId === deleteConfirm ? <><FaSpinner className="animate-spin" /> Deleting...</> : 'Delete'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Staff Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s, index) => (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      {s.photo ? (
                        <img src={s.photo} alt={s.name} className="w-16 h-16 rounded-2xl object-cover border border-gray-200 shadow-sm" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 border border-gray-200">
                          <FaUserTie className="text-2xl" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{s.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">{s.position}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {s.email && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <FaEnvelope className="text-[10px]" />
                            <span className="truncate max-w-[100px]">{s.email}</span>
                          </span>
                        )}
                        {s.phone && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <FaPhone className="text-[10px]" />
                            {s.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {s.biography && (
                    <p className="text-sm text-gray-400 mt-4 line-clamp-2 leading-relaxed">{s.biography}</p>
                  )}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                    <button onClick={() => handleEdit(s)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                      <FaEdit className="text-xs" /> Edit
                    </button>
                    <button onClick={() => setDeleteConfirm(s._id)} disabled={pendingDeleteId === s._id} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                      <FaTrash className="text-xs" /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FaUserTie className="text-gray-300 text-2xl" />
                  </div>
                  <p className="text-gray-500 font-medium">No staff members found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search or add a new staff member.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminStaff;