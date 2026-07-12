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
      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative"
    >
      <FaQuoteLeft className="text-3xl text-accent/30 mb-4" />
      <p className="text-gray-600 leading-relaxed mb-6 italic">"{t(testimonial.contentKey || testimonial.content)}"</p>
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < testimonial.rating ? 'text-accent' : 'text-gray-200'} />
        ))}
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
          <span className="text-primary font-bold text-lg">{testimonial.name[0]}</span>
        </div>
        <div>
          <h4 className="font-bold text-primary">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{t(testimonial.roleKey || testimonial.role)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
