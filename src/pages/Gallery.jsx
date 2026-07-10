import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import GalleryCard from '../components/cards/GalleryCard';
import api from '../services/api';

const sportCategories = ['All', 'Football', "Women's Football", 'Basketball', 'Volleyball', 'Table Tennis'];

const heroCollageImagesBase = Array.from({ length: 40 }, (_, i) => `/gallery/${i + 1}.jpeg`);

const shuffleArray = (items) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

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
  const [heroCollageImages, setHeroCollageImages] = useState([]);
  const [showCollage, setShowCollage] = useState(true);

  useEffect(() => {
    setHeroCollageImages(shuffleArray(heroCollageImagesBase));

    const interval = window.setInterval(() => {
      setShowCollage(false);
      window.setTimeout(() => {
        setHeroCollageImages((current) => shuffleArray(current.length ? current : heroCollageImagesBase));
        setShowCollage(true);
      }, 900);
    }, 16000);

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

    return () => window.clearInterval(interval);
  }, []);

  const filteredImages = galleryImages.filter((img) => {
    return activeCategory === 'All' || img.category === activeCategory;
  });

  return (
    <div>
      <Seo path="/gallery" />
      <div className="relative min-h-[520px] sm:min-h-[560px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%)]" />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            key={heroCollageImages.join('-')}
            initial={{ opacity: 0 }}
            animate={{ opacity: showCollage ? 1 : 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-[-10%] rounded-[2rem] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
            style={{
              transform: 'rotate(-6deg) scale(1.08)',
              filter: 'blur(0.5px)',
            }}
          >
            <div className="grid h-full w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8 gap-2 p-2 sm:p-3 md:p-4">
              {heroCollageImages.map((src, index) => {
                const spans = [
                  'col-span-1 row-span-1',
                  'col-span-2 row-span-2',
                  'col-span-1 row-span-2',
                  'col-span-2 row-span-1',
                  'col-span-1 row-span-1',
                  'col-span-2 row-span-2',
                  'col-span-1 row-span-1',
                  'col-span-1 row-span-2',
                ];

                return (
                  <div
                    key={`${src}-${index}`}
                    className={`overflow-hidden rounded-xl ${spans[index % spans.length]} min-h-[90px] sm:min-h-[100px]`}
                  >
                    <img
                      src={src}
                      alt="Esperance FC Academy gallery image"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_0%,_transparent_55%,_rgba(0,0,0,0.65)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">Gallery</h1>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">Explore moments from Esperance FC Academy</p>
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
