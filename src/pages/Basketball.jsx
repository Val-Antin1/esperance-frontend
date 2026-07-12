import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import StudentCard from '../components/cards/StudentCard';
import GalleryCard from '../components/cards/GalleryCard';
import api from '../services/api';
import { students } from '../data/sampleData';

const Basketball = () => {
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

  const gallery = galleryImages.filter(img => img.category === 'Basketball');
  return (
    <div>
      <Seo path="/football-academy/basketball" />
      <div className="relative min-h-[58vh] sm:min-h-[64vh] flex items-center justify-center overflow-hidden bg-primary">
        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{
            backgroundImage: "url('/bask.jpeg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-black/80 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_35%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%)] z-0" />
        <div className="absolute inset-0 bg-black/35 z-0" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-4xl px-4 text-center sm:px-6"
        >
          <span className="mb-5 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-sm">
            High-Performance Basketball
          </span>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Basketball
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200 sm:text-xl md:text-2xl">
            High-performance basketball training program combining skill, strategy, and athletic excellence.
          </p>
        </motion.div>
      </div>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Program Overview" subtitle="Developing skilled and confident basketball players" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg leading-relaxed">Our Basketball program combines technical skill development with tactical understanding and physical conditioning. Led by experienced coaches, we provide a comprehensive training environment for players of all levels.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Athletes" subtitle="Talented basketball players in our program" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {students.basketball.map((student, index) => (<StudentCard key={student.id} student={student} index={index} />))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Gallery" subtitle="Basketball in action" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (<GalleryCard key={image.id} image={image} index={index} />))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Basketball;
