import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import StudentCard from '../components/cards/StudentCard';
import GalleryCard from '../components/cards/GalleryCard';
import api from '../services/api';
import { students } from '../data/sampleData';

const WomenFootball = () => {
  const { t } = useTranslation();
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery');
        if (data.success) setGalleryImages(data.data.gallery);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGallery();
  }, []);

  const gallery = galleryImages.filter(img => img.category === "Women's Football");

  return (
    <div>
      <Seo path="/football-academy/womens-football" />
      <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/women.jpeg"
            alt="Women's Football"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        <div className="absolute inset-0 bg-black/25" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-4xl px-4 text-center sm:px-6"
        >
          <span className="mb-5 inline-block rounded-full border border-accent/50 bg-black/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-sm">
            {t('womenFootball.hero.badge')}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
            {t('womenFootball.hero.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-100 sm:text-xl md:text-2xl drop-shadow-md">
            {t('womenFootball.hero.subtitle')}
          </p>
        </motion.div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('womenFootball.overview.title')} subtitle={t('womenFootball.overview.subtitle')} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('womenFootball.overview.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('womenFootball.students.title')} subtitle={t('womenFootball.students.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {students.womenFootball.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('womenFootball.gallery.title')} subtitle={t('womenFootball.gallery.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <GalleryCard key={image.id} image={image} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomenFootball;
