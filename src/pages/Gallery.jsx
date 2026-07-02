import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../components/common/SectionTitle';
import GalleryCard from '../components/cards/GalleryCard';
import api from '../services/api';

const sportCategories = ['All', 'Football', "Women's Football", 'Basketball', 'Volleyball', 'Table Tennis'];

const getMasonryClass = (index) => {
  const pattern = [
    'md:col-span-2 md:row-span-2',
    'col-span-1',
    'col-span-1',
    'lg:col-span-2',
    'col-span-1',
    'md:col-span-2',
    'col-span-1',
    'col-span-1',
    'lg:col-span-2 md:row-span-2',
    'col-span-1',
    'col-span-1',
    'md:col-span-2',
  ];
  return pattern[index % pattern.length];
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        if (data.success) setGalleryImages(data.data.gallery);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredImages = galleryImages.filter((img) => {
    return activeCategory === 'All' || img.category === activeCategory;
  });

  return (
    <div>
      <Seo path="/gallery" />
      <div className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">Explore moments from Esperance FC Academy</p>
        </motion.div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Gallery" subtitle="Capturing the spirit of Esperance FC" />
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {sportCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md border-b-2 border-accent'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Masonry Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image._id || image.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`${getMasonryClass(index)}`}
                >
                  <GalleryCard image={image} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading gallery...</p>
            </div>
          )}

          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
