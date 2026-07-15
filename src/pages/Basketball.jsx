import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import StudentCard from '../components/cards/StudentCard';
import GalleryCard from '../components/cards/GalleryCard';
import api from '../services/api';

const Basketball = () => {
  const { t } = useTranslation();
  const [galleryImages, setGalleryImages] = useState([]);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);

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

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get('/students?limit=100');
        if (data.success) setStudents(data.data.students);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, []);

  const gallery = galleryImages.filter(img => img.category === 'Basketball');
  return (
    <div>
      <Seo path="/football-academy/basketball" />
      <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/bask.jpeg"
            alt="Basketball training"
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
            {t('basketball.hero.badge')}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
            {t('basketball.hero.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-100 sm:text-xl md:text-2xl drop-shadow-md">
            {t('basketball.hero.subtitle')}
          </p>
        </motion.div>
      </div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('basketball.overview.title')} subtitle={t('basketball.overview.subtitle')} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg leading-relaxed">{t('basketball.overview.description')}</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('basketball.students.title')} subtitle={t('basketball.students.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loadingStudents ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-64 rounded-xl bg-gray-100 animate-pulse" />
              ))
            ) : (
              students.filter(student => student.sport === 'Basketball').map((student, index) => (
                <StudentCard key={student._id} student={student} index={index} />
              ))
            )}
          </div>
          {!loadingStudents && students.filter(student => student.sport === 'Basketball').length === 0 && (
            <p className="mt-6 text-center text-gray-500">No basketball players are available yet.</p>
          )}
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('basketball.gallery.title')} subtitle={t('basketball.gallery.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (<GalleryCard key={image.id} image={image} index={index} />))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Basketball;
