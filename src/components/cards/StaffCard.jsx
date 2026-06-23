import { motion } from 'framer-motion';
import { FaUserTie } from 'react-icons/fa';

const StaffCard = ({ member, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
    >
      {member.image ? (
        <div className="h-64 overflow-hidden">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-64 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
          <FaUserTie className="text-6xl text-accent/60 group-hover:text-accent transition-colors duration-300" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary">{member.name}</h3>
        <p className="text-accent font-medium text-sm mb-3">{member.position}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
      </div>
    </motion.div>
  );
};

export default StaffCard;
