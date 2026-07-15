import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import StudentCard from '../components/cards/StudentCard';
import GalleryCard from '../components/cards/GalleryCard';
import api from '../services/api';
import { ageGroups } from '../data/sampleData';
import { FaCheckCircle } from 'react-icons/fa';

const Football = () => {
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

  const footballGallery = galleryImages.filter(img => img.category === 'Football');

  return (
    <div>
      <Seo path="/football-academy/football" />
      <div className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/foot.jpeg"
            alt="Football training"
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
            {t('football.hero.badge')}
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
            {t('football.hero.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-100 sm:text-xl md:text-2xl drop-shadow-md">
            {t('football.hero.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* Description */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('football.overview.title')} subtitle={t('football.overview.subtitle')} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('football.overview.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('football.ageGroups.title')} subtitle={t('football.ageGroups.subtitle')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ageGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-accent font-bold text-lg">{group.title.split(' ')[0]}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{group.title}</h3>
                <p className="text-accent font-medium text-sm mb-4">{group.age}</p>
                <p className="text-gray-600 text-sm mb-6">{group.description}</p>
                <ul className="space-y-2">
                  {group.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <FaCheckCircle className="text-accent mr-2 text-xs" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Students */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('football.students.title')} subtitle={t('football.students.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loadingStudents ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-64 rounded-xl bg-gray-100 animate-pulse" />
              ))
            ) : (
              students.filter(student => student.sport === 'Football').map((student, index) => (
                <StudentCard key={student._id} student={student} index={index} />
              ))
            )}
          </div>
          {!loadingStudents && students.filter(student => student.sport === 'Football').length === 0 && (
            <p className="mt-6 text-center text-gray-500">No football players are available yet.</p>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('football.gallery.title')} subtitle={t('football.gallery.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {footballGallery.map((image, index) => (
              <GalleryCard key={image.id} image={image} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Football;
