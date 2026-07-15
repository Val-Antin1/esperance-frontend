import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaUserGraduate } from 'react-icons/fa';

const StudentCard = ({ student, index = 0 }) => {
  const { t } = useTranslation();
  const hasPhoto = Boolean(student.profilePhoto);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border border-gray-100"
    >
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
        {hasPhoto ? (
          <img
            src={student.profilePhoto}
            alt={student.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUserGraduate className="text-3xl text-primary" />
        )}
      </div>
      <h3 className="text-lg font-bold text-primary">{student.name}</h3>
      <p className="text-accent font-medium text-sm mt-1">{student.position}</p>
      <p className="text-gray-500 text-sm mt-2">{t('common.age')}: {student.age}</p>
    </motion.div>
  );
};

export default StudentCard;
