import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import GalleryCard from '../components/cards/GalleryCard';
import { germanLevels } from '../data/sampleData';
import api from '../services/api';
import { FaCheckCircle, FaLanguage } from 'react-icons/fa';

const GermanClasses = () => {
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

  const gallery = galleryImages.filter(img => img.category === 'German Classes');
  const benefits = [
    'Qualified and experienced instructors',
    'Small class sizes for personalized attention',
    'Flexible scheduling options',
    'German culture and language immersion',
    'Preparation for Goethe Institute exams',
    'Certificate upon completion',
  ];

  return (
    <div>
      <Seo path="/football-academy/german-classes" />
      <div className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" /><div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">German Classes</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">Learn German with expert instructors</p>
        </motion.div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Program Overview" subtitle="Quality German language education" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg leading-relaxed">Our German language program offers comprehensive courses from beginner to advanced levels. Whether you're learning for academic purposes, career advancement, or personal growth, our qualified instructors provide effective and engaging language instruction.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-2xl font-bold text-primary mb-6">Benefits of Learning German</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li key={index} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-center space-x-3">
                    <FaCheckCircle className="text-accent text-lg flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <FaLanguage className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Why Learn German?</h3>
              <p className="text-gray-600 leading-relaxed">German is one of the most widely spoken languages in Europe and a key language in business, science, and culture. Learning German opens doors to educational and professional opportunities in Germany and beyond.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Course Levels" subtitle="From beginner to advanced proficiency" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {germanLevels.map((level, index) => (
              <motion.div key={level.level} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-primary mb-3">{level.level}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{level.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Gallery" subtitle="German language learning in action" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (<GalleryCard key={image.id} image={image} index={index} />))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GermanClasses;
