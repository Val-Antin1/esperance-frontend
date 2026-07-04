import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import HeroCarousel from '../components/common/HeroSection';
import SectionTitle from '../components/common/SectionTitle';
import Seo from '../components/common/Seo';
import ActivityCard from '../components/cards/ActivityCard';
import GalleryCard from '../components/cards/GalleryCard';
import NewsCard from '../components/cards/NewsCard';
import TestimonialCard from '../components/cards/TestimonialCard';
import api from '../services/api';
import { activities, stats, newsArticles, testimonials, contactInfo } from '../data/sampleData';
import { FaPlay } from 'react-icons/fa';

const Counter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * end);
            setCount(current);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-accent">
      {count}{suffix}
    </span>
  );
};

const Home = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get('/gallery?limit=8');
        if (data.success) setGalleryImages(data.data.gallery);
      } catch (error) {
        console.error('Failed to load gallery preview:', error);
      } finally {
        setLoadingGallery(false);
      }
    };

    const fetchNews = async () => {
      try {
        const { data } = await api.get('/news?published=true&limit=3');
        if (data.success) setNewsData(data.data.news);
      } catch (error) {
        console.error('Failed to load latest news:', error);
      }
    };

    fetchGallery();
    fetchNews();
  }, []);

  return (
    <div>
      <Seo path="/" />
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Shaping the <span className="text-accent">Future</span> of Sports
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Esperance FC Academy is a premier sports training institution dedicated to nurturing young talent 
                and developing well-rounded athletes. We believe in the power of sports to transform lives and build character.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With state-of-the-art facilities, experienced coaches, and a comprehensive approach to athlete development, 
                we provide an environment where every student can reach their full potential.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                Learn More About Us
                <FaPlay className="ml-2 text-sm" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-100">
                <img
                  src="/espe.jpeg"
                  alt="Esperance FC Academy"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Esperance FC by the Numbers" subtitle="Our impact in the community" light />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <Counter end={stat.value} suffix={stat.suffix} />
                <p className="text-gray-300 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Programs" subtitle="Discover our comprehensive sports and academic programs" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Gallery" subtitle="Moments captured at Esperance FC Academy" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
            {loadingGallery ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={`${['md:col-span-2 md:row-span-2','col-span-1','col-span-1','md:col-span-2','col-span-1','col-span-1','col-span-1','md:col-span-2'][index % 8]}`}>
                  <div className="h-full rounded-xl bg-gray-100 animate-pulse" />
                </div>
              ))
            ) : galleryImages.length > 0 ? (
              galleryImages.slice(0, 8).map((image, index) => (
                <div key={image._id || image.id} className={`${['md:col-span-2 md:row-span-2','col-span-1','col-span-1','md:col-span-2','col-span-1','col-span-1','col-span-1','md:col-span-2'][index % 8]}`}>
                  <GalleryCard image={image} index={index} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">No gallery items available yet.</div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Latest News" subtitle="Stay updated with the latest from Esperance FC" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(newsData.length ? newsData : newsArticles.slice(0, 3)).slice(0, 3).map((article, index) => (
              <NewsCard key={article._id || article.id} article={article} index={index} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/news"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="What People Say" subtitle="Testimonials from our community" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Get In Touch" subtitle="We'd love to hear from you" light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-white font-semibold mb-2">Phone</h3>
              <a href={`tel:${contactInfo.phone}`} className="text-accent hover:text-accent-light">{contactInfo.phone}</a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <a href={`mailto:${contactInfo.email}`} className="text-accent hover:text-accent-light">{contactInfo.email}</a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-white font-semibold mb-2">Address</h3>
              <p className="text-gray-300">{contactInfo.address}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
