import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImages, FaPlus, FaEdit, FaTrash, FaSearch, FaSignOutAlt, FaBars, FaTimes, FaTachometerAlt, FaCog, FaUserTie, FaNewspaper, FaTimesCircle, FaCalendarAlt, FaFolder, FaExpand, FaEye, FaCheckSquare, FaSquare } from 'react-icons/fa';
import api from '../../services/api';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: FaTachometerAlt },
  { label: 'Staff', path: '/admin/staff', icon: FaUserTie },
  { label: 'Gallery', path: '/admin/gallery', icon: FaImages },
  { label: 'News', path: '/admin/news', icon: FaNewspaper },
];

const categories = ['Football', "Women's Football", 'Basketball', 'Volleyball', 'Table Tennis', 'German Classes', 'Events'];

const AdminGallery = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', category: 'Football', description: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageMax, setStorageMax] = useState(100);
  const [storageFull, setStorageFull] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin'); return; }
    const u = localStorage.getItem('adminUser');
    if (u) setUser(JSON.parse(u));
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try { 
      const { data } = await api.get('/gallery'); 
      if (data.success) {
        setItems(data.data.gallery);
        setStorageUsed(data.data.storageUsed || 0);
        setStorageMax(data.data.storageMax || 100);
        setStorageFull(data.data.storageFull || false);
      }
    }
    catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!file) {
      setPreview(editing?.imageUrl || null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }, [file, editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('category', form.category);
      formData.append('description', form.description);
      if (file) formData.append('image', file);

      if (editing) {
        await api.put(`/gallery/${editing._id}`, formData);
      } else {
        await api.post('/gallery', formData);
      }

      setShowForm(false);
      setEditing(null);
      setForm({ title: '', category: 'Football', description: '' });
      setFile(null);
      setPreview(null);
      fetchItems();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error saving';
      setUploadError(errorMsg);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, category: item.category, description: item.description || '' });
    setFile(null);
    setPreview(item.imageUrl || null);
    setShowForm(true);
    setUploadError('');
  };

  const handleDelete = async (id) => {
    try { await api.delete(`/gallery/${id}`); setDeleteConfirm(null); fetchItems(); }
    catch (e) { alert('Error deleting'); }
  };

  const handleBulkDelete = async () => {
    try {
      await api.delete('/gallery', { data: { ids: selectedItems } });
      setBulkDeleteConfirm(false);
      setSelectedItems([]);
      fetchItems();
    } catch (e) {
      alert('Error deleting images');
    }
  };

  const toggleItemSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filtered.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filtered.map(item => item._id));
    }
  };

  const logout = () => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminUser'); navigate('/admin', { replace: true }); };

  const filteredByCategory = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
  const filtered = filteredByCategory.filter(i => i.title?.toLowerCase().includes(search.toLowerCase()));

  const storagePercent = Math.min(Math.round((storageUsed / storageMax) * 100), 100);

  const uniqueCategories = ['All', ...new Set(items.map(i => i.category))];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex">
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
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">{navItems.map(item => (<Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group"><item.icon className="text-lg transition-transform group-hover:scale-110" /><span className="text-sm font-medium">{item.label}</span></Link>))}</nav>
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
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Gallery Management</h1>
              </div>
              <p className="text-gray-400 ml-4">Manage and organize gallery images</p>
            </div>
            <button 
              onClick={() => { 
                if (storageFull) {
                  alert('Storage is full! Maximum capacity of ' + storageMax + ' images reached. Please delete some images before uploading new ones.');
                  return;
                }
                setEditing(null); 
                setForm({ title: '', category: 'Football', description: '' }); 
                setShowForm(true); 
                setUploadError('');
              }} 
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaPlus className="text-sm" /> Add Image
            </button>
          </div>

          {/* Storage Capacity */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaFolder className="text-gray-400 text-sm" />
                <span className="text-sm font-medium text-gray-700">Storage</span>
              </div>
              <span className={`text-sm font-medium ${storageFull ? 'text-red-600' : storagePercent > 80 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {storageUsed} / {storageMax} images
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${storageFull ? 'bg-red-500' : storagePercent > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                style={{ width: `${storagePercent}%` }}
              />
            </div>
            {storageFull && (
              <p className="text-red-600 text-xs mt-2 font-medium">
                ⚠️ Storage is full! Delete some images to upload new ones.
              </p>
            )}
            {storagePercent > 80 && !storageFull && (
              <p className="text-amber-600 text-xs mt-1">
                ⚠️ Storage running low — only {storageMax - storageUsed} slots remaining.
              </p>
            )}
          </div>

          {/* Category Filter + Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {uniqueCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat 
                      ? 'bg-gray-900 text-white shadow-sm' 
                      : 'bg-white text-gray-500 hover:text-gray-800 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className="ml-1.5 text-xs opacity-70">({items.filter(i => i.category === cat).length})</span>
                  )}
                </button>
              ))}
            </div>
            <div className="relative md:ml-auto md:min-w-[240px]">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
              <input type="text" placeholder="Search images..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-sm" />
            </div>
          </div>

          {/* Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={() => { setShowForm(false); setEditing(null); setFile(null); setPreview(null); }}>
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{editing ? 'Edit Image' : 'Add Gallery Image'}</h3>
                    <button onClick={() => { setShowForm(false); setEditing(null); setFile(null); setPreview(null); }} className="text-gray-400 hover:text-gray-600 transition-colors"><FaTimesCircle className="text-xl" /></button>
                  </div>
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {uploadError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                        {uploadError}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                      <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required placeholder="Image title..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                        <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm bg-white">
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                        <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                      <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} placeholder="Brief description..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Image *</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-400 transition-colors cursor-pointer" onClick={() => document.getElementById('gallery-image-input')?.click()}>
                        <FaImages className="text-2xl text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP up to 10MB</p>
                        <input id="gallery-image-input" type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" />
                      </div>
                      {preview && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                          <img src={preview} alt="Preview" className="w-full h-52 object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="submit" className="flex-1 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 text-sm font-medium shadow-sm">{editing ? 'Update Image' : 'Upload Image'}</button>
                      <button type="button" onClick={() => { setShowForm(false); setEditing(null); setFile(null); setPreview(null); }} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm font-medium">Cancel</button>
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Image?</h3>
                    <p className="text-sm text-gray-500 mb-6">This action cannot be undone. Are you sure you want to delete this image?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium">Cancel</button>
                      <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm font-medium">Delete</button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bulk Delete Confirmation Modal */}
          <AnimatePresence>
            {bulkDeleteConfirm && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={() => setBulkDeleteConfirm(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                      <FaTrash className="text-red-500 text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Selected Images?</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Are you sure you want to delete {selectedItems.length} image{selectedItems.length !== 1 ? 's' : ''}? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                      <button onClick={() => setBulkDeleteConfirm(false)} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all text-sm font-medium">Cancel</button>
                      <button onClick={handleBulkDelete} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm font-medium">Delete All</button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Preview Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setSelectedImage(null)} className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 z-10 transition-colors"><FaTimes /></button>
                  <img src={selectedImage.imageUrl} alt={selectedImage.title} className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                    <h3 className="text-white font-semibold">{selectedImage.title}</h3>
                    <p className="text-white/70 text-sm">{selectedImage.category}{selectedImage.description ? ` — ${selectedImage.description}` : ''}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bulk Actions Toolbar */}
          {selectedItems.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  {selectedItems.length} image{selectedItems.length !== 1 ? 's' : ''} selected
                </span>
                <button 
                  onClick={() => setSelectedItems([])}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear selection
                </button>
              </div>
              <button 
                onClick={() => setBulkDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 text-sm font-medium shadow-sm"
              >
                <FaTrash className="text-xs" /> Delete Selected
              </button>
            </div>
          )}

          {/* Select All */}
          {!loading && filtered.length > 0 && (
            <div className="mb-4">
              <button 
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {selectedItems.length === filtered.length ? (
                  <FaCheckSquare className="text-gray-900" />
                ) : (
                  <FaSquare className="text-gray-400" />
                )}
                {selectedItems.length === filtered.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          )}

          {/* Gallery Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((item, index) => {
                const backendRoot = api.defaults.baseURL?.replace(/\/api$/, '') || '';
                const imageSrc = item.imageUrl?.startsWith('http') ? item.imageUrl : `${backendRoot}${item.imageUrl}`;
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedImage({ ...item, imageUrl: imageSrc }); }}>
                      <div className="absolute top-3 right-3 z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleItemSelection(item._id); }}
                          className="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 bg-white/90 backdrop-blur-sm"
                          style={{
                            borderColor: selectedItems.includes(item._id) ? '#111827' : '#d1d5db',
                            backgroundColor: selectedItems.includes(item._id) ? '#111827' : 'rgba(255, 255, 255, 0.9)'
                          }}
                        >
                          {selectedItems.includes(item._id) && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {imageSrc ? (
                        <img src={imageSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-300">
                          <FaImages className="text-5xl" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <FaExpand className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-50" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/90 text-gray-700 shadow-sm backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 truncate text-sm">{item.title}</h3>
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-400 line-clamp-1 mb-2">{item.description}</p>
                      )}
                      {item.createdAt && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                          <FaCalendarAlt className="text-[10px]" />
                          {formatDate(item.createdAt)}
                        </div>
                      )}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                        <button onClick={() => handleEdit(item)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                          <FaEdit className="text-xs" /> Edit
                        </button>
                        <button onClick={() => setDeleteConfirm(item._id)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all">
                          <FaTrash className="text-xs" /> Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <FaImages className="text-gray-300 text-2xl" />
                  </div>
                  <p className="text-gray-500 font-medium">No images found</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {search ? 'Try adjusting your search.' : 'Click "Add Image" to upload your first image.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminGallery;