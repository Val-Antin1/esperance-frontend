import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaPlus, FaEdit, FaTrash, FaSearch, FaSignOutAlt, FaBars, FaTimes, FaTachometerAlt, FaCog, FaImages, FaNewspaper, FaTimesCircle, FaSpinner, FaEye } from 'react-icons/fa';
import Seo from '../../components/common/Seo';
import api from '../../services/api';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: FaTachometerAlt },
  { label: 'Students', path: '/admin/students', icon: FaUserGraduate },
  { label: 'Staff', path: '/admin/staff', icon: FaCog },
  { label: 'Gallery', path: '/admin/gallery', icon: FaImages },
  { label: 'News', path: '/admin/news', icon: FaNewspaper },
];

const sports = ['Football', "Women's Football", 'Basketball', 'Volleyball', 'Table Tennis'];

const AdminStudents = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', position: '', age: '', gender: 'Male', sport: 'Football' });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    if (!photoFile) {
      if (editing && editing.profilePhoto) {
        setPhotoPreview(editing.profilePhoto);
      } else {
        setPhotoPreview(null);
      }
      return;
    }

    const objectUrl = URL.createObjectURL(photoFile);
    setPhotoPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [photoFile, editing]);

  const fetchStudents = async () => {
    try {
      const { data } = await api.get('/students?limit=100');
      if (data.success) {
        setStudents(data.data.students);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ name: '', position: '', age: '', gender: 'Male', sport: 'Football' });
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const appendIfValue = (key, value) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value);
        }
      };

      appendIfValue('name', form.name);
      appendIfValue('position', form.position);
      appendIfValue('age', form.age);
      appendIfValue('gender', form.gender);
      appendIfValue('sport', form.sport);
      if (photoFile) formData.append('profilePhoto', photoFile);

      if (editing) {
        await api.put(`/students/${editing._id}`, formData);
      } else {
        await api.post('/students', formData);
      }

      resetForm();
      setShowForm(false);
      fetchStudents();
    } catch (err) {
      console.error('Error saving student:', err);
      const apiMessage = err.response?.data?.message;
      const validationErrors = err.response?.data?.data?.errors;
      if (validationErrors && Array.isArray(validationErrors)) {
        alert(validationErrors.map((item) => item.msg).join('\n')); 
      } else {
        alert(apiMessage || 'Failed to save student');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (student) => {
    setEditing(student);
    setForm({
      name: student.name || '',
      position: student.position || '',
      age: student.age?.toString() || '',
      gender: student.gender || 'Male',
      sport: student.sport || 'Football',
    });
    setPhotoFile(null);
    setPhotoPreview(student.profilePhoto || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (pendingDeleteId) return;
    setPendingDeleteId(id);
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete student');
    } finally {
      setPendingDeleteId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin', { replace: true });
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(search.toLowerCase()) ||
    student.position?.toLowerCase().includes(search.toLowerCase()) ||
    student.sport?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
      <Seo path="/admin/students" noindex />
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed lg:fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border-r border-gray-100 shadow-lg flex flex-col transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300`}>
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-1">
              <img src="/logo.PNG" alt="Logo" className="h-20 w-auto" />
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Admin Panel</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600"><FaTimes /></button>
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.path === '/admin/students' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <item.icon className="text-lg" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 bg-white/50 flex-shrink-0">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200 group">
            <FaSignOutAlt className="transition-transform group-hover:scale-110" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 lg:ml-64">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:justify-end sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-gray-600"><FaBars className="text-xl" /></button>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"><FaEye className="text-xs" /> View Website</Link>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        <main className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-gray-800 to-gray-600"></div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Student Management</h1>
              </div>
              <p className="text-gray-400 ml-4">Upload player profiles and keep team rosters current.</p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaPlus className="text-sm" /> Add Player
            </button>
          </div>

          <div className="relative mb-6 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search by name, position, or sport..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-sm"
            />
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={() => { resetForm(); setShowForm(false); }}>
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{editing ? 'Edit Player Profile' : 'Add New Player'}</h3>
                    <button onClick={() => { resetForm(); setShowForm(false); }} className="text-gray-400 hover:text-gray-600 transition-colors"><FaTimesCircle className="text-xl" /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          required
                          placeholder="Kenny"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Position *</label>
                        <input
                          type="text"
                          value={form.position}
                          onChange={(e) => setForm({ ...form, position: e.target.value })}
                          required
                          placeholder="Forward"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Age *</label>
                        <input
                          type="number"
                          value={form.age}
                          onChange={(e) => setForm({ ...form, age: e.target.value })}
                          required
                          min="1"
                          placeholder="14"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Sport *</label>
                        <select
                          value={form.sport}
                          onChange={(e) => setForm({ ...form, sport: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                        >
                          {sports.map((sport) => (
                            <option key={sport} value={sport}>{sport}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                        <select
                          value={form.gender}
                          onChange={(e) => setForm({ ...form, gender: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Profile Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                          className="text-sm text-gray-500 file:border-0 file:bg-gray-100 file:text-gray-700 file:px-4 file:py-2.5 file:rounded-xl file:cursor-pointer hover:file:bg-gray-200"
                        />
                        {photoPreview && (
                          <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 w-32 h-32">
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 text-sm font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            <span>{editing ? 'Updating...' : 'Creating...'}</span>
                          </>
                        ) : (
                          editing ? 'Update Player' : 'Create Player'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => { resetForm(); setShowForm(false); }}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {deleteConfirm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                      <FaTrash className="text-red-500 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Player?</h3>
                    <p className="text-sm text-gray-500 mb-6">This action cannot be undone. Are you sure you want to delete this player?</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse" />
              ))
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <motion.div
                  key={student._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-3xl text-primary">
                      {student.profilePhoto ? <img src={student.profilePhoto} alt={student.name} className="w-full h-full object-cover" /> : <FaUserGraduate />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{student.position}</p>
                      <p className="text-sm text-gray-500 mt-1">{student.sport}</p>
                      <p className="text-sm text-gray-500 mt-1">Age: {student.age}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button onClick={() => handleEdit(student)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => setDeleteConfirm(student._id)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-sm hover:bg-red-700 transition-colors">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="lg:col-span-3 bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <p className="text-gray-500">No players found. Use the button above to add new athlete profiles.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStudents;
