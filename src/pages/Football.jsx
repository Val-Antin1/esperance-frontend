import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import StudentCard from '../components/cards/StudentCard';
import GalleryCard from '../components/cards/GalleryCard';
import api from '../services/api';
import { ageGroups, students } from '../data/sampleData';
import { FaCheckCircle } from 'react-icons/fa';

const Football = () => {
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

  const footballGallery = galleryImages.filter(img => img.category === 'Football');

  return (
    <div>
      <Seo path="/football-academy/football" />
      <div className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden">
        {/* Background layer using CSS background-image for reliable public asset loading */}
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{
            backgroundImage: "url('/foot.jpeg')",
            transform: 'scale(1.04)',
            filter: 'brightness(0.56) contrast(1.02) blur(0.4px)',
          }}
        />

        {/* subtle vignette + dark overlay to ensure legibility */}
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.04) 0%, transparent 25%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.85) 70%)' }} />
        <div className="absolute inset-0 z-10 bg-black/36" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Football Academy</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">Professional football training for boys aged 6-20</p>
        </motion.div>
      </div>

      {/* Description */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Program Overview" subtitle="Developing the next generation of football talent" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-gray-600 text-lg leading-relaxed">
              Our Football Academy offers comprehensive training programs designed to develop skilled, intelligent, 
              and confident football players. With age-appropriate curriculum, qualified coaches, and modern facilities, 
              we provide the ideal environment for young athletes to grow and excel in football.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Age Groups" subtitle="Structured programs for every age and skill level" />
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
          <SectionTitle title="Our Football Students" subtitle="Meet some of our talented athletes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {students.football.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Football Gallery" subtitle="Moments from our football program" />
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
