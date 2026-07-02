import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: 'Football Academy',
    subtitle: 'Develop your skills with professional coaching and world-class training facilities',
    ctaText: 'Join Football Program',
    ctaLink: '/football',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/about',
    image: '/football.jpeg',
    accent: '#D4AF37',
  },
  {
    title: 'Basketball Excellence',
    subtitle: 'Elevate your game with elite training programs and competitive tournaments',
    ctaText: 'Join Basketball Program',
    ctaLink: '/basketball',
    secondaryCtaText: 'View Programs',
    secondaryCtaLink: '/about',
    image: '/basketball.jpeg',
    accent: '#D4AF37',
  },
  {
    title: 'Volleyball Academy',
    subtitle: 'Spike your potential — professional volleyball training for all skill levels',
    ctaText: 'Join Volleyball Program',
    ctaLink: '/volleyball',
    secondaryCtaText: 'View Programs',
    secondaryCtaLink: '/about',
    image: '/volleyball.jpeg',
    accent: '#D4AF37',
  },
  {
    title: 'Table Tennis',
    subtitle: 'Master the art of speed and precision with expert coaching',
    ctaText: 'Join Table Tennis',
    ctaLink: '/table-tennis',
    secondaryCtaText: 'View Programs',
    secondaryCtaLink: '/about',
    image: '/tennis.jfif',
    accent: '#D4AF37',
  },
  {
    title: 'German Language Classes',
    subtitle: 'Learn German with native-speaking instructors and immersive programs',
    ctaText: 'Join German Classes',
    ctaLink: '/german-classes',
    secondaryCtaText: 'Learn More',
    secondaryCtaLink: '/about',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80',
    accent: '#D4AF37',
  },
];

const SlideContent = ({ slide, isActive }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {slide.label && (
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
          style={{ backgroundColor: `${slide.accent}20`, color: slide.accent, border: `1px solid ${slide.accent}40` }}
        >
          {slide.label}
        </span>
      )}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
        {slide.title}
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
        {slide.subtitle}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to={slide.ctaLink}
          className="group relative px-8 py-4 font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          style={{ color: '#111111', backgroundColor: slide.accent }}
        >
          <span className="relative z-10">{slide.ctaText}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
        <Link
          to={slide.secondaryCtaLink}
          className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 border-2 hover:bg-white/10 backdrop-blur-sm transform hover:-translate-y-1"
          style={{ borderColor: `${slide.accent}60` }}
        >
          {slide.secondaryCtaText}
        </Link>
      </div>
    </motion.div>
  </motion.div>
);

const Dot = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`transition-all duration-500 rounded-full ${active ? 'w-10 h-2.5' : 'w-2.5 h-2.5'}`}
    style={{ backgroundColor: active ? '#D4AF37' : 'rgba(255,255,255,0.35)' }}
    aria-label="Navigate slide"
  />
);

const Arrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all duration-300 group"
    style={{ [direction === 'left' ? 'left' : 'right']: '1rem' }}
    aria-label={`Slide ${direction}`}
  >
    <svg
      className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-accent transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goTo = (index) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <div className="relative w-full h-dvh min-h-[600px] max-h-screen overflow-hidden bg-primary">
      {/* Background Images with Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.72) 40%, rgba(17,17,17,0.55) 100%)`,
        }}
      />

      {/* Accent overlay gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${slides[current].accent}40 0%, transparent 50%)`,
        }}
      />

      {/* Pattern overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <SlideContent key={current} slide={slides[current]} isActive />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <Arrow direction="left" onClick={prev} />
      <Arrow direction="right" onClick={next} />

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent z-10" />

      {/* Dots + Counter */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          {slides.map((_, index) => (
            <Dot key={index} active={index === current} onClick={() => goTo(index)} />
          ))}
        </div>
        <span className="hidden sm:block text-white/50 text-sm font-mono ml-4">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Side indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{
              backgroundColor: index === current ? '#D4AF37' : 'rgba(255,255,255,0.28)',
              transform: index === current ? 'scale(1.5)' : 'scale(1)',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;