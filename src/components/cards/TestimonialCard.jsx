import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialCard = ({ testimonial, index = 0 }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-[0_20px_60px_rgba(17,17,17,0.06)] transition-all duration-500 border border-gray-100"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-6 right-6 h-1 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-accent" />

      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-accent/12 text-accent">
        <FaQuoteLeft className="text-2xl" />
      </div>
      <p className="text-gray-600 leading-relaxed mb-6 italic">"{t(testimonial.contentKey || testimonial.content)}"</p>
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < testimonial.rating ? 'text-accent' : 'text-gray-200'} />
        ))}
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110">
          <span className="text-primary font-bold text-lg">{testimonial.name[0]}</span>
        </div>
        <div>
          <h4 className="font-bold text-primary">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{t(testimonial.roleKey || testimonial.role)}</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-accent/30" />
    </motion.div>
  );
};

export default TestimonialCard;
