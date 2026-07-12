import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaFutbol, FaLanguage, FaBasketballBall, FaVolleyballBall, FaTableTennis } from 'react-icons/fa';
import { IoMdArrowForward } from 'react-icons/io';

const iconMap = {
  football: FaFutbol,
  basketball: FaBasketballBall,
  volleyball: FaVolleyballBall,
  'table-tennis': FaTableTennis,
  language: FaLanguage,
};

const ActivityCard = ({ activity, index = 0 }) => {
  const { t } = useTranslation();
  const IconComponent = iconMap[activity.icon] || FaFutbol;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-8">
        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
          <IconComponent className="text-3xl text-primary group-hover:text-accent transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-3">{t(activity.titleKey || activity.title)}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{t(activity.descriptionKey || activity.description)}</p>
        <Link
          to={activity.link}
          className="inline-flex items-center text-primary font-semibold group-hover:text-accent transition-colors"
        >
          {t('buttons.learnMore')}
          <IoMdArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
